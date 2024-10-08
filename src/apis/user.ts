import HttpClient from '@/utils/fetch';

import type { LoginParams, RegisterParams, UpdateUserParams, UserNameParams } from '../types/userParams';
import type { RowItem, UserImage, Login } from '../types/userResponse';

import { Url } from '@/settings/url';

//登录
export const login = (params: LoginParams) => {
  return HttpClient.post<Login>(Url.Login, params);
};

//注册
export const register = (params: RegisterParams) => {
  return HttpClient.post<{ msg: string }>(Url.Register, params);
};

//获取所有用户信息
export const user = () => {
  return HttpClient.get<{ data: RowItem[] }>(Url.GetAllUser);
};

//删除普通用户
export const deleteUser = (params: { id: number }) => {
  return HttpClient.delete(Url.DeleteUser, params);
};

//修改管理员账户信息
export const updateUser = (params: UpdateUserParams) => {
  return HttpClient.put(Url.UpdateUser, params);
};

//获取上传图片
export const getImage = (params: UserNameParams) => {
  return HttpClient.get<UserImage>(Url.GetImage, params);
};

//获取用户单条信息
export const getUser = (params: UserNameParams) => {
  return HttpClient.get<{ data: string }>(Url.GetUser, params);
};
