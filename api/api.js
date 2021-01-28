import req from '../http/http.js' //导入 封装的请求

let api = {};

//请求数据
// 登录
api.login = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/detect/login', //请求接口
        method: 'post',  //请求方法
        data: data      //传参
    })
};
//微信登录
api.wxlogin = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/detect/wxLogin', //请求接口
        method: 'post',  //请求方法
        data: data      //传参
    })
};
//注册
api.register = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/yl/user/register', //请求接口
        method: 'post',  //请求方法
        data: data      //传参
    })
};
//注册发送验证码
api.smsreg = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/yl/sms/reg', //请求接口
        method: 'get',  //请求方法
        data: data      //传参
    })
};
// 重新获取验证码
api.captchacreate = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/yl/captcha/create', //请求接口
        method: 'get',  //请求方法
        data: data      //传参
    })
};
//忘记密码
api.forgetPassword = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/yl/user/forgetPassword', //请求接口
        method: 'post',  //请求方法
        data: data      //传参
    })
};
//找回忘记密码发验证码
api.forget = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/yl/sms/forget', //请求接口
        method: 'post',  //请求方法
        data: data      //传参
    })
};
//轮播图
api.slidelist = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/yl/slide/list', //请求接口
        method: 'post',  //请求方法
        data: data      //传参
    })
};
//公告
api.annoslist = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/yl/annos/list', //请求接口
        method: 'post',  //请求方法
        data: data      //传参
    })
};
//查询采集检验点列表
api.orglist = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/yl/org/list', //请求接口
        method: 'post',  //请求方法
        data: data      //传参
    })
};
//账户预览
api.accountsummary = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/yl/account/summary', //请求接口
        method: 'get',  //请求方法
        data: data      //传参
    })
};
//退出登录
api.logout = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/yl/logout', //请求接口
        method: 'get',  //请求方法
        data: data      //传参
    })
};
//等待采集数据
api.waitcollect = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/yl/project/collect/list', //请求接口
        method: 'post',  //请求方法
        data: data      //传参
    })
};
//保存采集信息
api.collectsave = data => {  //getfeng 表示方法名,data表示参数
    return req({
        url: '/detect/userpatient/save', //请求接口
        method: 'post',  //请求方法
        data: data      //传参
    })
};
export default api  //导出
