import { httpResponse } from './types';
import http from './http';

export interface Grade {
  level: number;
  name: string;
}
export interface GradeListResponse extends httpResponse {
  list: Grade[];
}

export function getGradeAll() {
  return http.get('/v1/grade/all');
}
