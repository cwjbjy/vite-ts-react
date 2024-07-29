/* 接口返回值类型*/

export interface RowItem {
  key: React.Key;
  admin: null;
  authority: string;
  createTime: string;
  id: number;
  password: string;
  photo: string;
  user_name: string;
}

export interface UserImage {
  data: { photo: string }[];
}

export interface UserTime {
  data: { createTime: string }[];
}

export interface Login {
  data: {
    token: string;
    auth: string;
  };
}
