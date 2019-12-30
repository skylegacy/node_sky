var express = require('express');
var router = express.Router();
var userController = require('../lib/userController');
var userService = require('../lib/userService');
var userModel =  require('../sequelize').User;
var roleModel = require('../sequelize').Role;

var request = require("request");
var cheerio = require("cheerio");

var fs = require("fs");

router.get('/', function(req, res, next) {

      // var data = userService.showDbStatus();
        // var str = userController.showDbStatus();
      this.resback = null;
      var that = this;

      var getAsyncfunc = async (users) => 
      {
               var users = userModel.findAll({
                    include:[{
                      model:roleModel,
                      as: 'Role'
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

      next();
  });

  
  router.get('/nightstalker',function(req, res,next){

    request({
      url: "http://h5.ppj.io/L9f2VWSw/index.html?v=20",
      method: "GET"
    }, function(error, response, body) { 

            if (error || !body) {
              console.log('body沒有值....')
              return;
            }

         
          var  $ = cheerio.load(body);
             
          //build queryh object
          var dataElement = $("#loading-entry");
           //get attr of object 
          var resdata = $(dataElement).text();
            
         // console.log(dataElement);
          console.log('--------------爬蟲結果----------------');
          console.log(resdata);
          console.log('---------------end----------------');
    });

    res.end('爬蟲執行完成');

    next();

  });

module.exports = router;