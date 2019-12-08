
var express = require('express');
var router = express.Router();
var userService = require('../lib/userService');
var userController = require('../lib/userController');
// var Role = require('../models/role');

var Role  = require('../sequelize').Role;
 


router.get('/auth', function(req, res, next) {
    
    // express.basicAuth(userService.authenticate);

    res.end('try auth...');
});

router.post('/role',function(req, res, next){

    var adddata = {
        "roleName":null
    };

    adddata.roleName = req.body.roleName;
 
    // Role.create({"roleName":adddata.roleName})
    // .then(function(role){
    //     res.json(role.get({
    //         plain: true
    //       }))
    // });

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