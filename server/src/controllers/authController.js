const {promisify} = require('util');
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET,ACCESS_TOKEN_TIME,REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TIME} = require('../constants');
const { User } = require('../models');

const signJWT = promisify(jwt.sign);

module.exports.signIn = async (req, res, next) => {
  try {
    const {body:{email, password}} = req;

    //1 - find user 
    const user = await User.findOne({
      where: {email},
    });
    //2 - compare passwords
    if(user && user.comparePassword(password)){
      //3 - create tokens
      const accessToken = await signJWT({
        userId:user.id,
        email:user.email,
        role:user.role
      }, 
      ACCESS_TOKEN_SECRET,
      {expiresIn: ACCESS_TOKEN_TIME});
      const refreshToken = await signJWT({
        userId:user.id,
        email:user.email,
        role:user.role
      }, 
      REFRESH_TOKEN_SECRET,
      {expiresIn: REFRESH_TOKEN_TIME});

      await user.createRefreshToken({value: refreshToken});
      //4 - send info
      res.send({data:{
        user,
        tokenPair:{
          access: accessToken,
          refresh: refreshToken,
        }
      }})
    }
    next(createHttpError(401,'Invalid data'));
  } catch (error) {
    next(error)
  }
}
module.exports.signUp = async (req, res, next) => {
  try {
    const {body} = req;
    const user = await User.create(body);
  } catch (error) {
    next(error)
  }
}
module.exports.refresh = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}
