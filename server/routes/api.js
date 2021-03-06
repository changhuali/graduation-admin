var express  = require('express');
var alidayu  = require('../alidayu/test');
var router   = express.Router();
var path     = require('path');
var fs       = require('fs');
var formidable = require('formidable');
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
//获取用户列表
router.get('/client/userList', function(req, res){
    Model.getUserList(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({data: data});
        } else {
            res.statusCode = 500;
            res.sed({
                errorCode: status,
                message: '服务器内部错误',
            })
        }
    })
})
//保存用户信息到cookie
router.get('/client/info', function(req, res){
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
router.post('/family/addCase', function(req, res) {
    Model.addCase(req, function(status, data) {
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
router.put('/family/editCaseItem', function(req, res) {
    Model.editCaseItem(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                message: '删除信息成功',
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
router.delete('/family/delCaseItem', function(req, res) {
    Model.delCaseItem(req, function(status, data) {
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
//获取申请列表
router.get('/apply/getApplyList', function(req, res) {
    Model.getApplyList(req, function(status, data) {
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
//处理申请
router.put('/apply/action', function(req, res) {
    Model.applyAction(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                message: '该申请已改为'+data+'状态',
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

//获取资讯列表
router.get('/news/getNewsList', function(req, res) {
    Model.getNewsList(req, function(status, data) {
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
//获取联系信息列表
router.get('/contact/getContactList', function(req, res) {
    Model.getContactList(req, function(status, data) {
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
//获取资讯
router.get('/news/getNewsDetail', function(req, res) {
    Model.getNewsDetail(req, function(status, data) {
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

//处理联系
router.put('/contact/action', function(req, res) {
    Model.contactAction(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                message: '该联系信息已改为'+data+'状态',
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

router.put('/news/updateNews', function(req, res) {
    Model.updateNews(req, function(status, data) {
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
router.post('/news/addNews', function(req, res) {
    Model.addNews(req, function(status, data) {
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

router.delete('/news/delNews', function(req, res) {
    Model.delNews(req, function(status, data){
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

router.post('/render/addRender', function(req, res){
    Model.addRender(req, function(status, data) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                data: data,
            })
        } else {
            res.statusCode = 500;
            res.send({
                message: '服务器内部错误',
            })
        }
    })
})

function renameImg(req, dirname, files, callback) {
    var obj = {};
    for(var key in files) {
        var name = key;
        const type = files[key].name.split('.')[1];
        var newPath = dirname + name + '.' +type;
        fs.rename(files[key].path, newPath);
        console.log(files[key].path, newPath);
        obj[key] = '/' + req.query.dirStr + '/' + req.query.id + '/' + key + '.' + type;
    }
    console.log(obj, 'aaaaaaaaaaaaaaa');
    Model.saveImg(req.query, obj, callback);
}

function storeImg(req, callback) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../../upload');
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.multiple = true;
    const ROOT_DIR = path.join(__dirname, '../../../graduation-project/src/app/images/');
    var dirStr = req.query.dirStr;
    var id = req.query.id;
    var dirname = ROOT_DIR;
    if(dirStr) {
        dirname = dirname + dirStr + '/';
    }
    if(id) {
        dirname = dirname + id + '/';
    }
    form.parse(req, function(err, fields, files) {
        console.log(files);
        if(err) {
            callback(500);
        } else {
            fs.exists(dirname, function(exists) {
                if(exists) {
                    renameImg(req, dirname, files, callback);
                } else {
                    fs.mkdir(dirname, function(error){
                        renameImg(req, dirname, files, callback);
                    })
                }
            });
        }
    })
}

router.post('/upload/img', function(req, res) {
    storeImg(req, function(status, data) {
        console.log(status, data, '---===');
        if(status == 200) {
            res.statusCode = 200;
            res.send({data: data});
        }else{
            res.statusCode = 500;
            res.send({
                errorCode: 500,
                message: '服务器内部错误',
            })
        }
    });
})

router.get('/render/renderDetail', function(req, res) {
    Model.getRenderDetail(req, function(status, data) {
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
router.delete('/render/delRender', function(req, res) {
    Model.delRender(req, function(status) {
        if(status == 200) {
            res.statusCode = 200;
            res.send({
                message: '删除成功',
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
router.put('/render/editRender', function(req, res) {
    Model.editRender(req, function(status, data) {
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
router.delete('/delImg', function(req, res) {
    var dir = path.join(__dirname, '../../../graduation-project/src/app/images/');
    dir = dir + req.body.img;
    console.log(dir);
    fs.unlink(dir, function(err, data){
        if(err) {
            console.log(err);
        } else {
            res.statusCode = 200;
            res.send({
                message: '删除成功',
            })
        }
    });
})
router.put('/family/changeCase', function(req, res) {
    Model.changeCase(req, function(status, data) {
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
router.get('/family/caseDetail', function(req, res) {
    Model.getCaseDetail(req, function(status, data) {
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
router.delete('/family/delCase', function(req, res) {
    Model.delCase(req, function(status, data) {
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

module.exports = router;
