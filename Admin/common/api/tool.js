
import { fetch } from 'common/util/fetch';

export function fetchHttpProxy (url) {
    return fetch({
        url: '/tool/proxy/get?url=' + url,
        method: 'get'
    });
}
// 获取前端数据模型
export function fetchModel (table) {
    return fetch({
        url: '/tool/model/info?table=' + table,
        method: 'get'
    });
}

// 搜索错误列表
export function fetchErrorList (params) {
    return fetch({
        url: '/tool/error/list',
        method: 'POST',
        data: params
    });
}

// 创建新的错误类型
export function postNewError (params) {
    return fetch({
        url: '/tool/error/create',
        method: 'POST',
        data: params
    });
}

// 获取错误信息
export function fetchErrorInfo (id) {
    return fetch({
        url: '/tool/error/info?id=' + id,
        method: 'GET'
    });
}

// 更新错误信息
export function updateErrorInfo (params) {
    return fetch({
        url: '/tool/error/update',
        method: 'POST',
        data: params
    });
}

// 删除错误信息
export function removeErrorInfo (id) {
    return fetch({
        url: '/tool/error/remove?id=' + id,
        method: 'GET'
    });
}
