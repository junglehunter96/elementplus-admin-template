import { user, user_role, role_route, route } from './data/user'

export const login = function(name, pwd) {
    return user.findIndex(v => v.name === name && v.pwd === pwd) !== -1
}

export const getUser = function(name) {
    return {
        name,
        role: user_role.filter(v => v.userName === name).map(v => v.roleName)
    }
}

export const getRoute = function(name) {
    const { role } = getUser(name)
    const arr = role_route.filter(v => role.findIndex(val => val === v.roleName) !== -1)
    const filterRoute = []
    route.forEach(v => {
        arr.forEach(val => {
            if(val.id === v.id) {
                const obj = Object.assign({},v)
                obj.meta.permission = val.permission
                filterRoute.push(obj)
            }
        })
    })
    return filterRoute
}