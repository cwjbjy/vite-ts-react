import { memo, useCallback, useMemo } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Image, Button, Popconfirm } from 'antd';
import styled from 'styled-components';

import type { RowItem } from '@/types/userResponse';

import { imgUrl } from '@/settings/user';

interface Props {
  tableData: RowItem[];
  onModal({ isModalVisible, info }: { isModalVisible: boolean; info: RowItem }): void;
  onDelete(value: RowItem): void;
}

export default memo(function UserTable({ tableData, onModal, onDelete }: Props) {
  const onEdit = useCallback(
    (params: RowItem) => {
      onModal({
        isModalVisible: true,
        info: params,
      });
    },
    [onModal],
  );

  const columns: Record<string, any>[] = useMemo(
    () => [
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '单击图像可以放大',
        dataIndex: 'photo',
        key: 'photo',
        align: 'center',
        render: (text: string) => <Image width={40} src={imgUrl + text} />,
      },
      {
        title: '角色描述',
        dataIndex: 'authority',
        key: 'authority',
        render: (text: number) => (
          <span className={text === 1 ? 'blue' : ''}>{text === 1 ? '管理员' : '普通用户'}</span>
        ),
      },
      {
        title: '注册时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        key: 'action',
        render: (_: unknown, record: RowItem) => (
          <>
            {record.authority === '1' ? (
              <Button type="text" className="blue" icon={<EditOutlined />} onClick={() => onEdit(record)}>
                编辑
              </Button>
            ) : (
              <Popconfirm title="确认删除?" onConfirm={() => onDelete(record)} okText="Yes" cancelText="No">
                <Button type="text" className="red" icon={<DeleteOutlined />}>
                  删除
                </Button>
              </Popconfirm>
            )}
          </>
        ),
      },
    ],
    [onDelete, onEdit],
  );

  return <MyTable bordered columns={columns} dataSource={tableData} rowKey={(record: any) => record.id} />;
});

export const MyTable = styled(Table)`
  margin-top: 10px;
  .blue {
    color: blue;
  }

  .red {
    color: red;
  }
`;
