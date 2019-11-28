const userModel = require('./models/user.js');
const bcrypt = require('bcrypt'); 
const jwtVerify = require('jsonwebtoken');
const jwtMiddelware = require('express-jwt')
require('dotenv').config()


const signToken = userId => jwtVerify.sign({id: userId}, process.env.JWT_TOKEN, { expiresIn: '15s' })
const refreshTokenLogic = (refreshToken, userId) => {
  if ( !(userId && refreshToken) ) {
    return null
  }

  const oldTokenIndx = tokenList[userId]
  if ( !(oldTokenIndx && oldTokenIndx === refreshToken) ) {
    return null
  }

  const token = signToken(userId)
  tokenList[userId] = token
  return token
};
const authError = res => res.json({status: "error", message: "Invalid username/password!!!", data: null})
const routingCheck = jwtMiddelware({ secret: process.env.JWT_TOKEN})

const tokenList = []

module.exports = {
  
  authenticate: async (req, res, next) => {
    const {username, hash} = new userModel(req.body);

    if (!username || !hash) {
      authError(res)
      return
    }

    userModel.findOne({username}).exec( (err, userInfo) => {
      if (err) {
        next(err)
        return
      }

      if (!userInfo) {
        authError(res)
        return
      }


      if(bcrypt.compareSync(hash, userInfo.hash)) {
        const token = signToken(userInfo._id)
        tokenList[userInfo._id] = token
        res.json({status:"success", message: "user auth successful", data: {username, token}});
        return
      }

      authError(res)
    });
  },


  refreshToken: async (req, res) => {

    // refresh the damn token
    const {username, refreshToken} = req.body

    userModel.findOne({username})
    .exec( (err, userInfo) => {
      if (err) {
        next(err)
        return
      }

      if (!userInfo) {
        authError(res)
        return
      }

      const token = refreshTokenLogic(refreshToken, userInfo._id)

      if (!token) {
        res.status(401).send('Invalid request')
        return
      }
      
      res.status(200).json({token});
    })
  },

  errorTokenHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
  
      if (tokenList[userId] = token) {
        res.status(401).send('expired token');
        return
      }
  
        res.status(401).send('invalid token');
    }
    next(err, req, res)
  },

  routingCheck


  // create: async (req, res, next) => {
  //   const {username, password} = req.body
  //   userModel.create({username, hash: password}, (err, result) => {
  //     if (err) {
  //       next(err);
  //       return
  //     }
  //     res.json({status: "success", message: "User added successfully!!!", data: null});
  //   });
  // },
  // list: async (req, res) => {
  //   userModel.find({}, (err, users) => {
  //     if (err) {
  //       next(err)
  //       return
  //     }

  //     res.json({status:"success", message: "users found!!!", data: users});
  //   })
  // }
}