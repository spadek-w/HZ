import Main from './view/Main.vue';

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['./view/home/home.vue'], resolve); } },
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['./view/common/message.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/user',
        icon: 'person',
        title: '用户管理',
        name: 'user',
        access: 0, // 访问权限
        component: Main,
        children: [
            { path: 'index', title: '用户概览', icon: 'shuffle', name: 'user_index', component: resolve => { require(['./view/user/index.vue'], resolve); } },
            { path: 'list', title: '用户列表', icon: 'ios-list', name: 'user_list', component: resolve => { require(['./view/user/list.vue'], resolve); } },
            { path: 'show', title: '用户详情', icon: 'ios-browsers', name: 'user_show', component: resolve => { require(['./view/user/show.vue'], resolve); } },
            { path: 'edit', title: '编辑用户', icon: 'ios-browsers', name: 'user_edit', component: resolve => { require(['./view/user/edit.vue'], resolve); } }
        ]
    },
    {
        path: '/live',
        icon: 'person',
        title: '直播管理',
        name: 'live',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '直播概览', icon: 'shuffle', name: 'live_index', component: resolve => { require(['./view/user/index.vue'], resolve); } },
            { path: 'list', title: '直播列表', icon: 'ios-list', name: 'live_list', component: resolve => { require(['./view/user/list.vue'], resolve); } },
            { path: 'show', title: '直播详情', icon: 'ios-browsers', name: 'live_show', component: resolve => { require(['./view/user/show.vue'], resolve); } }
        ]
    },
    {
        path: '/video',
        icon: 'person',
        title: '视频管理',
        name: 'video',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '视频概览', icon: 'shuffle', name: 'video_index', component: resolve => { require(['./view/user/index.vue'], resolve); } },
            { path: 'list', title: '视频列表', icon: 'ios-list', name: 'video_list', component: resolve => { require(['./view/user/list.vue'], resolve); } },
            { path: 'show', title: '视频详情', icon: 'ios-browsers', name: 'video_show', component: resolve => { require(['./view/user/show.vue'], resolve); } }
        ]
    },
    {
        path: '/config',
        icon: 'person',
        title: '配置管理',
        name: 'config',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '概览', icon: 'shuffle', name: 'config_index', component: resolve => { require(['./view/user/index.vue'], resolve); } },
            { path: 'list', title: '列表', icon: 'ios-list', name: 'config_list', component: resolve => { require(['./view/user/list.vue'], resolve); } },
            { path: 'show', title: '详情', icon: 'ios-browsers', name: 'config_show', component: resolve => { require(['./view/user/show.vue'], resolve); } }
        ]
    },
    {
        path: '/active',
        icon: 'person',
        title: '活动管理',
        name: 'active',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '概览', icon: 'shuffle', name: 'active_index', component: resolve => { require(['./view/user/index.vue'], resolve); } },
            { path: 'list', title: '列表', icon: 'ios-list', name: 'active_list', component: resolve => { require(['./view/user/list.vue'], resolve); } },
            { path: 'show', title: '详情', icon: 'ios-browsers', name: 'active_show', component: resolve => { require(['./view/user/show.vue'], resolve); } }
        ]
    },
    {
        path: '/tool',
        icon: 'person',
        title: '系统工具',
        name: 'tool',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '系统状态', icon: 'shuffle', name: 'tool_index', component: resolve => { require(['./view/user/index.vue'], resolve); } },
            { path: 'error', title: '错误类型', icon: 'bug', name: 'tool_error', component: resolve => { require(['./view/tool/error.vue'], resolve); } },
            { path: 'show', title: '详情', icon: 'ios-browsers', name: 'tool_show', component: resolve => { require(['./view/user/show.vue'], resolve); } }
        ]
    }
];

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['./view/common/login.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['./view/common/locking.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['./view/common/404.vue'], resolve); }
};

export const page401 = {
    path: '/401',
    meta: {
        title: '401-权限不足'
    },
    name: 'error_401',
    component: resolve => { require(['./view/common/401.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: resolve => { require(['./view/common/500.vue'], resolve); }
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page401,
    page404
];
