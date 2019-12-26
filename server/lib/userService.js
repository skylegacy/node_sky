
var db = require('../models/index');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
// var users = require('../models').User;
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

 var User = require('../sequelize').User;

 var Role  = require('../sequelize').Role;

exports.showDbStatus = function(){

    this.connstr;
    var taht = this;
    db.sequelize.authenticate()
    .then(function(){
        taht.connstr ='Connection has been established successfully.';
        console.log('Connection has been established successfully.');
    })
    .catch(function(err){
        taht.connstr ='Unable to connect to the database:';
        console.error('Unable to connect to the database:', err);
    });

    return this.connstr;
};

exports.authenticate = function(req,res){

    var loginUser = req.session.loginUser;
   
    var data = '';

    if(loginUser!=null){

        
       data  = loginUser;

    }else{

       data  = 'never login'
    }
 

};

exports.addUser = function(username,account,password,cb){

    var credetial = module.exports.genSalt(password);

    var body = {
        username :username,
        account :account,
        createdAt : new Date(),
        updatedAt : new Date(),
        password : credetial.conres,
        salt : credetial.salt
    };
  
    var that = this;
 
    User.create(body).then(function(user){
        that.handleData = user.get({ plain: true })
        cb(that.handleData);
    })
    
     
       // var execu = users.create(body);
}

exports.genSalt = function(password){

    this.result = {};
    this.result.conres = null;
    this.result.pass = password;
    this.result.salt = null;

    var that = this.result;

    that.salt = bcrypt.genSaltSync(saltRounds);
    that.conres = bcrypt.hashSync(password, that.salt);

    return that;
}

exports.findUserByPassWd = function(req, res, next){
 
        
            var newPassUrl = req.body.passurl;
            var currentUrl = req.app.get('urlCurrent');
            module.exports.reCrypPassWd(
                req.body.account,
                req.body.password,
                function(calldata){
                    console.log('------- 驗證結果 --------');
                                    var instances = JSON.parse(calldata);
                                    if(instances["error"] !== undefined ){
                                            console.log('沒有通過'); 
                                            res.locals.username = 'unfind user';
                                            res.redirect('/');
                                    }
                                    else  if(instances["data"] !== undefined){
                                                var objResult = JSON.parse(instances.data);
                                                console.log(instances);
                                                if(objResult.length==0){
                                                        console.log('密碼沒有通過'); 
                                                        res.locals.username = 'unfind user';
                                                        res.redirect('/');
                                                }else{
                                                        req.session.loginUser =  objResult[0].account;
                                                        
                                                        console.log('跳轉頁面:'+newPassUrl);
                                                        console.log('認證通過,核發簽證:'+req.session.loginUser);
                                                        res.redirect(newPassUrl);
                                                }          
                                    }
                }
                
            );
 

    

    next();
   
}

exports.findUserByApi  = function(req, res, next){

}


 exports.reCrypPassWd = function(accountName,passWord,callback){

    let passwd = null;
    let result = null;
    let times = 0;
    let bindValue = null;

    times++;
    console.log('+++查詢次數'+times+'+++');

    User.findAll({
        where:{ account:accountName }
    }).then(function(user){
        bindValue = JSON.stringify(user); 
    }).then(function(){

        bindValue = JSON.parse(bindValue);
        // console.log(bindValue);
        
            if(bindValue.length == 0){

                var message = { error: '找不到使用者' }
                console.log(message.error);
                bindValue = JSON.stringify(message); 
                // callback(bindValue);

            }else{
                
                passwd = bcrypt.hashSync(passWord, bindValue[0].salt);
                var message = { success:'找到使用者',password:passwd }
                console.log(message);

                times++;
                console.log('+++查詢次數'+times+'+++');
        
                    User.findAll({
                        where:{password:passwd} ,
                        include:[{
                            model:Role,
                            as: 'Role'
                          }]
                    }).then(function(user){
                        
                            var message = {};
                            bindValue = JSON.stringify(user); 
                            
                            if(bindValue.length==0){
                                 message.error='該密碼錯誤';
                            }
                            else{        
                                dataRender = user[0].get({plain: true});
                                // console.log(dataRender);
                                if(dataRender.Role.valueNum>700){
                                    message['data'] = bindValue;
                                }
                                else{
                                    message.error='帳號權限不足';
                                }
                            }
                            bindValue = JSON.stringify(message);
                            callback(bindValue);
                    })

            }

    })

 }