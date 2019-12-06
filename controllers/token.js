const jwtVerify = require('jsonwebtoken');
const jwtMiddelware = require('express-jwt')
require('dotenv').config()
const tokenList = []

const routesCheck = jwtMiddelware({ secret: process.env.JWT_TOKEN})

const newToken = id => jwtVerify.sign({id}, process.env.JWT_TOKEN, { expiresIn: '15m' })

const signToken = id => {
  const token = newToken(id)
  tokenList[id] = token
  return token
}

const doRefreshToken = (refreshToken, userId) => {
  if ( !(userId && refreshToken) ) {
    return null
  }

  const oldTokenIndx = tokenList[userId]
  if ( !(oldTokenIndx && oldTokenIndx === refreshToken) ) {
    return null
  }

  return signToken(userId)
};


module.exports = {
  errorHandler(err, req, res, next) {
    console.log("ok", err, req.user)
    if (err.name === 'UnauthorizedError') {
      res.status(401).end('invalid token');
      return
    }

    next(err, req, res)
  },

  refresh: async (req, res) => {
    const {id, token} = req.body
    const refreshed = doRefreshToken(token, id)

    if (!refreshed) {
      res.status(401).send('Invalid request')
      return
    }
    
    res.status(200).json({token: refreshed});
  },

  routesCheck,
  signToken
}