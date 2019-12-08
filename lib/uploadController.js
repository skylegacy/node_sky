var fs = require('fs');
var ejs = require('ejs');
var template = fs.readFileSync('views/upload.ejs', 'utf-8');

exports.showUpload = function(){
   var value = { title:'AWS大檔案上傳'}
   return  ejs.render(template,value);
}