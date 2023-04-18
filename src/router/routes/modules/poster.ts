import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const LIST: AppRouteRecordRaw = {
  path: '/poster',
  name: 'poster',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.poster',
    requiresAuth: true,
    icon: 'icon-list',
    order: 3,
  },
  children: [
    {
      path: 'PosterList', // The midline path complies with SEO specifications
      name: 'PosterList',
      component: () => import('@/views/poster/list/index.vue'),
      meta: {
        locale: 'poster.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'PosterDesign',
      name: 'PosterDesign',
      component: () => import('@/views/poster/design/index.vue'),
      meta: {
        locale: 'poster.design',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default LIST;
