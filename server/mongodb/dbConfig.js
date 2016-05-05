var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/graduation_project');
//连接数据库
var db = mongoose.connection;
db.on('error', function(error){
    console.log(error);
});
db.once('open', function(){
    console.log("graduation_project connect success");
});

//用户collection Schema
var userSchema = new mongoose.Schema({
    userName: String,
    phone: String,
    userPwd : String
});

//验证码collection Schema
var checkCodeSchema = new mongoose.Schema({
    phone: String,
    checkCode : String
});

//联系我们collection Schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    advice: String,
});

//优惠活动collection Schema
var promotionSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
    location: String,
    time: String,
    img: String,
})

//家装案例collection Schema
var familyCaseSchama = new mongoose.Schema({
    id: String,
    title:  String,
    description: String,
    img_1: String,
    img_2: String,
    img_3: String,
    img_4: String,
    img_5: String,
    data: Array,
})

//新闻资讯collection Schema
var imformationSchema = new mongoose.Schema({
    id: String,
    title: String,
    type: String,
    viewNum: Number,
    time: String,
    content: String,
    img: String,
})

//装修效果图collection Schema
var onlineDemoSchema = new mongoose.Schema({
    id: String,
    title: String,
    img: String,
})

//申请collection Schema
var applySchema = new mongoose.Schema({
    id: String,
    applyItem: String,
    applyName: String,
    applyPhone: String,
})

//生成的Model对象
var Model = {
    userModel: db.model('user', userSchema, "user"),
    checkCodeModel: db.model('checkCode', checkCodeSchema, "checkCode"),
    contactModel: db.model('contact', contactSchema, "contact"),
    promotionModel: db.model('promotion', promotionSchema, "promotion"),
    familyCaseModel: db.model('familyCase', familyCaseSchama, "familyCase"),
    imformationModel: db.model('imformation', imformationSchema, "imformation"),
    onlineDemoModel: db.model('onlineDemo', onlineDemoSchema, 'onlineDemo'),
    applyModel: db.model('apply', applySchema, 'apply'),
}

//用户登录
Model.login = function(req, callback) {
    Model.userModel.findOne({phone: req.body.phone},function(err, data){
        console.log(data, "==========登录查询到的数据");
        if(err){
            console.log(err);
        }else{
            if(data == null){
                callback(401001);
            }else if(req.body.userPwd == data.userPwd){
                callback(200, {id: data._id , userName: data.userName, phone: data.phone});
            }else{
                callback(401002);
            }
        }
    })
}
//用户注册
Model.regist = function(req, callback) {
    if(req.cookies.checkCode) {
        var userName = req.body.userName;
        var phoneNum = req.body.phone;
        var checkCode= req.body.checkCode;
        Model.checkCodeModel.findOne({phone: phoneNum}, function(err, data){
            console.log(data, "==========查询数据库是否存有phone验证码");
            if(err){
                console.log(err);
            }else if(data == null){
                callback(401003);
            }else if(checkCode == data.checkCode) {
                //验证手机是否已经注册
                Model.userModel.find({phone: phoneNum}, function(err, data){
                    console.log(data, "==========查询手机号码是否已经注册");
                    if(err){
                        console.log(err);
                    }else if(data instanceof Array && data.length > 0){
                        callback(401004);
                    }else{
                        //保存用户信息到数据库
                        Model.userModel.create({userName: userName, phone: phoneNum, userPwd: req.body.userPwd}, function(err, data){
                            console.log(data, "==========注册存库");
                            if(err){
                                console.log(err);
                            }else{
                                callback(200, {id: data._id, phone: data.phone});
                            }
                        });
                    }
                });
            }else{
                callback(401003);
            }
        });
    }else{
        callback(401003);
    }
}
//保存验证码到数据库
Model.saveCheckCode = function(phone, checkCode, callback) {
    Model.checkCodeModel.findOne({phone: phone}, function(err, data){
        if(err) {
            console.log(err);
        }else{
            Model.checkCodeModel.remove({phone: phone}, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    console.log(data, '==========验证码存库数据');
                    Model.checkCodeModel.create({phone: phone, checkCode: checkCode}, function(err, data){
                        if(err){
                            console.log(err);
                        }else{
                            callback(200);
                        }
                    })
                }
            })
        }
    });
}
//验证原密码是否正确
Model.checkBePwd = function(req, callback) {
    var pwd = req.body.userPwd;
    var id  = req.cookies.info.id;
    Model.userModel.findOne({_id: id}, function(err, data) {
        if(err) {
            console.log(err);
        }else{
            console.log(data, '==========验证用户原密码数据');
            if(data == null || (data instanceof Array && data.length == 0)) {
                callback(404001);
            }else if(data.userPwd == pwd){
                callback(200);
            }else{
                callback(404001);
            }
        }
    });
}
//修改用户密码
Model.changePwd = function(req, callback) {
    var userPwd = req.body.befPwd;
    var newPwd  = req.body.newPwd;
    var id = req.cookies.info.id;
    Model.userModel.findOne({_id: id}, function(err, data) {
        if(err) {
            console.log(err);
        }else {
            if(userPwd == data.userPwd) {
                Model.userModel.findByIdAndUpdate(id, {$set: {userPwd: newPwd}}, function(err, data) {
                    if(err) {
                        console.log(err);
                    }else{
                        callback(200);
                    }
                })
            }else{
                callback(404002);
            }
        }
    });
}
//修改用户名
Model.changeName = function(req, callback) {
    var id = req.cookies.info.id;
    var userName = req.body.userName;
    Model.userModel.update({_id: id}, {$set: {userName: userName}}, function(err) {
        if(err) {
            console.log(err);
        }else{
            callback(200);
        }
    })
}

