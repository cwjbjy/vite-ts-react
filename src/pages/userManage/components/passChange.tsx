import { memo } from 'react';

import { Form, Input } from 'antd';

interface Props {
  getPass(val: string): void;
}

export default memo(function PassChange({ getPass }: Props) {
  const onPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    getPass(e.target.value);
  };

  return (
    <Form name="basic">
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password onChange={onPassword} />
      </Form.Item>
    </Form>
  );
});
