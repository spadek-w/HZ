// 统一模型数据解析
export function modelParser (model) {
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
    for (let cKey of Object.keys(attrs)) {
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

// 模态窗口使用 初始化默认modal数据
export function initModal (model) {
    var must = model['must'];
    var attrs = model['attributes'];
    var modal = {};
    must.forEach(key => {
        modal[key] = attrs[key]['default'] || '';
        var type = attrs[key]['type'];
        if (type === 'INTEGER') {
            modal[key] = 0;
        }
    });
    return modal;
}

// 初始化表单校验
export function initValidate (model) {
    var must = model['must'];
    var attrs = model['attributes'];
    // 初始化表单校验
    var validates = {};
    must.forEach(key => {
        validates[key] = [];
        let titile = attrs[key]['title'];
        var type = attrs[key]['type'];
        if (type === 'INTEGER') {
            validates[key].push({ type: 'number', message: titile + '必须为整数' });
        } else {
            validates[key].push({ required: true, message: titile + '不能为空', trigger: 'blur' });
        }
    });

    return validates;
}
