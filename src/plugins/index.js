import modal from './modal';
// import auth from './auth';
export default function installPlugins(app) {
  // 认证对象
  // app.config.globalProperties.$auth = auth;
  // 模态框对象
  app.config.globalProperties.$modal = modal;
}
