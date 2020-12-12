import { request } from 'umi';
import config from '../../config/app';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent(option: Object) {
  return request<API.Response>(`${config.apiBaseUrl}/api/user/me`, {
    method: 'get',
    ...option,
  });
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
