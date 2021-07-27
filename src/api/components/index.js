import request from '/@/utils/request'
const api = {
    getTableList: '/api/getTableList'
}

export function getTableList(tableList) {
    return request({
        url: api.getTableList,
        method: 'get',
        params: tableList
    })
}