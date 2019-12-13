var express = require('express');
var router = express.Router();
var userController = require('../lib/userController');



/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var responseText = 'Requested at: ' + req.requestTime + '';
  res.send('respond with a resource,'+responseText);

  next()
});

router.get('/login',  userController.login);

router.get('/status',function(req, res, next){
    
    var str = userController.register();
   
    res.write('<html>');
    res.write('<body>');
    res.write("pass:"+str.pass);
    res.write("<br>");
    res.write("salt:"+str.salt);
    res.write("<br>");
    res.write("result:"+str.conres);
    res.write('</body>');
    res.write('</html>');

    res.end();

    next();
     
});

module.exports = router;
