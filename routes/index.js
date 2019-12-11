var express = require('express');
var router = express.Router();
var uploader = require('../lib/uploadController');
var  http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.username = "skyTest";
  res.render('index', { title: 'Express' });
});

router.get('/upload',function(req, res, next){
  var output = uploader.showUpload();
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end(output);
})
 
router.get('/authuser',function(req, res, next){

        var options = {
          host: '127.0.0.1',
          port: 3000,
          path: '/api/user',
          method: 'POST'
        };

      var result =    http.request(options);
        
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end();
})

module.exports = router;
