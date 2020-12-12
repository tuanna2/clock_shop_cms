import { request } from 'umi';
import config from '../../config/app';

export interface LoginParamsType {
  username: string;
  password: string;
}

export async function login(params: LoginParamsType) {
  return request<API.Response>(`${config.apiBaseUrl}/api/user/login`, {
    data: params,
    method: 'POST',
  });
}
