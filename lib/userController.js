

var fs = require('fs');
var ejs = require('ejs');
var loginTemp = fs.readFileSync('views/login.ejs', 'utf-8');

exports.register = function(){
  // var data = userService.showDbStatus();
 
        var data = 'test register';
        return data;

}

exports.login = function(req,res){

          var value = { 
            title:'登入網站:' ,
            loginUser: req.session.loginUser
          }
      
       
     
          console.log(value.loginUser);
     
       var outputData =   ejs.render(loginTemp,value);

       res.writeHead(200,{'Content-Type':'text/html'});
       res.end(outputData);
}

exports.logout = function(){

}