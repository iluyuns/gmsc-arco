import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';
import { UserData } from '@/api/user';

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;
  const userStore = useUserStore();
  const { user } = userStore;

  if (Array.isArray(value)) {
    if (value.length > 0) {
      const userInfo = user as UserData;
      const permissionValues = value;
      let hasPermission = false;
      userInfo.user_roles.forEach((role) => {
        if (permissionValues.includes(role.name)) {
          hasPermission = true;
        }
      });
      window.console.log('hasPermission', hasPermission);
      if (!hasPermission && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','user']"`);
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
