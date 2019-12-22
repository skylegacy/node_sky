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
router.post('/authuser',userService.findUserByPassWd)

module.exports = router;
