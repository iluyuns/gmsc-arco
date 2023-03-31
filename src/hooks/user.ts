import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { useI18n } from 'vue-i18n';

import { useUserStore } from '@/store';

export default function useUser() {
  const { t } = useI18n();
  const router = useRouter();
  const userStore = useUserStore();
  const logout = async (logoutTo?: string) => {
    await userStore.logout();
    const currentRoute = router.currentRoute.value;
    Message.success(t('login.form.logout.success'));
    router.push({
      name: logoutTo && typeof logoutTo === 'string' ? logoutTo : 'login',
      query: {
        ...router.currentRoute.value.query,
        redirect: currentRoute.name as string,
      },
    });
  };
  return {
    logout,
  };
}
