  
const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const RoleModel = require('./models/role')
 


const sequelize = new Sequelize('sky_node', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })


  const User = UserModel(sequelize, Sequelize)
  const Role = RoleModel(sequelize, Sequelize)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
 
// User.sync({alter:true}).then(function(result){
//   console.log(`Model User Update..`)
// })
sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {User,Role};