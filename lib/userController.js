

var fs = require('fs');
var ejs = require('ejs');
var loginTemp = fs.readFileSync('views/login.ejs', 'utf-8');
 

exports.register = function(){
  // var data = userService.showDbStatus();
 
        var data = 'test register';
        return data;

}

exports.login = function(req,res,next){

      var value = { 
        title:'登入網站:' ,
        loginUser: req.session.loginUser,
        repassUrl: req.app.get('urlReferer')
      }

      console.log("會員名稱:"+value.loginUser);
      console.log("傳遞頁面:"+req.app.get('urlReferer'));
      
      // if(typeof value.loginUser === "undefined"){
      //   var outputData = ejs.render(loginTemp,value);
      //   res.writeHead(200,{'Content-Type':'text/html'});
      //   res.end(outputData);
      // }       
      // else if(typeof value.loginUser !== "undefined"){
      //   res.redirect('/users/status');
      // }

      if(req.session.loginUser!==undefined){
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.redirect('/users/status');
      }
      else{
        var outputData = ejs.render(loginTemp,value);
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(outputData);
      }
      next();
}

exports.logout = function(){

}