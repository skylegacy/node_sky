var express = require('express');
var router = express.Router();
var userController = require('../lib/userController');

router.get('/logout',userController.logout);

router.get('/login',userController.login);

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  // var responseText = 'Requested at: ' + req.requestTime + '';
  // res.send('respond with a resource,'+responseText);

  var value = { 
    title:'登入網站:' ,
    loginUser: req.session.loginUser,
    repassUrl: req.app.get('urlReferer')
  }

  userController.checkmember(req,res);

  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('admin/index', value);


  next()
});

router.get('/status',function(req, res, next){
    
    var value = { 
      title:'登入網站:' ,
      loginUser: req.session.loginUser,
      repassUrl: req.app.get('urlReferer')
    }
    
    if(req.session.loginUser!==undefined){

      res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      res.render('admin/status', value);
    }
    else{
  
      res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      res.redirect('/users/login');
    }

    next();
     
});

module.exports = router;
