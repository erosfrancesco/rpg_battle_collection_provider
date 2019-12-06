const router = require('express').Router();
const userController = require('../controllers/user.js');

module.exports = basePath => {
    const authPath = basePath + "/authenticate"

    router.get(basePath + "/", userController.list)
    router.post(authPath, userController.authenticate)
    return router
}