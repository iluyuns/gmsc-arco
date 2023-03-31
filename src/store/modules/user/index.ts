import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  UserInfo,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
// import { HttpResponse } from '@/api/interceptor';
// import { Message } from '@arco-design/web-vue';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserInfo => ({
    message: '',
    status: 0,
    user: {},
  }),
  getters: {
    userInfo(state: UserInfo): UserInfo {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserInfo>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      this.setInfo(res);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        if (res.token) setToken(res.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      return new Promise((resolve, reject) => {
        userLogout()
          .then((r) => {
            this.logoutCallBack();
            resolve(r);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});

export default useUserStore;
