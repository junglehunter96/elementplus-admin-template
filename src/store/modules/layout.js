import { login, getRouterList, getUser } from '@/api/layout/index';
import router from '@/router/index';
import { allowRouter } from '@/router/index';
import { generatorDynamicRouter } from '@/router/asyncRouter';
import changeTheme from '@/utils/changeTheme';
import { setLocal, useLocal, getLocal, decode } from '@/utils/tools';
const IMenubarStatus = {
  PCE: 0, // 电脑展开
  PCN: 1, // 电脑合并
  PHE: 2, // 手机展开
  PHN: 3, // 手机合并
};

const setting = getLocal('setting');
const token = getLocal('token');
// 前端检查token是否失效
useLocal('token')
  .then((d) => {
      console.log('d: ', d);

    token.ACCESS_TOKEN = d.ACCESS_TOKEN;
  })
  .catch(() => mutations.logout(state));

console.log('token.ACCESS_TOKEN: ', token.ACCESS_TOKEN);
const state = {
  menubar: {
    status: document.body.offsetWidth < 768 ? IMenubarStatus.PHN : IMenubarStatus.PCE,
    menuList: [],
    isPhone: document.body.offsetWidth < 768,
  },
  // 用户信息
  userInfo: {
    name: '',
    role: [],
  },
  // 标签栏
  tags: {
    tagsList: [],
    cachedViews: [],
  },
  token: {
    ACCESS_TOKEN: token.ACCESS_TOKEN || '',
  },
  setting: {
    theme: setting.theme !== undefined ? setting.theme : 0,
    showTags: setting.showTags !== undefined ? setting.showTags : true,
    color: {
      primary: setting.color !== undefined ? setting.color.primary : '#409eff',
    },
    usePinyinSearch: setting.usePinyinSearch !== undefined ? setting.usePinyinSearch : false,
  },
  isLoading: false,
};
const mutations = {
  changeCollapsed(state) {
    state.menubar.status = state.menubar.isPhone ? (state.menubar.status === IMenubarStatus.PHN ? IMenubarStatus.PHE : IMenubarStatus.PHN) : state.menubar.status === IMenubarStatus.PCN ? IMenubarStatus.PCE : IMenubarStatus.PCN;
  },
  changeDeviceWidth(state) {
    state.menubar.isPhone = document.body.offsetWidth < 768;
    state.menubar.status = state.menubar.isPhone ? IMenubarStatus.PHN : IMenubarStatus.PCE;
  },
  // 切换导航，记录打开的导航
  changeTagNavList(state, cRouter) {
    if (!state.setting.showTags) return; // 判断是否开启多标签页
    // if(cRouter.meta.hidden && !cRouter.meta.activeMenu) return // 隐藏的菜单如果不是子菜单则不添加到标签
    if (new RegExp('^/redirect').test(cRouter.path)) return;
    const index = state.tags.tagsList.findIndex((v) => v.path === cRouter.path);
    state.tags.tagsList.forEach((v) => (v.isActive = false));
    // 判断页面是否打开过
    if (index !== -1) {
      state.tags.tagsList[index].isActive = true;
      return;
    }
    const tagsList = {
      name: cRouter.name,
      title: cRouter.meta.title,
      path: cRouter.path,
      isActive: true,
    };
    state.tags.tagsList.push(tagsList);
  },
  removeTagNav(state, obj) {
    const index = state.tags.tagsList.findIndex((v) => v.path === obj.tagsList.path);
    if (state.tags.tagsList[index].path === obj.cPath) {
      state.tags.tagsList.splice(index, 1);
      const i = index === state.tags.tagsList.length ? index - 1 : index;
      state.tags.tagsList[i].isActive = true;
      mutations.removeCachedViews(state, { name: obj.tagsList.name, index });
      router.push({ path: state.tags.tagsList[i].path });
    } else {
      state.tags.tagsList.splice(index, 1);
      mutations.removeCachedViews(state, { name: obj.tagsList.name, index });
    }
  },
  removeOtherTagNav(state, tagsList) {
    const index = state.tags.tagsList.findIndex((v) => v.path === tagsList.path);
    state.tags.tagsList.splice(index + 1);
    state.tags.tagsList.splice(0, index);
    state.tags.cachedViews.splice(index + 1);
    state.tags.cachedViews.splice(0, index);
    router.push({ path: tagsList.path });
  },
  removeAllTagNav(state) {
    state.tags.tagsList.splice(0);
    state.tags.cachedViews.splice(0);
    router.push({ path: '/redirect/' });
  },
  // 添加缓存页面
  addCachedViews(state, obj) {
    if (!state.setting.showTags) return; // 判断是否开启多标签页
    if (obj.noCache || state.tags.cachedViews.includes(obj.name)) return;
    state.tags.cachedViews.push(obj.name);
  },
  // 删除缓存页面
  removeCachedViews(state, obj) {
    // 判断标签页是否还有该页面
    if (state.tags.tagsList.map((v) => v.name).includes(obj.name)) return;
    state.tags.cachedViews.splice(obj.index, 1);
  },
  login(state, token = '') {
    state.token.ACCESS_TOKEN = token;
    setLocal('token', state.token, 1000 * 60 * 60);
    const { query } = router.currentRoute.value;
    router.push(typeof query.from === 'string' ? decode(query.from) : '/');
  },
  logout(state) {
    state.token.ACCESS_TOKEN = '';
    localStorage.removeItem('token');
    history.go(0);
  },
  setRoutes(state, data) {
    state.menubar.menuList = data;
  },
  concatAllowRoutes(state) {
    allowRouter.reverse().forEach((v) => state.menubar.menuList.unshift(v));
  },
  getUser(state, userInfo) {
    state.userInfo.name = userInfo.name;
    state.userInfo.role = userInfo.role;
  },
  // 修改主题
  changeTheme(state, num) {
    if (num === state.setting.theme) return;
    if (typeof num !== 'number') num = state.setting.theme;
    changeTheme(num);
    state.setting.theme = num;
    localStorage.setItem('setting', JSON.stringify(state.setting));
  },
  changeTagsSetting(state, showTags) {
    state.setting.showTags = showTags;
    localStorage.setItem('setting', JSON.stringify(state.setting));

    if (showTags) {
      const index = state.tags.tagsList.findIndex((v) => v.path === router.currentRoute.value.path);
      if (index !== -1) {
        state.tags.tagsList.forEach((v) => (v.isActive = false));
        state.tags.tagsList[index].isActive = true;
      } else {
        mutations.changeTagNavList(state, router.currentRoute.value);
      }
    }
  },
  changePinSearchSetting(state, showPinyinSearch) {
    state.setting.usePinyinSearch = showPinyinSearch;
    localStorage.setItem('setting', JSON.stringify(state.setting));
  },
  // 下次进去该页面刷新该页面(解决子页面保存之后，回到父页面页面不刷新问题)
  refreshPage(state, path) {
    const name = state.tags.tagsList.filter((v) => v.path === path)[0]?.name;
    if (!name) return;
    const index = state.tags.cachedViews.findIndex((v) => v === name);
    state.tags.cachedViews.splice(index, 1);
  },
};
const actions = {
  async login(context, param) {
    const res = await login(param);
    const token = res.data.Data;
    context.commit('login', token);
  },
  async getUser(context) {
    const res = await getUser();
    const userInfo = res.data.Data;
    context.commit('getUser', userInfo);
  },
  async GenerateRoutes() {
    const res = await getRouterList();
    const { Data } = res.data;
    generatorDynamicRouter(Data);
  },
};
const layoutState = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default layoutState;
