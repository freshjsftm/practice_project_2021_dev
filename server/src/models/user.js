'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const {SALT_ROUNDS} = require('../constants');

async function hashPassword(user, options){
  if(user.changed('password')){
    const {password} = user;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    user.password = hashedPassword;
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({RefreshToken}) {
      User.hasMany(RefreshToken, {
        foreignKey: 'userId'
      });
    }

    async comparePassword(password){
      return bcrypt.compare(password, this.getDataValue('password'))
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      field:'passwordHash',
      type: DataTypes.STRING,
      allowNull: false,
      /*set(password){
        bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword)=> {
          if(err){
            throw err;
          }
          this.setDataValue('password',hashedPassword);
        });
      }*/
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('customer', 'creator'),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps:true,
  });

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};