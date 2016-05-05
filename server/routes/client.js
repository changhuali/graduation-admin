var express = require('express');
var router = express.Router();


router.get('*', function(req, res, next){
    res.statusCode = "200";
    res.render('index.html');
})

module.exports = router;
