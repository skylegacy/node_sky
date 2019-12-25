var express = require('express');
var router = express.Router();
var userController = require('../lib/userController');
var userService = require('../lib/userService');
var userModel =  require('../sequelize').User;
var roleModel = require('../sequelize').Role;


router.get('/', function(req, res, next) {

      // userModel.hasOne(roleModel, { as: 'Role', foreignKey: 'role' })

      //   userModel.belongsTo(roleModel,{
      //     foreignKey:'role'
      // })
      
      // var data = userService.showDbStatus();
        // var str = userController.showDbStatus();
      this.resback = null;
      var that = this;

      var getAsyncfunc = async (users) => 
      {
               var users = userModel.findAll({
                    include:[{
                      model:roleModel,
                      as: 'Role',
                      // through:{ attributes:['username','account','roleName']  }
                    }]
               })
               return users;
      }
 
      // res.header("Content-Type",'application/json');
      // res.send(JSON.stringify(instance, null, 4));

      ( async () => {

        that.resback = await getAsyncfunc();
        res.header("Content-Type",'text/html');
        res.end(JSON.stringify(this.resback));
           
      })();
       
      // always null;
      console.log(that.resback);

  });

module.exports = router;