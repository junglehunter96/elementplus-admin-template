export default {
  id: 5,
  parentId: 0,
  name: 'Permission',
  path: '/Permission',
  component: 'Layout',
  redirect: '/Permission/Directive',
  meta: { title: '权限管理', icon: 'el-icon-phone', alwaysShow: true },
  children: [
    {
      id: 50,
      parentId: 5,
      name: 'Directive',
      path: '/Permission/Directive',
      component: 'Directive',
      meta: { title: '指令管理', icon: 'el-icon-goods',permission: ['add', 'update', 'remove']  },
    },
  ],
};

