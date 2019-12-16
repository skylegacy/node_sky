var express = require('express');
var router = express.Router();
var uploader = require('../lib/uploadController');
var  http = require('http');
var userService = require('../lib/userService');

/* GET home page. */
router.get('/', function(req, res, next) {
  // req.session.username = "skyTest";
  res.render('index', { title: 'Express' });
  next();
});

router.get('/upload',function(req, res, next){
  var output = uploader.showUpload();
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end(output);
  next();
})
 // login Form route
router.post('/authuser',function(req, res, next){

        var newPassUrl = req.body.passurl;
        var currentUrl = req.app.get('urlCurrent');
        userService.reCrypPassWd(
              req.body.account,
              req.body.password,
              function(calldata){

                      console.log('------- 驗證結果 --------');
                      var instances = JSON.parse(calldata);

                      if(instances["error"] !== undefined ){

                              console.log('沒有通過'); 
                              res.locals.username = 'unfind user';
                              res.redirect('back');
                      }
                      else  if(instances["data"] !== undefined){

                                var objResult = JSON.parse(instances.data);
                                console.log(instances);

                                if(objResult.length==0){

                                        console.log('密碼沒有通過'); 
                                        res.locals.username = 'unfind user';
                                        res.redirect('back');
                                }else{

                                        req.session.loginUser =  objResult[0].account;
                                        
                                        console.log('跳轉頁面:'+newPassUrl);
                                        console.log('認證通過,核發簽證:'+req.session.loginUser);
                                        // res.set('Content-Type', 'text/html')
                                        // res.send('<p>身份結果:'+res.locals.username+'</p>')
                                        res.redirect(newPassUrl);

                                }
                                
                      }
                    
            }
            
        );

        next();
       
})

module.exports = router;
