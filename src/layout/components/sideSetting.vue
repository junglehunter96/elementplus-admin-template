<template>
    <i class='el-icon-s-tools text-2xl px-2 py-1 cursor-pointer rounded-l-md' @click='drawer=!drawer' />
    <el-drawer v-model='drawer' title='系统布局配置' size='260px'>
        <div class='p-4'>
            <el-row :gutter='20'>
                <el-col v-for='(val,index) in theme' :key='index' :span='8'>
                    <div class='flex shadow-lg border border-gray-100 w-18 cursor-pointer m-1' @click='changeTheme(index)'> 
                        <div class='flex flex-col w-4 h-16'>
                            <div class='h-3' :style='{"backgroundColor": (val.logoBg || val.sidebarBg)}' />
                            <div class='flex-1' :style='{"backgroundColor": val.sidebarBg}' />
                        </div>
                        <div class='flex flex-col flex-1'>
                            <div class='h-3' :style='{"backgroundColor": val.navbarBg || "#fff"}' />
                            <div v-if='layout.setting.showTags' class='h-2' :style='{"backgroundColor": val.tagsBg || "#fff"}' />
                            <div class='flex-1 relative' :style='{"backgroundColor": val.mainBg}'>
                                <i v-if='layout.setting.theme===index' class='el-icon-check absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4' :style='{"color": val.sidebarActiveBg}' />
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
    
            <div class='mt-5 text-sm'>
                <div class='flex justify-between items-center py-1'>
                    <div>开启 Tags-View</div>
                    <el-switch v-model='showTags' />
                </div>
                <div class='flex justify-between items-center py-1'>
                    <div>主题色</div>
                    <layout-theme />
                </div>
                <div class='flex justify-between items-center py-1'>
                    <div>菜单支持拼音搜索</div>
                    <el-switch v-model='showPinyinSearch' />
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script >
import { ref,watch } from 'vue'
import theme from '@/config/theme'
import { useStore } from '@/store/index'
import LayoutTheme from '@/layout/components/theme.vue'

export default  ({
    name: 'LayoutSideSetting',
    components: {
        LayoutTheme
    },
    setup() {
        const store = useStore()
        const drawer = ref(false)
        const changeTheme = (index) => store.commit('layout/changeTheme', index)
        const showTags = ref(store.state.layout.setting.showTags)
        const showPinyinSearch = ref(store.state.layout.setting.usePinyinSearch)

        watch(() => showTags.value, () => store.commit('layout/changeTagsSetting', showTags.value))
        watch(() => showPinyinSearch.value, () => store.commit('layout/changePinSearchSetting', showPinyinSearch.value))

        return {
            drawer,
            theme,
            changeTheme,
            layout: store.state.layout,
            showTags,
            showPinyinSearch
        }
    }
})
</script>
