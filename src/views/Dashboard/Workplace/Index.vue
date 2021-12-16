<template>
    <div class='content'>
        <el-card class='mb-2' shadow='hover'>
            <div class='py-4 font-bold'>工作台</div>
            <el-row>
                <el-col :xs='24' :md='16'>
                    <div class='flex items-center'>
                        <div class='flex items-center pr-4'>
                            <el-avatar class='w-16 h-16' src='https://iconfont.alicdn.com/t/1520995303822.jpg@100h_100w.jpg' />
                        </div>
                        <div>
                            <div class='text-xl'>你好，{{ user.name }} ，祝你开心每一天！</div>
                            <div class='pt-2 text-sm text-gray-400'>阿巴阿巴阿巴阿巴－某某某某某</div>
                        </div>
                    </div>
                </el-col>
                <el-col :xs='24' :md='8'>
                    <div class='flex flex-row-reverse items-center'>
                        <div class='px-1 text-center'>
                            <div class='pb-2 text-sm text-gray-400'>访问量</div>
                            <div class='text-xl'>4,124</div>
                        </div>
                        <el-divider direction='vertical' class='h-8' />
                        <div class='px-1 text-center'>
                            <div class='pb-2 text-sm text-gray-400'>排名</div>
                            <div class='text-xl'>1/101</div>
                        </div>
                        <el-divider direction='vertical' class='h-8' />
                        <div class='px-1 text-center'>
                            <div class='pb-2 text-sm text-gray-400'>项目数量</div>
                            <div class='text-xl'>12</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script >
import { useStore } from '@/store/index'


export default ({
    name: 'Workplace',
    components: {

    },
    setup() {
        const store = useStore()
        return {
            user: store.state.layout.userInfo
        }
    }
})
</script>