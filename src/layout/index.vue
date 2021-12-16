<template>
  <div class="flex h-screen layout">
    <div
      class="fixed z-20 w-screen h-screen bg-black bg-opacity-25 layout-sidebar-mask"
      :class="{hidden: layout.menubar.status !== 2 }"
      @click="changeCollapsed"
    />
    <div
      class="flex flex-col h-screen duration-200 shadow layout-sidebar transition-width"
      :class="{ 
                'w-64': layout.menubar.status === 0 || layout.menubar.status === 2, 
                'w-0': layout.menubar.status === 3, 
                'w-16': layout.menubar.status === 1, 
                'absolute z-30': layout.menubar.status === 2 || layout.menubar.status === 3, 
            }"
    >
      <div class="relative flex h-24 shadow-lg layout-sidebar-logo flex-center">
        <span class="flex px-2 cursor-pointer flex-center" @click="showLogoutDialog">
          <el-popconfirm confirm-button-text="确定" cancel-button-text="不" title="确认退出登录吗？" @confirm="logout">
            <template #reference>
              <div class="flex flex-col flex-center">
                <el-avatar :size="35" src="https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/903c336670c629c4f761509ce91fd037~300x300.image" />
                <span class="mt-2">{{ userInfo.name }}</span>
              </div>
            </template>
          </el-popconfirm>
        </span>
        <Screenfull class="ml-5" />
      </div>
      <div class="flex flex-1 overflow-hidden layout-sidebar-menubar">
        <layout-menubar />
      </div>
      <div class="flex items-center justify-center">收银台：0001</div>
    </div>
    <div class="flex flex-col flex-1 overflow-x-hidden overflow-y-auto layout-main">
      <!-- <div class='relative z-10 flex items-center justify-between h-12 overflow-hidden shadow-sm layout-main-navbar'>
                <layout-navbar />
      </div>-->
      <div v-if="layout.setting.showTags" class="relative h-8 text-sm leading-8 text-gray-600 layout-main-tags">
        <layout-tags />
      </div>
      <div class="flex-1 overflow-hidden layout-main-content">
        <layout-content />
      </div>
    </div>
    <div class="fixed right-0 z-10 layout-sidebar-sidesetting top-64">
      <!-- <layout-side-setting /> -->
    </div>
  </div>
</template>

<script >
import { onMounted } from 'vue';
import LayoutContent from '@/layout/components/content.vue';
import LayoutMenubar from '@/layout/components/menubar.vue';
// import LayoutNavbar from '@/layout/components/navbar.vue'
import LayoutTags from '@/layout/components/tags.vue';
import LayoutSideSetting from '@/layout/components/sideSetting.vue';
import { useStore } from '@/store/index';
import { throttle } from '@/utils/tools';
import Screenfull from '@/layout/components/screenfull.vue';
export default {
  name: 'Layout',
  components: {
    LayoutContent,
    LayoutMenubar,
    // LayoutNavbar,
    LayoutTags,
    LayoutSideSetting,
    Screenfull,
  },
  setup() {
    const store = useStore();
    const changeDeviceWidth = () => store.commit('layout/changeDeviceWidth');
    const changeCollapsed = () => store.commit('layout/changeCollapsed');

    store.commit('layout/changeTheme');

    onMounted(async () => {
      changeDeviceWidth();
      const throttleFn = throttle(300);
      let throttleF = async function () {
        await throttleFn();
        changeDeviceWidth();
      };
      window.addEventListener('resize', throttleF, true);
    });
    const logout = () => store.commit('layout/logout');
    return {
      userInfo: store.state.layout.userInfo,
      layout: store.state.layout,
      changeCollapsed,
      logout,
    };
  },
};
</script>

<style lang='postcss' scoped>
::v-deep(.layout-sidebar-sidesetting .el-drawer__header) {
  margin-bottom: 0;
}
</style>