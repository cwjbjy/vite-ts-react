import { ls } from '@/utils/storage';

import { MANAGE_NAME } from '@/settings/user';

const AuthStatus = ({ children }: { children: React.ReactNode }) => {
  const userName = ls.get('userInfo')?.userName;

  if (userName !== MANAGE_NAME) return <>管理员账户方可查看</>;

  return children;
};

export default AuthStatus;
