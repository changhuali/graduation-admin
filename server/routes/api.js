var express  = require('express');
var alidayu  = require('../alidayu/test');
var router   = express.Router();
var dbConfig = require('../mongodb/dbConfig');
var Model    = dbConfig.Model;
var userModel = Model.userModel;
var checkCodeModel = Model.checkCodeModel;
//查询用户名并核对用户密码

//用户登录
router.post('/client/login', function(req, res){
    Model.login(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.cookie('info', data, {path: '/', maxAge: 30*60*1000});
            res.send(data);
        }else if(status == 401001) {
            res.statusCode = 401;
            res.send({
                errorCode: status,
                message: '账号不存在',
            });
        }else if(status == 401002) {
            res.statusCode = 401;
            res.send({
                errorCode: status,
                message: '密码错误',
            });
        }
    });
})
//保存用户信息到cookie
router.get('/client/info', function(req, res){
    console.log(req.cookies, "==========获取到的客户端cookie");
    if(req.cookies.info) {
        res.statusCode = 200;
        res.send(req.cookies.info);
    }else{
        res.statusCode = 401;
        res.send({
            errorCode: 401005,
            message: '请登录'
        });
    }
})
//用户退出
router.delete('/client/logout', function(req, res){
    res.clearCookie('info');
    res.statusCode = '200';
    res.send({
        id: req.cookies.info.id,
    });
})

//用户注册返回结果
router.post('/client/regist', function(req, res){
    Model.regist(req, function(status, data){
        if(status == 200) {
            res.statusCode = 200;
            res.send(data);
        }else if(status == 401003) {
            res.statusCode = 401,
            res.send({
                errorCode: 401003,
                message: '验证码错误',
            });
        }else if(status == 401004){
            res.statusCode = 401;
            res.send({
                errorCode: 401004,
                message: '该手机号码已被注册',
            });
        }
    });
})

//生成验证码
function createCheckCode(len) {
    var str = '';
    for(var i = 1; i <= len; i++) {
        str = str + Math.floor(10*Math.random());
    }
    console.log(len, str, "==========生成验证码");
    return str;
}

//发送并保存验证码
function getCheckCode(phoneNum, checkCode, type, callback) {
    var config = {
        regist: {
            sms_free_sign_name: '大鱼测试',
            sms_template_code: 'SMS_7760522',
        },
        changePhone: {
            sms_free_sign_name: '大鱼测试',
            sms_template_code: 'SMS_7760522',
        },
        findPwd: {
            sms_free_sign_name: '大鱼测试',
            sms_template_code: 'SMS_7760522',
        }
    };
    alidayu.execute('alibaba.aliqin.fc.sms.num.send', {
        'extend':'123456',
        'sms_type':'normal',
        'sms_free_sign_name': config[type]['sms_free_sign_name'],
        'sms_param': {"code": checkCode,"product": "国风装修"},
        'rec_num': phoneNum,
        'sms_template_code': config[type]['sms_template_code']
    }, function(error, response) {
        if (!error) {
            console.log(response, "==========获取阿里验证码");
            Model.saveCheckCode(phoneNum, checkCode, callback);
        }else {
            callback(500);
            console.log(error, '==========获取阿里验证码失败');
        };
    })
}

function checkCodeRoute(req, res) {
    var phoneNum = req.body.phone;
    var checkCode = createCheckCode(4);
    var type = req.body.type;
    console.log(type, '=====type');
    console.log(req.body, '===req');
    getCheckCode(phoneNum, checkCode, type, function(status) {
        if(status == 200){
            res.statusCode = 200;
            res.cookie('checkCode', phoneNum, {maxAge: 24*60*60*1000});
            res.end();
        }else if(status == 500){
            res.statusCode = 500;
            res.send({
                errorCode: 500,
                message: '服务器内部错误',
            });
        }
    });
}

