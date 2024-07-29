/* 接口请求参数类型 */
export interface LoginParams {
  userName: string;
  passWord: string;
}

export interface RegisterParams extends LoginParams {
  authority: number;
  createTime: string;
  photo: string;
}

export interface UserNameParams {
  user_name: string;
}

export interface UpdateUserParams extends UserNameParams {
  id: number;
  password: string;
}

export interface TrackParams {
  data: string;
}
