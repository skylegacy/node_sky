
var express = require('express');
var router = express.Router();
var userService = require('../lib/userService');
var userController = require('../lib/userController');
// var Role = require('../models/role');

var Role  = require('../sequelize').Role;
 


router.get('/auth',  function(req, res, next) {
    
    // express.basicAuth(userService.authenticate);

    let calldata = null;
    
     userService.reCrypPassWd(
         req.body.account,
         req.body.password,
        function(calldata){
            console.log('------- 最終結果 --------');
            var instances = JSON.parse(calldata);
            if(instances.length>0){
                req.session.loginUser = instances[0].username;
                console.log('查詢->處理->查詢');
                console.log(req.session.loginUser);
            }else{
                console.log('沒有'); 
            }
            // res.json(calldata);
        }
    );
        res.json(req.session.loginUser);
});

router.post('/role',function(req, res, next){

    var adddata = {
        "roleName":null
    };

    adddata.roleName = req.body.roleName;
 
    Role.create({"roleName":adddata.roleName})
    .then(function(role){
        res.json(role.get({
            plain: true
          }))
    });

});

router.post('/user',function(req, res, next){

    var username = req.body.username;
    var account = req.body.account;
    var password = req.body.password;
    
    userService.addUser(username,account,password,
        function(jsonData){
            console.log(jsonData);
            res.json(JSON.stringify(jsonData));
        }
    );
 
});

module.exports = router;