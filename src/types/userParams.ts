/* 接口请求参数类型 */
export interface LoginParams {
  userName: string;
  password: string;
}
export interface RegisterParams extends LoginParams {
  authority: number;
  createTime: string;
  photo: string;
}
export interface UpdateUserParams extends LoginParams {
  id: number;
}

export type UserNameParams = Pick<LoginParams, 'userName'>;

export type UserInfo = Omit<UpdateUserParams, 'password'>;
