//路由关系表
//TODO
import permission from './modules/permission';
import nav from './modules/nav';

export const routeTree = [permission, nav];

// 生成平级的路由树
export const getRoutes = function (tree, routes = []) {
  for (let index = 0; index < tree.length; index++) {
    if (tree[index].children) {
      getRoutes(tree[index].children, route);
      delete tree[index].children;
    }
    routes.push(tree[index]);
  }
  return routes;
};
