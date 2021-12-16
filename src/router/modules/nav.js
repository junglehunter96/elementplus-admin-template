export default {
  id: 3,
  parentId: 0,
  name: 'Nav',
  path: '/Nav',
  component: 'Layout',
  redirect: '/Nav/SecondNav/ThirdNav',
  meta: { title: '多级导航', icon: 'el-icon-picture' },
  children: [
    {
      id: 30,
      parentId: 3,
      name: 'SecondNav',
      path: '/Nav/SecondNav',
      redirect: '/Nav/SecondNav/ThirdNav',
      component: 'SecondNav',
      meta: { title: '二级导航', icon: 'el-icon-camera', alwaysShow: true ,permission: ['add', 'update', 'remove'] },
    },
  ],
};
