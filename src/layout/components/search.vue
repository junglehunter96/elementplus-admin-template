<template>
    <div class='layout-navbar-search hidden-xs-only cursor-pointer flex flex-center px-2' :class='{"open": isShow}'>
        <svg-icon class-name='svg-icon' icon-class='svg-search' @click.stop='changeStatus' />
        <div class='layout-navbar-search-select'>
            <el-select
                ref='elSelect'
                v-model='href'
                filterable
                placeholder='search'
                remote
                :remote-method='searchText'
                @change='changeRoute'
            >
                <el-option v-for='item in searchList' :key='item.path' :label='item.searchLabel' :value='item.path' />
            </el-select>
        </div>
    </div>
</template>
<script >
import {   ref, watch } from 'vue'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'

// 不使用则不加载
const pinyin = () => import('pinyin')
// 搜索查询
const search = async(searchList, menuList, setting) => {
    const fuseList = []
    const f = async(list, text) => {
        for(let v of list) {
            const obj = Object.assign({}, v, { 
                searchLabel: text + v.meta.title
            })
            // 判断是否开启拼音搜索
            if(setting.usePinyinSearch) {
                const data = await pinyin()
                obj.pinyinTitle = data.default(v.meta.title, {
                    style: data.STYLE_NORMAL
                }).join('')
            }
            fuseList.push(obj)
            if(v.children && v.children.length > 0) {
                f(v.children, `${text + v.meta.title} > `)
            }
        }
    }
    await f(menuList, '')

    const FuseOpts = () => {
        return {
            shouldSort: true,
            threshold: 0.4,
            location: 0,
            distance: 100,
            minMatchCharLength: 1,
            includeScore: true,
            keys: setting.usePinyinSearch ? ['meta.title', 'path', 'pinyinTitle'] : ['meta.title', 'path']
        }
    }
    let fuse = new Fuse(fuseList, FuseOpts())

    watch(() => setting.usePinyinSearch, async() => {
        fuseList.splice(0, fuseList.length)
        await f(menuList, '')
        fuse = new Fuse(fuseList, FuseOpts())
    })
    
    const searchText = (query) => {
        if(query !== '') {
            searchList.value = fuse.search(query).map(v => v.item)
        }else{
            searchList.value = []
        }
    }

    return searchText
}
// search显示隐藏状态
const changeSearchStatus = (searchList) => {
    const router = useRouter()
    const href = ref('')
    const isShow = ref(false)
    const elSelect = ref()
    const changeStatus = () => {
        isShow.value = !isShow.value
        if(isShow.value && elSelect.value) {
            elSelect.value.focus()
        }
    }

    const hideSearch = () => {
        href.value = ''
        searchList.value.splice(0, searchList.value.length)
        isShow.value = false
    }

    watch(isShow, (newValue) => {
        if(newValue) {
            document.body.addEventListener('click', hideSearch)
        }else{
            document.body.removeEventListener('click', hideSearch)
        }
    })

    const changeRoute = () => {
        router.push({ path: href.value })
        hideSearch()
    }

    return {
        href,
        changeRoute,
        changeStatus,
        isShow,
        elSelect,
        hideSearch
    }
}

export default ({
    name: 'Search',
    setup() {
        const store = useStore()
        const searchList = ref([])
        const { menuList } = store.state.layout.menubar
        const { setting } = store.state.layout
        const searchText = ref(null)

        search(searchList, menuList, setting).then(data => {
            searchText.value = data
        })
        

        return {
            searchList,
            searchText,
            ...changeSearchStatus(searchList)
        }
    }
})
</script>

<style lang='postcss' scoped>
    ::v-deep(.el-input__inner) {
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
    }

    ::v-deep(.el-select__caret) {
        display: none;
    }

    .layout-navbar-search {
        .layout-navbar-search-select {
            transition: width 0.2s;
            width: 0;
            overflow: hidden;
        }

        &.open {
            .layout-navbar-search-select {
                width: 210px;
            }
        }
    }
</style>