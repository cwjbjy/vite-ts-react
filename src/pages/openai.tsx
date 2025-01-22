import { useRef, useEffect, useState } from 'react';

import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Button, message, Input, Card } from 'antd';
import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import html from 'highlight.js/lib/languages/vbscript-html';
import { produce } from 'immer';
import { isEmpty } from 'lodash-es';
import markdownit from 'markdown-it';
import styled from 'styled-components';

import { ls } from '@/utils/storage';

import rootImage from '@/assets/images/chartRoom/root.png';
import { imgUrl } from '@/settings/user';
import useFileStore from '@/store/file';
import 'highlight.js/styles/stackoverflow-light.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('json', json);
hljs.registerLanguage('html', html);
hljs.registerLanguage('python', python);

interface Message {
  name: string;
  image?: string;
  text: string;
}

const md = markdownit({
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {
        /* empty */
      }
    }

    return ''; // 如果未指定语言，则返回原始代码
  },
});

const max = -3; //上下文消息数量

const Openai = () => {
  const [msg, setMsg] = useState('');
  const answerRef = useRef('');
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const ctrl = useRef<AbortController>();
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [historyInfos, setHistoryInfos] = useState<{ content: string; role: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { fileName } = useFileStore();

  const userName = ls.get('userInfo')?.userName;

  const renderMessageContent = (content: any) => {
    return md.render(content);
  };

  const reset = () => {
    setLoading(false);
    loadingRef.current = false;
    const answer = answerRef.current;
    setHistoryInfos((prev) => prev.concat({ content: answer, role: 'assistant' }));
    answerRef.current = '';
  };

  const send = async () => {
    if (msg === '') return;
    const info = historyInfos.concat({ content: msg, role: 'user' }).slice(max);
    setHistoryInfos(info);
    setMessageList((prev) => prev.concat({ name: userName, text: msg, image: `${imgUrl}${fileName}` }));
    setMsg('');

    ctrl.current = new AbortController(); // 创建AbortController实例，以便中止请求
    await fetchEventSource(import.meta.env.VITE_APP_OPENAI, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: info,
        stream: true,
        temperature: 0.7, //严谨与想象
        top_p: 1,
      }),
      openWhenHidden: true, // 取消visibilityChange事件
      signal: ctrl.current.signal, // AbortSignal
      async onmessage(ev) {
        try {
          const data = JSON.parse(ev.data);
          if (!isEmpty(data.choices) && !isEmpty(data.choices[0].delta)) {
            const content = data.choices[0].delta.content;
            answerRef.current += content;
            if (!loadingRef.current) {
              setLoading(true);
              loadingRef.current = true;
              setMessageList((prev) => prev.concat({ name: '智能助手', text: answerRef.current }));
            } else {
              setMessageList(
                produce((draf) => {
                  draf[draf.length - 1].text = answerRef.current;
                }),
              );
            }
          }
        } catch {
          //当JSON.parse解析失败时，说明回答结束
          reset();
        }
      },
      onclose() {},
      onerror(err) {
        console.error(err);
        message.error({
          content: '对话请求发生网络错误或费用不足',
          className: 'custom-message',
        });
        ctrl.current?.abort();
        throw err; // 直接抛出错误，避免反复调用
      },
    });
  };

  const cancel = () => {
    ctrl.current?.abort();
    reset();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  return (
    <Wrapper>
      <Card hoverable>
        <div className="chat">
          <div className="chat-content">
            <div>
              {messageList.length > 0 &&
                messageList.map((item, index) => (
                  <dl key={index} className={item.name === userName ? 'info-right' : 'info-left'}>
                    <dt>
                      {item.image ? (
                        <img src={item.image} className="headPortrait" alt="图片加载失败" />
                      ) : (
                        <img src={rootImage} className="headPortrait" alt="加载失败" />
                      )}
                    </dt>
                    <dd>
                      <div className="txt-name">{item.name}</div>
                      <div>
                        <span
                          className="txt-content"
                          dangerouslySetInnerHTML={{ __html: renderMessageContent(item.text) }}
                        ></span>
                      </div>
                    </dd>
                  </dl>
                ))}
            </div>
            <div ref={messagesEndRef} />
          </div>
          <div className="chart-button">
            <Input placeholder="请输入" value={msg} onChange={(e) => setMsg(e.target.value)} onPressEnter={send} />
            <Button type="primary" onClick={loading ? cancel : send}>
              {loading ? '取消' : '发送'}
            </Button>
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};

export default Openai;

const Wrapper = styled.div`
  padding: 10px;

  .chat {
    border: 1px solid #000;
    box-sizing: border-box;
    height: calc(100vh - 162px);
    position: relative;
  }
  .chat-content {
    height: calc(100vh - 216px);
    overflow-y: auto;
    padding: 10px;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: #cfcfcf;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #b0b0b0;
    }
    .txt-name {
      margin-bottom: 4px;
    }
    .txt-content {
      word-break: break-all;
      display: block;
      padding: 5px 12px;
      color: #141414;
      line-height: 20px;
    }
    .info-right {
      text-align: right;
      padding-right: 47px;
      margin-left: 47px;
      dt {
        right: 0;
        @extend %main_centerRight;
      }
    }
    .info-left {
      text-align: left;
      padding-left: 47px;
      margin-right: 47px;
      dt {
        left: 0;
        @extend %main_centerLeft;
      }
    }
    dl {
      position: relative;
      margin-bottom: 20px;
      dt {
        width: 60px;
        height: 60px;
        position: absolute;
        top: 0;
      }
    }
  }
  .headPortrait {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .chart-button {
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
  }
`;
