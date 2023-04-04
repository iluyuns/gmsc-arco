import http from './http';
import { httpResponse } from './types';
import { PageQuery } from './query';

export interface LoginData {
  username: string;
  password: string;
}

export interface UserInfo {
  message: string;
  status: number;
  user: any;
}

export function login(data: LoginData) {
  return http.post('/v1/user/login', data);
}

export function logout() {
  return http.post('/v1/user/logout');
}

export function getUserInfo() {
  return new Promise<httpResponse>((resolve, reject) => {
    http
      .get('/v1/user/info_and_role')
      .then((res) => {
        if (!res.user.avatar_url) {
          const baseURL = import.meta.env.VITE_API_BASE_URL as string;
          const uuid = res.user.uuid as string;
          res.user.avatar_url = `${baseURL}/v1/user/generate/avatar/${uuid}`;
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export interface UserListData {
  id: number;
  name: string;
  username: string;
  nick_name: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  user_role: [
    {
      id: number;
      created_at: string;
      updated_at: string;
      deleted_at: string;
      user_id: number;
      role_id: number;
      role: {
        id: number;
        created_at: string;
        updated_at: string;
        deleted_at: string;
        name: string;
        description: string;
      };
    }
  ];
}

export interface UserListResponse extends httpResponse {
  list: UserListData[];
}

export interface UserListPolicyParams {
  id?: number;
  parent_id?: number;
  name?: string;
  username?: string;
  nick_name?: string;
  phone?: string;
  created_at?: Array<string>;
  is_easy_business?: boolean;
}

export interface UserListParams extends PageQuery, UserListPolicyParams {}

export function getUserList(ulp = { page: 1 } as UserListParams) {
  // 转换 对象为 query string
  const query = Object.keys(ulp)
    .map((key) => {
      const value = ulp[key as keyof UserListParams] as string;
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
  return http.get(`/v1/user/list?${query}`) as Promise<UserListResponse>;
}

export function getMenuList() {
  return http.get('/v1/menu');
}
