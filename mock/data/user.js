export const user = [
  { name: 'admin', pwd: 'admin' },
  { name: 'dev', pwd: 'dev' },
  { name: 'test', pwd: 'test' },
];

export const role = [
  { name: 'admin', description: '管理员' },
  { name: 'dev', description: '开发人员' },
  { name: 'test', description: '测试人员' },
];

export const user_role = [
  { userName: 'admin', roleName: 'admin' },
  { userName: 'dev', roleName: 'dev' },
];

export const permission = [
  { name: 'add', description: '新增' },
  { name: 'update', description: '修改' },
  { name: 'remove', description: '删除' },
];

export const role_route = [
  { roleName: 'admin', id: 1, permission: [] },
  { roleName: 'admin', id: 10, permission: [] },
  { roleName: 'admin', id: 5, permission: [] },
  { roleName: 'admin', id: 50, permission: ['add', 'update', 'remove'] },
  { roleName: 'admin', id: 51, permission: ['add', 'update', 'remove'] },

  { roleName: 'dev', id: 1, permission: [] },
  { roleName: 'dev', id: 10, permission: [] },
  { roleName: 'dev', id: 5, permission: [] },
  { roleName: 'dev', id: 50, permission: ['add'] },
];

export const route = [
  {
    id: 2,
    parentId: 0,
    name: 'Project',
    path: '/Project',
    component: 'Layout',
    redirect: '/Project/ProjectList',
    meta: { title: '项目管理' },
  },
  {
    id: 20,
    parentId: 2,
    name: 'ProjectList',
    path: '/Project/ProjectList',
    component: 'ProjectList',
    meta: { title: '项目列表' },
  },
  {
    id: 21,
    parentId: 2,
    name: 'ProjectDetail',
    path: '/Project/ProjectDetail/:projName',
    component: 'ProjectDetail',
    meta: { title: '项目详情', activeMenu: '/Project/ProjectList', hidden: true },
  },
  {
    id: 22,
    parentId: 2,
    name: 'ProjectImport',
    path: '/Project/ProjectImport',
    component: 'ProjectImport',
    meta: { title: '项目导入' },
  },
  {
    id: 3,
    parentId: 0,
    name: 'Nav',
    path: '/Nav',
    component: 'Layout',
    redirect: '/Nav/SecondNav/ThirdNav',
    meta: { title: '多级导航' },
  },
  {
    id: 30,
    parentId: 3,
    name: 'SecondNav',
    path: '/Nav/SecondNav',
    redirect: '/Nav/SecondNav/ThirdNav',
    component: 'SecondNav',
    meta: { title: '二级导航', alwaysShow: true },
  },
  {
    id: 4,
    parentId: 0,
    name: 'Components',
    path: '/Components',
    component: 'Layout',
    redirect: '/Components/OpenWindowTest',
    meta: { title: '组件测试' },
  },
  {
    id: 40,
    parentId: 4,
    name: 'OpenWindowTest',
    path: '/Components/OpenWindowTest',
    component: 'OpenWindowTest',
    meta: { title: '选择页' },
  },
  {
    id: 41,
    parentId: 4,
    name: 'CardListTest',
    path: '/Components/CardListTest',
    component: 'CardListTest',
    meta: { title: '卡片列表' },
  },
  {
    id: 42,
    parentId: 4,
    name: 'TableSearchTest',
    path: '/Components/TableSearchTest',
    component: 'TableSearchTest',
    meta: { title: '表格搜索' },
  },
  {
    id: 43,
    parentId: 4,
    name: 'ListTest',
    path: '/Components/ListTest',
    component: 'ListTest',
    meta: { title: '标签页列表' },
  },
  {
    id: 5,
    parentId: 0,
    name: 'Permission',
    path: '/Permission',
    component: 'Layout',
    redirect: '/Permission/Directive',
    meta: { title: '权限管理', alwaysShow: true },
  },
  {
    id: 50,
    parentId: 5,
    name: 'Directive',
    path: '/Permission/Directive',
    component: 'Directive',
    meta: { title: '指令管理' },
  },
  {
    id: 51,
    parentId: 5,
    name: 'PermissionEdit',
    path: '/Permission/PermissionEdit',
    component: 'PermissionEdit',
    meta: { title: '权限分配' },
  },
];
