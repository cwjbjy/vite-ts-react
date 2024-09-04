/* 接口返回值类型*/

export interface RowItem {
  key: React.Key;
  admin: null;
  authority: string;
  createTime: string;
  id: number;
  password: string;
  photo: string;
  userName: string;
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
