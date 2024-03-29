import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';

import localeMonitor from '@/views/dashboard/monitor/locale/en-US';

import localeSearchTable from '@/views/list/search-table/locale/en-US';
import localeCardList from '@/views/list/card/locale/en-US';

import localeStepForm from '@/views/form/step/locale/en-US';
import localeGroupForm from '@/views/form/group/locale/en-US';

import localeBasicProfile from '@/views/profile/basic/locale/en-US';

import localeDataAnalysis from '@/views/visualization/data-analysis/locale/en-US';
import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/en-US';

import localeSuccess from '@/views/result/success/locale/en-US';
import localeError from '@/views/result/error/locale/en-US';

import locale403 from '@/views/exception/403/locale/en-US';
import locale404 from '@/views/exception/404/locale/en-US';
import locale500 from '@/views/exception/500/locale/en-US';

import localeUserInfo from '@/views/user/info/locale/en-US';
import localeUserList from '@/views/user/list/locale/en-US';
import localeUserSetting from '@/views/user/setting/locale/en-US';

import localeDepartmentGoods from '@/views/department/goods/locale/en-US';
import localeDepartmentList from '@/views/department/list/locale/en-US';

import localePoster from '@/views/poster/locale/en-US';
import localePosterDesign from '@/views/poster/design/locale/en-US';
import localePosterList from '@/views/poster/list/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Management',
  'menu.poster': 'Poster Management',
  'menu.department': 'Department Management',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  'model.id': 'ID',
  'model.created_at': 'Created At',
  'model.updated_at': 'Updated At',
  'model.deleted_at': 'Deleted At',
  'model.name': 'Name',
  'model.description': 'Description',
  'model.status': 'Status',
  'model.width': 'width',
  'model.height': 'height',
  'model.x': 'X',
  'model.y': 'Y',
  'model.z': 'Z',
  'model.rotate': 'Rotate',
  'model.scale': 'Scale',
  'model.opacity': 'Opacity',
  'model.position': 'Position',
  'model.size': 'Size',
  'model.page': 'page',
  'model.total': 'total',
  'model.operations': 'Operations',
  'model.dpi': 'DPI',
  'model.grade_value': 'Grade Value',
  'model.grade_name': 'Grade Name',
  'model.placeholder.input': 'Please enter',
  'model.placeholder.select': 'Please select',
  'model.phone': 'Phone',
  'model.edit': 'Edit',
  'model.delete': 'Delete',
  'model.add': 'Add',
  'model.save': 'Save',
  'model.cancel': 'Cancel',
  'model.back': 'back',
  'model.confirm.delete': 'Confirm delete?',
  'model.confirm': 'Confirm',
  'model.confirm.cancel': 'Cancel',

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
