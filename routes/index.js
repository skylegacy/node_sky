var express = require('express');
var router = express.Router();
var uploader = require('../lib/uploadController');
var  http = require('http');
var userService = require('../lib/userService');

/* GET home page. */
router.get('/', function(req, res, next) {
  // req.session.username = "skyTest";
  res.render('index', { title: 'Express' });
});

router.get('/upload',function(req, res, next){
  var output = uploader.showUpload();
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end(output);
})
 
router.post('/authuser',function(req, res, next){

        userService.reCrypPassWd(
              req.body.account,
              req.body.password,
              function(calldata){

                      console.log('------- 驗證結果 --------');
                      var instances = JSON.parse(calldata);

                      if(instances["error"] !== undefined ){

                              console.log('沒有通過'); 
                              res.locals.username = 'unfind user';
                      }
                      else  if(instances["data"] !== undefined){

                                var objResult   =JSON.parse( instances.data);
                                req.session.loginUser =  objResult[0].account;
                                console.log('認證通過,核發簽證');
                                res.locals.username = req.session.loginUser;
                      }
                    
                res.set('Content-Type', 'text/html')
                res.send('<p>身份結果:'+res.locals.username+'</p>')
            }
            
        );
       
})

module.exports = router;
