var express = require('express');
var router = express.Router();
var userController = require('../lib/userController');
var userService = require('../lib/userService');


router.get('/', function(req, res, next) {
    // res.send('express automatically reloads after modifying the file');

    // var str = userController.showDbStatus();

    // res.write('<html>');
    // res.write('<body>');
    // res.write("pass:"+str.pass);
    // res.write("<br>");
    // res.write("salt:"+str.salt);
    // res.write("<br>");
    // res.write("result:"+str.conres);
    // res.write('</body>');
    // res.write('</html>');

    var data = userService.showDbStatus();
    

    res.end(data);
  });

module.exports = router;