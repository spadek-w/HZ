
import { fetch } from 'common/util/fetch';

export function fetchUserList (params) {
    return fetch({
        url: '/user/list',
        method: 'POST',
        data: params
    });
}
