import { createRouter, createWebHashHistory } from 'vue-router'
import { components } from '/@/router/asyncRouter'

const Components= Object.assign({}, components, {
    Layout: () => import('/@/layout/index.vue'),
    Redirect: (() => import('/@/layout/redirect.vue')),
    LayoutBlank: (() => import('/@/layout/blank.vue'))
})

// 静态路由页面
export const allowRouter = [
    {
        name: 'Dashboard',
        path: '/',
        component: Components['Layout'],
        redirect: '/Dashboard/Workplace',
        meta: { title: '仪表盘', icon: 'el-icon-eleme' },
        children: [
            {
                name: 'Workplace',
                path: '/Dashboard/Workplace',
                component: Components['Workplace'],
                meta: { title: '工作台', icon: 'el-icon-s-tools' }
            }
            // {
            //     name: 'Welcome',
            //     path: '/Dashboard/Welcome',
            //     component: Components['Welcome'],
            //     meta: { title: '欢迎页', icon: 'el-icon-s-tools' }
            // }
        ]
    },
    {
        name: 'ErrorPage',
        path: '/ErrorPage',
        meta: { title: '错误页面', icon: 'el-icon-eleme' },
        component: Components.Layout,
        redirect: '/ErrorPage/404',
        children: [
            {
                name: '401',
                path: '/ErrorPage/401',
                component: Components['401'],
                meta: { title: '401', icon: 'el-icon-s-tools' }
            },
            {
                name: '404',
                path: '/ErrorPage/404',
                component: Components['404'],
                meta: { title: '404', icon: 'el-icon-s-tools' }
            }
        ]
    },
    {
        name: 'RedirectPage',
        path: '/redirect',
        component: Components['Layout'],
        meta: { title: '重定向页面', icon: 'el-icon-eleme', hidden: true },
        children: [
            {
                name: 'Redirect',
                path: '/redirect/:pathMatch(.*)*',
                meta: {
                    title: '重定向页面',
                    icon: ''
                },
                component: Components.Redirect
            }
        ]
    },
    {
        name: 'Login',
        path: '/Login',
        component: Components.Login,
        meta: { title: '登录', icon: 'el-icon-eleme', hidden: true }
    }
]

const router = createRouter({
    history: createWebHashHistory(), // createWebHistory
    routes: allowRouter
})

export default router