<template>
  <div>
    <el-tree :data="routeTree" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" :props="defaultProp" ref="tree">
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span v-if="data.meta.permission && data.meta.permission.length > 0">
            <a v-for="(item,index) of data.meta.permission.map(i=>({label:i,checked:false}))" :key="index" class="mr-3 text-blue-400">{{item.label}}</a>
          </span>
        </span>
      </template>
    </el-tree>

    <el-button @click="getCheckedNodes">通过 node 获取</el-button>
  </div>
</template>

<script >
import { routeTree, getRoutes } from '@/router/routerConfig';
import { ref } from 'vue';
export default {
  name: 'PermissionEdit',
  setup() {
    const defaultProp = {
      children: 'children',
      label: (data, node) => {
        return data.meta.title || '';
      },
    };
    let tree = ref(null);
    function getCheckedNodes() {
      console.dir(tree.value.getCheckedNodes());
      // console.log(tree.getCheckedNodes());
    }
    return {
      routeTree,
      defaultProp,
      getCheckedNodes,
      tree,
    };
  },
};
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

