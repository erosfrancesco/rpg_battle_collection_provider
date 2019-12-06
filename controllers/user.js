const User = require('../models/user.js');
const tokenController = require('../controllers/token');
const { defaultResponseHandler, defaultErrorHandler } = require('./utils')

const bcrypt = require('bcrypt');


const authError = res => res.status(401).end("Invalid credentials")
const checkUser = (user, password) => {
  if (!user) { return false }
  return bcrypt.compareSync(password, user.hash)
}

module.exports = {

  authenticate: async (req, res) => {
    try {
      const {username, password} = req.body
      if (!username || !password) {
        throw "Gimme a username and password!"
      }

      const user = await User.findOne({username})
      const {hash} = new User({username, hash: password});
      if (!checkUser(user, hash)) { 
        throw "Wrong credentials"
      }
      
      const token = tokenController.signToken(user._id)
      defaultResponseHandler(res, {username, token});
    } catch(err) {
      authError(res)
    }
  },


  // create: async (req, res, next) => {
  //   const {username, password, roles} = req.body
  //   userModel.create({username, hash: password, roles}, (err, user) => {
  //     if (err) {
  //       next(err);
  //       return
  //     }
  //     res.status(200).json(user);
  //   });
  // },
  list: async (req, res) => {
    try {
      defaultResponseHandler(res, await User.find() )
    } catch(err) {
      defaultErrorHandler(res, "Error [User List]: " + err)
    }
  },

  middleware: async (err, req, res, next) => {
    try {
      if (err) { throw err }
  
      const user = await User.findById(req.user.id)
      req.user.roles = user.roles
      next(err, req, res)
    } catch(err) {
      next("Error [User Middleware]: " + err, req, res)
    }
  }
}