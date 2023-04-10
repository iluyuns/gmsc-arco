import http from './http';
import { httpResponse } from './types';
import { PageQuery } from './query';
import { UserData } from './user';
import { AreaChina } from './area';

export interface UserRole {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  name: string;
  description: string;
}
export interface DepartmentList {
  id: number;
  name: string;
  user_id: number;
  User: UserData;
  contact_name: string;
  contact_phone: string;
  contact_wechat: string;
  contact_email: string;
  contact_address: string;
  contact_type: string;
  contact_id_card: string;
  bank_code: string;
  bank_name: string;
  bank_account: string;
  bank_type: string;
  bank_holder_name: string;
  bank_address: string;
  area_china_id: number;
  AreaChina: AreaChina;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface DepartmentListResponse extends httpResponse {
  list: DepartmentList[];
}

export interface DepartmentListPolicyParams {
  grade_level?: number;
  id?: number;
  name?: string;
  nick_name?: string;
  phone?: string;
  created_at?: Array<string>;
}

export interface DepartmentListParams
  extends PageQuery,
    DepartmentListPolicyParams {}

export function getDepartmentList(ulp = { page: 1 } as DepartmentListParams) {
  // 转换 对象为 query string
  const query = Object.keys(ulp)
    .map((key) => {
      const value = ulp[key as keyof DepartmentListParams] as string;
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
  return http.get(
    `/v1/department/list?${query}`
  ) as Promise<DepartmentListResponse>;
}
