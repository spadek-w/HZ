
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

export function fetchErrorList (params) {
    return fetch({
        url: '/tool/error/list',
        method: 'POST',
        data: params
    });
}
