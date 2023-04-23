import http from './http';
import { httpResponse, Model } from './types';

export interface FileData extends Model {
  name?: string;
  desc?: string;
  path: string;
  cdn_url?: string;
  type?: string;
  size?: number;
  user_id?: number;
  use?: string;
}

export interface FileResponse extends httpResponse {
  data: FileData;
}

export interface FileListResponse extends httpResponse {
  list: FileData[];
}

export function UploadOneFile(
  file: File,
  body = {} as { [key: string]: string }
) {
  return http.uploadFile(
    'v1/file/upload/one',
    file,
    body
  ) as Promise<FileResponse>;
}
