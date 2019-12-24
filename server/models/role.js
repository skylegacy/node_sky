'use strict';
module.exports = (sequelize, DataTypes) => {
  var  Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    roleName: DataTypes.STRING,
    valueNum: {
        type: DataTypes.INTEGER(3),
        allowNull: true
    }
  }, {

    indexes: [
      {
          unique: true,
          fields: ['roleName']
      }
    ]

  });
  Role.associate = function(models) {
    // associations can be defined here
  };
  return Role;
};