import http from './http';
import { httpResponse, Model } from './types';
import { PageQuery } from './query';

export interface PosterTextColor {
  R: number;
  G: number;
  B: number;
  A: number;
}

export interface PosterText {
  prefix: string;
  font_size: number;
  font_color: PosterTextColor;
  color: string;
  x: number;
  y: number;
}

export interface PosterImage {
  image_path?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface PosterData extends Model {
  name?: string;
  dpi?: number;
  grade_value?: number;
  is_user_id?: boolean;
  user_id: PosterText;
  is_nick_name?: boolean;
  nick_name: PosterText;
  is_avatar?: boolean;
  avatar: PosterImage;
  background: PosterImage;
  mini_program_qr_code: PosterImage;
  sort?: number;
}

export interface PosterResponse extends httpResponse {
  data: PosterData;
}

export interface PosterListResponse extends httpResponse {
  list: PosterData[];
}

export interface PosterListParams extends PageQuery, Model {
  name?: string;
  grade_value?: number;
}

export interface UserPosterData extends Model {
  user_id: string;
  poster_id: number;
  Hash: string;
  path: string;
  cdn_url: string;
}

export interface UserPosterResponse extends httpResponse {
  data: UserPosterData;
}

export function getPosterList(
  ulp = {
    page: 1,
    limit: 10,
  } as PosterListParams
) {
  // 转换 对象为 query string
  const query = Object.keys(ulp)
    .map((key) => {
      const value = ulp[key as keyof PosterListParams] as string;
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
  return http.get(`/v1/poster/list?${query}`) as Promise<PosterListResponse>;
}

export function getPoster(id: number) {
  return http.get(`/v1/poster/id/${id}`) as Promise<PosterResponse>;
}

// preview
export function previewPoster(id: number) {
  return http.get(`/v1/poster/id/${id}/preview`) as Promise<UserPosterResponse>;
}

// create
export function createPoster(data: PosterData) {
  return http.post(`/v1/poster`, data) as Promise<PosterResponse>;
}

// update
export function updatePoster(id: number, data: PosterData) {
  return http.put(`/v1/poster/id/${id}`, data) as Promise<PosterResponse>;
}

// delete
export function deletePoster(id: number) {
  return http.del(`/v1/poster/id/${id}`) as Promise<PosterResponse>;
}
