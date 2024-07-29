import { useCallback, useState } from 'react';

import { useRequest } from 'ahooks';
import { Card, Modal, message, Spin } from 'antd';
import CryptoJS from 'crypto-es';

import { ls } from '@/utils/storage';

import { user, updateUser, deleteUser } from '@/apis/user';

import PassChange from './components/passChange';
import UserTable from './components/userTable';

import type { RowItem } from '@/types/userResponse';

import { USER_INFO } from '@/settings/localStorage';
import { MANAGE_NAME } from '@/settings/user';

interface Info {
  id: number;
  user_name: string;
}

const UserManage = () => {
  const [info, setInfo] = useState<Info>();
  const [isModalVisible, setModal] = useState(false);
  const [password, setPassword] = useState('');
  const [tableData, setTableData] = useState<RowItem[]>([]);
  const userName = ls.get('userInfo')?.userName;

  const onModal = useCallback(({ isModalVisible, info }: { isModalVisible: boolean; info: Info }) => {
    setModal(isModalVisible);
    setInfo(info);
  }, []);

  const { run, loading } = useRequest(user, {
    onSuccess: (res) => {
      setTableData(res.data);
    },
  });

  const { run: handleUpdate } = useRequest(updateUser, {
    manual: true,
    onSuccess: () => {
      message.success({
        content: '密码修改成功',
      });
      ls.set(USER_INFO, {
        userName: info?.user_name,
        passWord: password,
        flag: true,
      });
    },
  });

  const { run: handleDeleteUser } = useRequest(deleteUser, {
    manual: true,
    onSuccess: () => {
      message.success({
        content: '删除成功',
      });
      run();
    },
  });

  const onDelete = useCallback(
    (value: RowItem) => {
      const { id } = value;
      handleDeleteUser({ id });
    },
    [handleDeleteUser],
  );

  const handleOk = useCallback(() => {
    const { id, user_name } = info as Info;
    handleUpdate({
      id,
      user_name,
      password: CryptoJS.MD5(password).toString(),
    });
    setModal(false);
  }, [handleUpdate, info, password]);

  const getPass = useCallback((val: string) => setPassword(val), []);

  if (userName !== MANAGE_NAME) return <>管理员账户方可查看</>;
  return (
    <section>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Card hoverable>
            <strong>管理员可修改密码，普通用户可删除</strong>
            <UserTable tableData={tableData} onModal={onModal} onDelete={onDelete} />
          </Card>
          <Modal title="修改密码" open={isModalVisible} onOk={handleOk} onCancel={() => setModal(false)}>
            <PassChange getPass={getPass} />
          </Modal>
        </>
      )}
    </section>
  );
};

export default UserManage;
