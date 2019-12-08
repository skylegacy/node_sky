var express = require('express');
var router = express.Router();
var uploader = require('../lib/uploadController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload',function(req, res, next){
  var output = uploader.showUpload();
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end(output);
})
 

module.exports = router;
