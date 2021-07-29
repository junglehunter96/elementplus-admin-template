<template>
    <list type='card' :data='list'>
        <template #header>
            <div class='card-header flex justify-between items-center'>
                <span>进行中的项目</span>
                <el-link type='primary' :underline='false' href='javascript:;'>全部项目</el-link>
            </div>
        </template>
    </list>

    <el-card shadow='hover' class='mb-2'>
        <template #header>
            <div class='card-header flex justify-between items-center'>
                <span>动态</span>
            </div>
        </template>
        <list :data='list'>
            <template #default='scope'>
                <el-button @click='edit(scope.item)'>操作</el-button>
            </template>
        </list>
    </el-card>
</template>
<script>
import List from '@/components/List/index.vue'

// list初始化
const listRender = () => {
    const list = [
        { 
            imgUrl: 'https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/903c336670c629c4f761509ce91fd037~300x300.image',
            title: '某某云',
            subTitle: '拉到东北大漠去晒太阳',
            tag: '铁蛋',
            time: '20小时前',
            href: 'javascript:;'
        },
        { 
            imgUrl: 'https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/903c336670c629c4f761509ce91fd037~300x300.image',
            title: '某某云',
            subTitle: '拉到东北大漠去晒太阳',
            tag: '铁蛋',
            time: '20小时前'
        },
        { 
            imgUrl: 'https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/903c336670c629c4f761509ce91fd037~300x300.image',
            title: '某某云',
            subTitle: '拉到东北大漠去晒太阳',
            tag: '铁蛋',
            time: '20小时前'
        },
        { 
            imgUrl: 'https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/903c336670c629c4f761509ce91fd037~300x300.image',
            title: '某某云',
            subTitle: '拉到东北大漠去晒太阳',
            tag: '铁蛋',
            time: '20小时前'
        },
        { 
            imgUrl: 'https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/903c336670c629c4f761509ce91fd037~300x300.image',
            title: '某某云',
            subTitle: '拉到东北大漠去晒太阳',
            tag: '铁蛋',
            time: '20小时前'
        },
        { 
            imgUrl: 'https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/903c336670c629c4f761509ce91fd037~300x300.image',
            title: '某某云',
            subTitle: '拉到东北大漠去晒太阳',
            tag: '铁蛋',
            time: '20小时前'
        }
    ]
    const edit = (item) => console.log(item)
    return { list, edit }
}

export default ({
    components: {
        List
    },
    setup() {
        
        return {
            ...listRender()
        }
    }
})
</script>