//获取验证码
router.post('/client/checkCode', function(req, res){
    checkCodeRoute(req, res);
})
router.post('/user/checkCode', function(req, res){
    checkCodeRoute(req, res);
})
//验证个人设置用户原密码是否正确
router.post('/user/checkPwd', function(req, res){
    Model.checkBePwd(req, function(status) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                id: req.cookies.info.id,
            });
        }else if(status == 404001){
            res.statusCode = 404;
            res.send({
                errorCode: 404001,
                message: '登录超时',
            })
        }
    });
})

//修改密码
router.post('/user/changePwd', function(req, res) {
    Model.changePwd(req, function(status) {
        if(status == 200) {
            res.statusCode = 200;
            res.clearCookie('info');
            res.send({
                id: req.cookies.info.id,
            })
        }else if(status == 404002) {
            res.statusCode = 404002;
            res.send({
                errorCode: 404,
                message: '原密码错误',
            })
        }
    });
})

//修改用户名
router.post('/user/changeName', function(req, res) {
    var userName = req.body.userName;
    Model.changeName(req, function(status) {
        if(status == 200) {
            res.statusCode = 200;
            res.cookie('info', {id: req.cookies.info.id, userName: userName});
            res.send({
                id: req.cookies.info.id,
                userName: userName
            })
        }else{
            res.statusCode = 500;
            res.send({
                errorCode: 500,
                message: '服务器内部错误',
            })
            console.log('==========更改用户名失败->服务器错误');
        }
    });
})

//修改手机号码
router.post('/user/changePhone', function(req, res) {
    Model.changePhone(req, function(status){
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                id: req.cookies.info.id,
            })
        }else if(status == 401003){
            res.statusCode = 401;
            res.send({
                errorCode: 401003,
                message: '验证码错误',
            })
        }else if(status == 401004){
            res.statusCode = 401;
            res.send({
                errorCode: 401004,
                message: '用户不存在',
            })
        }
    })
})

//找回密码
router.post('/client/resetPwd', function(req, res) {
    Model.findPwd(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                id: data,
            })
        }else if(status == 404004) {
            res.statusCode = 404;
            res.send({
                errorCode: 404004,
                message: '该手机号码暂未注册',
            })
        }else if(status == 401003){
            res.statusCode = 401;
            res.send({
                errorCode: 401003,
                message: '验证码错误',
            })
        }
    })
})

//联系我们
router.post('/contact/contactUs', function(req, res) {
    Model.contactUs(req, function(status) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                ok: 'ok',
                message: '信息提交成功',
            })
        }else{
            res.statusCode = 500;
            res.send({
                errorCode: 500,
                message: '服务器内部错误',
            })
        }
    })
})

//优惠活动
router.get('/promotion/promotionList', function(req, res) {
    Model.getPromotionList(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                data: data,
            })
        }else{
            res.statusCode = 500;
            res.send({
                errorCode: 500,
                message: '服务器内部错误',
            })
        }
    })
})

//家装案例
router.get('/family/caseList', function(req, res) {
    Model.getFamilyCaseList(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                data: data,
            })
        }else{
            res.statusCode = 500;
            res.send({
                errorCode: 500,
                message: '服务器内部错误',
            })
        }
    })
})

//新闻资讯
router.get('/imformation/newsList', function(req, res) {
    Model.getImformationList(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                data: data,
            })
        }else{
            res.statusCode = 500;
            res.send({
                errorCode: 500,
                message: '服务器内部错误',
            })
        }
    })
})

router.put('/imformation/viewNum', function(req, res) {
    Model.addImformationNum(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                data: data,
            })
        }else{
            res.statusCode = 500;
            res.send({
                errorCode: 500,
                message: '服务器内部错误',
            })
        }
    })
})

//效果图
router.get('/onlineDemo/getOnlineDemoList', function(req, res) {
    Model.getOnlineDemoList(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                data: data,
            })
        }else{
            res.statusCode = 500;
            res.send({
                errorCode: 500,
                message: '服务器内部错误',
            })
        }
    })
})

//申请
router.post('/contact/apply', function(req, res) {
    Model.apply(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                message: '申请成功,请等待我们的客服与您联系',
            })
        }else{
            res.statusCode = 500;
            res.send({
                errorCode: 500,
                message: '服务器内部错误',
            })
        }
    })
})

module.exports = router;
