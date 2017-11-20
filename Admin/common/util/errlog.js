import Vue from 'vue';

const errLog = {
    state: {
        errLog: []
    },
    pushLog (log) {
        this.state.errLog.unshift(log);
    },
    clearLog () {
        this.state.errLog = [];
    }
};

// 生产环境错误日志
// if (process.env.NODE_ENV === 'production') {
// Vue.config.errorHandler = function (err, vm) {
//     console.log(err, window.location.href);
//     errLog.pushLog({
//         err,
//         url: window.location.href,
//         vm
//     });
// };
// }
export default errLog;
