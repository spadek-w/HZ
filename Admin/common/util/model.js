// 统一模型数据解析
export function modelParser(model) {
    var show = model['show'];
    var attrs = model['attributes'];
    // 扩充id属性
    if (show.indexOf('id') >= 0 && !attrs['id']) {
        attrs['id'] = {
            'key': 'id',
            'title': 'ID',
            'width': 100,
            'fixed': 'left'
        };
    }
    // 填充默认属性
    var allColumns = [];
    for (let cKey of show) {
        var attr = attrs[cKey];
        if (!attr) { continue; }
        attr['key'] = attr['key'] || cKey;
        attr['width'] = attr['width'] || 200;
        attr['align'] = attr['align'] || 'center';
        allColumns.push(attr);
    };
    model['columns'] = allColumns;
    return model;
}
