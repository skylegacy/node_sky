
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

    var loginUser =  req.session.username ;

    var data = '';

    if(loginUser!=null){

        
       data  = loginUser;

    }else{

       data  = 'never login'
    }

    console.log('驗證身份:'+data);

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

exports.findUserByPassWd = function(accountName,passWord){
    
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
        passwd = bcrypt.hashSync(passWord, bindValue[0].salt);
        console.log(passwd)
         
        times++;
        console.log('+++查詢次數'+times+'+++');

        User.findAll({
            where:{password:passwd} 
        }).then(function(user){
                bindValue = JSON.stringify(user); 
                callback(bindValue);
        })
         
       
    })

 }