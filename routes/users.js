var express = require('express');
var router = express.Router();
var userController = require('../lib/userController');



/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var responseText = 'Requested at: ' + req.requestTime + '';
  res.send('respond with a resource,'+responseText);

  next()
});

router.get('/logout',function(req,res,next){

  var value = { 
    title:'已登出:' ,
    repassUrl: req.app.get('urlReferer')
  }
  
   console.log('登出後的url:'+value.repassUrl);
  
  // req.session.destroy();
  req.session.loginUser = undefined;
  // delete req.session;

  var confirm = req.session.loginUser;
  // console.log('-------->最後的session:'+confirm);

  res.redirect('/users');

   next();
});

router.get('/login',  userController.login);

router.get('/status',function(req, res, next){
    
    var str = userController.register();
   
    var confirm = req.session.loginUser;
    res.write('<html>');
    res.write('<body>');
    res.write("pass:"+str.pass);
    res.write("<br>");
    res.write("salt:"+str.salt);
    res.write("<br>");
    res.write("result:"+str.conres);
    res.write("<br>Who is that:"+confirm);
    res.write('</body>');
    res.write('</html>');

    res.end();

    next();
     
});

module.exports = router;
