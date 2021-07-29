<template>
  <div>
    permissionEdit
    <el-tree
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="{
        children: 'children',
        label: 'meta.title'
    }"
    ></el-tree>
  </div>
</template>

<script >
import { routeTree, getRoutes } from '@/router/routerConfig';

export default {
  name: 'PermissionEdit',
  setup() {

    return {
      routeTree,
    };
  },
};
</script>

