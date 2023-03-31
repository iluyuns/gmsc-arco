import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  message: string;
  explanation: string;
  status: number;
  data: T;
  token: string;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    return res;
  },
  (error) => {
    const res = error.response as AxiosResponse;
    const data = res.data as HttpResponse;
    if (data?.message) {
      Message.error({
        content: data.message + (data.explanation || '') || 'Request Error',
        duration: 5 * 1000,
      });
      return Promise.reject(data);
    }
    const data2 = {
      message: '发生错误',
      explanation: error,
    };
    Message.error({
      content: data.message + (data.explanation || '') || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(data2);
  }
);
