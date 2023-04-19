import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const FORM: AppRouteRecordRaw = {
  path: '/form',
  name: 'form',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.form',
    icon: 'icon-settings',
    requiresAuth: true,
    order: 22,
  },
  children: [
    {
      path: 'step',
      name: 'Step',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['超级管理员'],
      },
    },
    {
      path: 'group',
      name: 'Group',
      component: () => import('@/views/form/group/index.vue'),
      meta: {
        locale: 'menu.form.group',
        requiresAuth: true,
        roles: ['超级管理员'],
      },
    },
  ],
};

export default FORM;
