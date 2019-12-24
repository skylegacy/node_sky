var express = require('express');
var router = express.Router();
var uploader = require('../lib/uploadController');
var  http = require('http');
var userService = require('../lib/userService');

/* GET home page. */
router.get('/', function(req, res, next) {
  // req.session.username = "skyTest";
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('index', { title: 'Express' });
  next();
});

router.get('/upload',function(req, res, next){
  var output = uploader.showUpload();
  // res.writeHead(200,{'Content-Type':'text/html'});
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.end(output);
  next();
})
 // login Form route
router.post('/authuser',userService.findUserByPassWd);

router.get('/favicon.ico', (req, res) => res.status(204));

module.exports = router;
