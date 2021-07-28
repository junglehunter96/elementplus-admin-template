<template>
    <el-scrollbar wrap-class='scrollbar-wrapper'>
        <el-menu
            :default-active='activeMenu'
            :collapse='menubar.status === 1 || menubar.status === 3'
            :class='{ 
                "el-menu-vertical-demo": true,
                "w-64": menubar.status === 0 || menubar.status === 2, 
                "w-0": menubar.status === 3, 
                "w-16": menubar.status === 1, 
            }'
            :collapse-transition='false'
            :unique-opened='true'
            @select='onOpenChange'
        >
            <menubar-item v-for='v in filterMenubarData' :key='v.path' :index='v.path' :menu-list='v' />
        </el-menu>
    </el-scrollbar>
</template>

<script >
import { computed } from 'vue'
import MenubarItem from '/@/layout/components/menubarItem.vue'
import { useStore } from '/@/store/index'
import { useRoute, useRouter } from 'vue-router'

// 过滤隐藏的菜单，并提取单条的子菜单
const filterMenubar = (menuList) => {
    const f = (menuList) => {
        let arr = []
        menuList.filter(v => !v.meta.hidden).forEach(v => {
            let child = v.children && v.children.filter(v => !v.meta.hidden)
            let currentItem = v
            if(!v.meta.alwaysShow && child && child.length === 1) {
                [currentItem] = child
            }
            arr.push(currentItem)
            if(currentItem.children && currentItem.children.length > 0) {
                arr[arr.length - 1].children = f(currentItem.children)
            }
        })
        return arr
    }
    return f(menuList)
}

export default  ({
    name: 'LayoutMenubar',
    components: {
        MenubarItem
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const { menubar } = store.state.layout

        const filterMenubarData = filterMenubar(menubar.menuList)
        store.commit('layout/setRoutes', filterMenubarData)

        const activeMenu = computed(() => {
            if(route.meta.activeMenu) return route.meta.activeMenu
            return route.path
        })
        const onOpenChange = (d) => {
            console.log('testing')
            router.push({ path: d })
            menubar.status === 2 && store.commit('layout/changeCollapsed')
        }
        return {
            menubar,
            filterMenubarData,
            activeMenu,
            onOpenChange
        }
    }
})
</script>