//修改用户手机号码
Model.changePhone = function(req, callback) {
    var befPhone = req.body.befPhone;
    var newPhone = req.body.newPhone;
    var checkCode= req.body.checkCode;
    var id = req.cookies.info.id;
    if(req.cookies.checkCode) {
        console.log(befPhone);
        Model.checkCodeModel.findOne({phone: befPhone}, function(err, data) {
            console.log(data, '==========数据库查询验证码');
            if(err){
                console.log(err);
            }else{
                if(data == null){
                    callback(401004);
                }else if(data.checkCode == checkCode){
                    Model.userModel.update({_id: id}, {$set: {phone: newPhone}}, function(err){
                        if(err){
                            console.log(err);
                        }else{
                            callback(200);
                        }
                    })
                }else{
                    callback(401003);
                }
            }
        })
    }else{
        callback(401003);
    }
}
//找回密码
Model.findPwd = function(req, callback) {
    var phone = req.body.phone;
    var checkCode = req.body.checkCode;
    var newPwd = req.body.newPwd;
    Model.userModel.findOne({phone: phone}, function(err, data) {
        console.log(data, '==========查询手机号码是否正确');
        if(err){
            console.log(err);
        }else{
            if(data == null) {
                callback(404004);
            }else{
                var id = data._id;
                Model.checkCodeModel.findOne({phone: phone}, function(err, data){
                    console.log(data, '==========查询数据库验证码');
                    if(err) {
                        console.log(err);
                    }else{
                        if(data == null){
                            callback(401003);
                        }else if(data.checkCode == checkCode) {
                            Model.userModel.update({_id: id}, {$set:{userPwd: newPwd}}, function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    callback(200, id)
                                }
                            })
                        }else{
                            callback(401003);
                        }
                    }
                })
            }
        }
    })
}

//联系我们
Model.contactUs = function(req, callback) {
    var obj = {
        name   : req.body.name,
        phone  : req.body.phone,
        advice : req.body.advice,
    };
    Model.contactModel.create(obj, function(err, data) {
        if(err) {
            console.log(err);
        }else{
            console.log(data, '==========存储联系我们数据data');
            callback(200);
        }
    })
}

//优惠活动
Model.getPromotionList = function(req, callback) {
    Model.promotionModel.find({}, function(err, data) {
        console.log(data, '==========优惠活动list data');
        if(err) {
            console.log(err);
        }else{
            callback(200, data);
        }
    })
}

//家装案列
Model.getFamilyCaseList = function(req, callback) {
    var regExp = new RegExp(req.query.keyword);
    Model.familyCaseModel.find().or([{title: regExp}, {description: regExp}, {data: regExp}]).exec(function(err, data) {
        console.log(data, '==========家装案列list data');
        if(err) {
            console.log(err);
        }else{
            callback(200, data);
        }
    })
}

//新闻资讯
Model.getImformationList = function(req, callback) {
    var regExp = new RegExp(req.query.keyword);
    Model.imformationModel.find({}, function(err, data) {
        console.log(data, '==========资讯中心list data');
        if(err) {
            console.log(err);
        }else{
            var industryHot = [];
            var companyHot  = [];
            var otherHot    = [];
            data.map(function(obj) {
                if(obj.type == '行业新闻') {
                    industryHot.push(obj);
                }else if(obj.type == '公司新闻') {
                    companyHot.push(obj);
                }
            })
            Model.imformationModel.find().or([{title: regExp}, {time: regExp}, {desc: regExp}, {type: regExp}]).exec(function(err, newData) {
                console.log(data, '==========资讯中心模糊匹配list data');
                if(err) {
                    console.log(err);
                }else{
                    newData.map(function(obj) {
                        if(obj.type == '其他') {
                            otherHot.push(obj);
                        }
                    });
                    var obj = {
                        industryHot: industryHot,
                        companyHot: companyHot,
                        otherHot: otherHot
                    }
                    callback(200, obj);
                }
            })
        }
    })
}

//新闻浏览数添加
Model.addImformationNum = function(req, callback) {
    Model.imformationModel.findOne({_id: req.body._id}, function(err, data) {
        console.log(data, '==========资讯中心 num data');
        if(err) {
            console.log(err);
        }else{
            var newNum = data.viewNum+1;
            Model.imformationModel.update({_id: req.body._id}, {$set:{viewNum: newNum}}, function(err, data) {
                if(err) {
                    console.log(err);
                    callback(500);
                }else{
                    callback(200);
                }
            })
        }
    })
}

//装修效果图
Model.getOnlineDemoList = function(req, callback) {
    var regExp = new RegExp(req.query.keyword);
    Model.onlineDemoModel.find().or([{title: regExp}, {space: regExp}, {part: regExp}, {style: regExp}]).exec(function(err, data) {
        console.log(data, '==========装修效果图list data');
        if(err) {
            console.log(500);
        }else{
            callback(200, data);
        }
    })
}

//申请
Model.apply = function(req, callback) {
    Model.applyModel.create(req.body, function(err, data) {
        console.log(data, '==========申请 data');
        if(err) {
            console.log(err);
        }else{
            callback(200);
        }
    })
}

module.exports = { Model };
