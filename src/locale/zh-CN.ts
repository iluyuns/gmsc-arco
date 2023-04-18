import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

import localeMonitor from '@/views/dashboard/monitor/locale/zh-CN';

import localeSearchTable from '@/views/list/search-table/locale/zh-CN';
import localeCardList from '@/views/list/card/locale/zh-CN';

import localeStepForm from '@/views/form/step/locale/zh-CN';
import localeGroupForm from '@/views/form/group/locale/zh-CN';

import localeBasicProfile from '@/views/profile/basic/locale/zh-CN';

import localeDataAnalysis from '@/views/visualization/data-analysis/locale/zh-CN';
import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/zh-CN';

import localeSuccess from '@/views/result/success/locale/zh-CN';
import localeError from '@/views/result/error/locale/zh-CN';

import locale403 from '@/views/exception/403/locale/zh-CN';
import locale404 from '@/views/exception/404/locale/zh-CN';
import locale500 from '@/views/exception/500/locale/zh-CN';

import localeUserInfo from '@/views/user/info/locale/zh-CN';
import localeUserList from '@/views/user/list/locale/zh-CN';
import localeUserSetting from '@/views/user/setting/locale/zh-CN';

import localeDepartmentGoods from '@/views/department/goods/locale/zh-CN';
import localeDepartmentList from '@/views/department/list/locale/zh-CN';

import localePoster from '@/views/poster/locale/zh-CN';
import localePosterDesign from '@/views/poster/design/locale/zh-CN';
import localePosterList from '@/views/poster/list/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '用户管理',
  'menu.department': '事业部门',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  'model.id': 'ID',
  'model.created_at': '创建时间',
  'model.updated_at': '更新时间',
  'model.deleted_at': '删除时间',
  'model.name': '名称',
  'model.title': '标题',
  'model.description': '描述',
  'model.status': '状态',
  'model.width': '宽',
  'model.height': '高',
  'model.x': 'X',
  'model.y': 'Y',
  'model.z': 'Z',
  'model.rotate': '旋转',
  'model.scale': '缩放',
  'model.opacity': '透明度',
  'model.position': '位置',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,

  ...localeMonitor,
  ...localeSearchTable,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeUserList,
  ...localeUserSetting,
  ...localeDepartmentGoods,
  ...localeDepartmentList,
  ...localePoster,
  ...localePosterDesign,
  ...localePosterList,
};
