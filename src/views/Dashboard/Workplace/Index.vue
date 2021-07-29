<template>
    <div class='content'>
        <el-card class='mb-2' shadow='hover'>
            <div class='py-4 font-bold'>工作台</div>
            <el-row>
                <el-col :xs='24' :md='16'>
                    <div class='flex items-center'>
                        <div class='pr-4 flex items-center'>
                            <el-avatar class='w-16 h-16' src='https://iconfont.alicdn.com/t/1520995303822.jpg@100h_100w.jpg' />
                        </div>
                        <div>
                            <div class='text-xl'>你好，{{ user.name }} ，祝你开心每一天！</div>
                            <div class='text-sm text-gray-400 pt-2'>阿巴阿巴阿巴阿巴－某某某某某</div>
                        </div>
                    </div>
                </el-col>
                <el-col :xs='24' :md='8'>
                    <div class='flex items-center flex-row-reverse'>
                        <div class='px-1 text-center'>
                            <div class='text-sm text-gray-400 pb-2'>访问量</div>
                            <div class='text-xl'>4,124</div>
                        </div>
                        <el-divider direction='vertical' class='h-8' />
                        <div class='px-1 text-center'>
                            <div class='text-sm text-gray-400 pb-2'>排名</div>
                            <div class='text-xl'>1/101</div>
                        </div>
                        <el-divider direction='vertical' class='h-8' />
                        <div class='px-1 text-center'>
                            <div class='text-sm text-gray-400 pb-2'>项目数量</div>
                            <div class='text-xl'>12</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>

        <el-row :gutter='15'>
            <el-col :md='24' :lg='16'>
                <List />
            </el-col>

            <el-col :md='24' :lg='8'>
                <el-card shadow='hover' class='mb-2'>
                    <template #header>
                        <div class='card-header flex justify-between items-center'>
                            <span>快速开始</span>
                        </div>
                    </template>
                    <div class='flex flex-wrap'>
                        <div v-for='o in 7' :key='o' class='p-1'>
                            <el-tag>{{ '操作 ' + o }}</el-tag>
                        </div>
                    </div>
                </el-card>

                <Chart />
            </el-col>
        </el-row>
    </div>
</template>

<script >
import { useStore } from '@/store/index'
import Chart from '@/views/Dashboard/Workplace/_Components/Chart.vue'
import List from '@/views/Dashboard/Workplace/_Components/List.vue'

export default ({
    name: 'Workplace',
    components: {
        List,
        Chart
    },
    setup() {
        const store = useStore()
        return {
            user: store.state.layout.userInfo
        }
    }
})
</script>