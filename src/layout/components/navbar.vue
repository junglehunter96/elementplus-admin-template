<template>
    <div class='flex items-center px-4 flex-wrap h-12 leading-12'>
        <span class='text-2xl cursor-pointer h-12 leading-12' :class='{ "el-icon-s-fold": !menubar.status, "el-icon-s-unfold": menubar.status }' @click='changeCollapsed' />
        <!-- 面包屑导航 -->
        <div class='px-4'>
            <el-breadcrumb separator='/'>
                <transition-group name='breadcrumb'>
                    <el-breadcrumb-item key='/' :to='{ path: "/" }'>主页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for='v in data.breadcrumbList' :key='v.path' :to='v.path'>{{ v.title }}</el-breadcrumb-item>
                </transition-group>
            </el-breadcrumb>
        </div>
    </div>
    <div class='flex items-center flex-row-reverse px-4 min-width-32'>
        <!-- 用户下拉 -->
        <el-dropdown>
            <span class='el-dropdown-link flex flex-center px-2'>
                <el-avatar :size='30' src='https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/903c336670c629c4f761509ce91fd037~300x300.image' />
                <span class='ml-2'>{{ userInfo.name }}</span>
                <i class='el-icon-arrow-down el-icon--right' />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>
                        <el-link href='' target='_blank' :underline='false'>个人中心</el-link>
                    </el-dropdown-item>
                    <el-dropdown-item divided @click='logout'>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        
        <Notice />
        <Screenfull />
        <Search />
    </div>
</template>

<script >
import {  reactive, watch } from 'vue'
import { useStore } from '@/store/index'
import { useRoute } from 'vue-router'
import Notice from '@/layout/components/notice.vue'
import Screenfull from '@/layout/components/screenfull.vue'
import Search from '@/layout/components/search.vue'

// 面包屑导航
const breadcrumb = (route) => {
    const fn = () => {
        const breadcrumbList = []
        const notShowBreadcrumbList = ['Dashboard', 'RedirectPage'] // 不显示面包屑的导航
        if(route.matched[0] && (notShowBreadcrumbList.includes(route.matched[0].name))) return breadcrumbList
        route.matched.forEach(v => {
            const obj = {
                title: v.meta.title,
                path: v.path
            }
            breadcrumbList.push(obj)
        })
        return breadcrumbList
    }
    let data = reactive({
        breadcrumbList: fn()
    })
    watch(() => route.path, () => data.breadcrumbList = fn())
    return { data }
}

export default  ({
    name: 'LayoutNavbar',
    components: {
        Notice,
        Search,
        Screenfull
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const changeCollapsed = () => store.commit('layout/changeCollapsed')
        const logout = () => store.commit('layout/logout')
        return {
            menubar: store.state.layout.menubar,
            userInfo: store.state.layout.userInfo,
            changeCollapsed,
            logout,
            ...breadcrumb(route)
        }
    }
})
</script>

<style lang='postcss' scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
    transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
}

.breadcrumb-move {
    transition: all 0.5s;
}

.breadcrumb-leave-active {
    position: absolute;
}
</style>