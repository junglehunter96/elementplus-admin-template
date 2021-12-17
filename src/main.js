import { createApp } from 'vue';
import App from '@/App.vue';
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import direct from '@/directive/index';
import router from '@/router/index';
import { store } from '@/store/index';
import '@/permission';
import 'element-plus/theme-chalk/index.css';
import 'element-plus/theme-chalk/display.css';
import 'nprogress/nprogress.css';
import '@/assets/css/index.css';
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvnIcon/index.vue';

// 分页组件
import Pagination from '@/components/Pagination/index.vue';
// 自定义树选择组件
import TreeSelect from '@/components/TreeSelect/index.vue';
// 字典标签组件
import DictTag from '@/components/DictTag/index.vue';

import { handleTree, decode, encode } from '@/utils/tools.js';
// 表单方法
import { validate, validateField, resetFields, clearValidate } from '@/utils/formExtend.js';

// 注册指令
import plugins from './plugins';

const app = createApp(App);

// 全局组件挂载
app.component('DictTag', DictTag);
app.component('Pagination', Pagination);
app.component('TreeSelect', TreeSelect);

// 全局表单挂载方法
app.config.globalProperties.formTools = {
  validate,
  validateField,
  resetFields,
  clearValidate,
};
// 全局方法挂载
app.config.globalProperties.tools = {
  handleTree,
  decode,
  encode,
};
direct(app);
app.use(ElementPlus, { locale });
app.use(router);
app.use(store);
app.use(plugins);
app.component('SvgIcon', SvgIcon);
app.mount('#app');
