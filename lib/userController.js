
var userService = require('./userService');


exports.register = function(){
  // var data = userService.showDbStatus();
 
  var data = 'test register';
   return data;
}

exports.login = function(req){

  var sess = req.session;
  var loginUser = sess.username;
  var isLogined = !!loginUser;

  var data = '';
  if(loginUser!=null){

    data += loginUser.username;
  }else{

    data += 'never login'
  }
  
   return data;
}