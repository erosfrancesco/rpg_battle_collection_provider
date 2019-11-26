const userModel = require('./models/user.js');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

module.exports = {
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


  authenticate: async (req, res, next) => {
    const user = new userModel(req.body);

    const {username, hash} = user

    if (!username || !hash) {
      res.json({status:"error", message: "Invalid username/password!!!", data: null})
      return
    }

    userModel.findOne({username}).exec( (err, userInfo) => {
      if (err) {
        next(err)
        return
      }

      if (!userInfo) {
        res.json({status:"error", message: "Invalid username/password!!!", data:null});
        return
      }

      

      // const token = jwt.sign({id: userInfo._id}, "secretsToBeEnc6odedOrMoved87905", { expiresIn: '1h' });
      // res.json({status:"success", message: "user found!!!", data: {username, token}});

      if(bcrypt.compareSync(hash, userInfo.hash)) {
        const token = jwt.sign({id: userInfo._id}, "secretsToBeEnc6odedOrMoved87905", { expiresIn: '1h' });
        res.json({status:"success", message: "user found!!!", data: {username, token}});
        return
      }

      res.json({status:"error", message: "Invalid username/password!!!", data:null});

    });
  },

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