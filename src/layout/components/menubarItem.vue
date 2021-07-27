<template>
    <el-submenu v-if='menuList.children && menuList.children.length > 0' :key='menuList.path' :index='menuList.path'>
        <template #title>
            <i :class='menuList.meta.icon || "el-icon-location"' />
            <span>{{ menuList.meta.title }}</span>
        </template>
        <el-menu-item-group>
            <menubar-item v-for='v in menuList.children' :key='v.path' :index='v.path' :menu-list='v' />
        </el-menu-item-group>
    </el-submenu>

    <el-menu-item
        v-else
        :key='menuList.path'
        :index='menuList.path'
    >
        <i :class='menuList.meta.icon || "el-icon-setting"' />
        <template #title>
            {{ menuList.meta.title }}
        </template>
    </el-menu-item>
</template>

<script >

export default ({
    name: 'MenubarItem',
    props: {
        menuList: {
            type: Object,
            default: () => {return {}}
        }
    },
    setup() {
        return {}
    }
})
</script>