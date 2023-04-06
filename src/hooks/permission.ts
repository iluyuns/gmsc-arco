import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';
import { UserData } from '@/api/user';

export default function usePermission() {
  const { user } = useUserStore();
  const userInfo = user as UserData;
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      let hasPermission = false;
      if (!route.meta?.requiresAuth) {
        hasPermission = true;
      } else if (!route.meta?.roles) {
        hasPermission = true;
      } else if (route.meta?.roles?.includes('*')) {
        hasPermission = true;
      } else {
        // userInfo.user_roles.forEach((role) => {
        //   if (route.meta?.roles?.includes(role.name)) {
        //     hasPermission = true;
        //   }
        // });
        // 把上门的 forEach 改成了 for 循环 优化性能
        for (let i = 0; i < userInfo.user_roles.length; i += 1) {
          if (route.meta?.roles?.includes(userInfo.user_roles[i].name)) {
            hasPermission = true;
            break;
          }
        }
      }

      return hasPermission;
    },
    findFirstPermissionRoute(_routers: any, role = 'admin') {
      const cloneRouters = [..._routers];
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role);
          })
        )
          return { name: firstElement.name };
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    },
    // You can add any rules you want
  };
}
