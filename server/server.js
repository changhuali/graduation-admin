var express = require('express');
var app     = express();
var path    = require('path');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

var clientRoute = require('./routes/client');
var apiRoute    = require('./routes/api');

//模板引擎设置为html
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '../src/app/images')));
app.use(express.static(path.join(__dirname, '../src/config')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//动态刷新cookie时间
app.use(function(req, res, next) {
    if(req.cookies.info) {
        res.cookie('info', req.cookies.info, {maxAge: 30*60*1000});
    }
    if(req.url != '/login' && req.url != '/api/client/login' && !req.cookies.info){
        return res.redirect('/login');
    }
    next();
})
//判断cookie是否失效
app.all('/api/user/*', function(req, res, next) {
    if(req.cookies.info) {
        next();
    }else{
        res.statusCode = 401;
        res.send({
            errorCode: 401006,
            message: '登录超时',
        })
    }
})
//处理api路由
app.use('/api', apiRoute);
//处理静态路由
app.use('*', clientRoute);


//服务器错误处理器
app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(500).send("server error");
})

//404页面处理
app.use(function(req, res, next){
    res.status(404).send("sorry, can not find that");
})

//监听端口
var server = app.listen(8001, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("graduation.test listening at http://%s:%s", host, port);
});
