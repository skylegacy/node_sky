
var express = require('express');
var router = express.Router();
var userService = require('../lib/userService');
var userController = require('../lib/userController');
// var Role = require('../models/role');

var Role  = require('../sequelize').Role;
 
//  get: http://127.0.0.1:3000/api/auth

router.get('/auth',  function(req, res, next) {
    
    // express.basicAuth(userService.authenticate);

    let calldata = null;
    
     userService.reCrypPassWd(
         req.body.account,
         req.body.password,
        function(calldata){
          
             var instances = JSON.parse(calldata);

             var resMessage = { status:true,loginUser:''}

             if(instances.data.length>0){
                 req.session.loginUser = instances.data[0].account;
                 resMessage.loginUser =  instances.data[0].account;
             }else{
                resMessage.error = 'none user';
             }
           
              res.json(resMessage);
        }
    );
       
});

router.post('/role',function(req, res, next){

    var adddata = {
        "roleName":null,
        "valueNum":null
    };

    adddata.roleName = req.body.roleName;
    adddata.valueNum =   req.body.valueNum;
    Role.create({
        "roleName":adddata.roleName,
        "valueNum":adddata.valueNum
    })
    .then(function(role){
        res.json(role.get({
            plain: true
          }))
    });

});

//  post: http://127.0.0.1:3000/api/user

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