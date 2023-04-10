import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Department: AppRouteRecordRaw = {
  path: '/department',
  name: 'department',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.department',
    icon: 'icon-user-group',
    requiresAuth: true,
    order: 7,
  },
  children: [
    {
      path: 'list',
      name: 'DepartmentList',
      component: () => import('@/views/department/list/index.vue'),
      meta: {
        locale: 'menu.department.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default Department;
