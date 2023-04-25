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
  id?: number;
  user_id?: number;
  department_grade_value?: number;
  name?: string;
  contact_name?: string;
  contact_phone?: string;
  contact_id_card?: string;
  bank_account?: string;
  created_at_between?: Array<string>;
}

export interface DepartmentListQueryParams
  extends PageQuery,
    DepartmentListPolicyParams {}

export function getDepartmentList(
  ulp = { page: 1 } as DepartmentListQueryParams
) {
  // 转换 对象为 query string
  const query = Object.keys(ulp)
    .map((key) => {
      const value = ulp[key as keyof DepartmentListQueryParams] as string;
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
  return http.get(
    `/v1/department/list?${query}`
  ) as Promise<DepartmentListResponse>;
}

// /grade/list
export interface DepartmentGradeList {
  value: number;
  name: string;
}

export interface DepartmentGradeListResponse extends httpResponse {
  list: DepartmentGradeList[];
}

export function getDepartmentGradeList() {
  return http.get(
    `/v1/department/grade/list`
  ) as Promise<DepartmentGradeListResponse>;
}
