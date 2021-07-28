import request from '@/utils/request'
const api = {
    login: '/api/User/login',
    getUser: '/api/User/getUser',
    getRouterList: '/api/User/getRoute',
    publickey: '/api/User/Publickey'
}


export function login(param) {
    return request({
        url: api.login,
        method: 'post',
        data: param
    })
}

export function publickey() {
    return request({
        url: api.publickey,
        method: 'get'
    })
}

export function getUser() {
    return request({
        url: api.getUser,
        method: 'get'
    })
}
export function getRouterList() {
    return request({
        url: api.getRouterList,
        method: 'get'
    })
}