 
 "use strict";

 module.exports = function(sequelize, DataTypes){

  var User = sequelize.define('Users', {
    
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING
    },
    account: {
      type: DataTypes.STRING
    },
    salt: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    role:{
      type: DataTypes.INTEGER(3)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }

  },{

      indexes: [
        {
            unique: true,
            fields: ['username', 'account']
        }
      ]

  });

  // User.associate = function(models) {
  //   // associations can be defined here
  // };
   return User;
}