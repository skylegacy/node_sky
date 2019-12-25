var express = require('express');
var router = express.Router();
var userController = require('../lib/userController');
var userService = require('../lib/userService');
var userModel =  require('../sequelize').User;
var roleModel = require('../sequelize').Role;


router.get('/', function(req, res, next) {
    // res.send('express automatically reloads after modifying the file');

    // var str = userController.showDbStatus();
 

    // userModel.hasOne(roleModel, { as: 'Role', foreignKey: 'role' })
    userModel.belongsTo(roleModel,{
       foreignKey:'role'
   })

  
   userModel.findAll({
        include:[{
          model:roleModel,
          as: 'Role',
          // through:{
          //   attributes:['username','account','roleName'] 
          // }
        }]
      }).then(function(instance){
        
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(instance, null, 4));
      
      }).catch(function(err){
          console.log(err);
      })
         
      

    var data = userService.showDbStatus();
    
   
    
  });

module.exports = router;