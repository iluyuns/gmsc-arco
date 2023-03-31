import axios from 'axios';
import { httpResponse } from './types';

// 配合 axios 拦截 重新定义axios的返回值类型 以便于后续的类型推断，这里的 data 实际上是后端返回的数据
async function post(path: string, body?: any) {
  const res = await axios.post(path, body);
  const data = res as unknown as httpResponse;
  return new Promise<httpResponse>((resolve) => {
    resolve(data);
  });
}
async function get(path: string) {
  const res = await axios.get(path);
  const data = res as unknown as httpResponse;
  return new Promise<httpResponse>((resolve) => {
    resolve(data);
  });
}
async function put(path: string, body?: any) {
  const res = await axios.put(path, body);
  const data = res as unknown as httpResponse;
  return new Promise<httpResponse>((resolve) => {
    resolve(data);
  });
}
async function del(path: string) {
  const res = await axios.delete(path);
  const data = res as unknown as httpResponse;
  return new Promise<httpResponse>((resolve) => {
    resolve(data);
  });
}

export default {
  post,
  get,
  put,
  del,
};
