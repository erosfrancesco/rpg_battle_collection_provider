const router = require('express').Router();
const sharingController = require("../controllers/sharing")

module.exports = basePath => {
    router.route(basePath)
	.get(sharingController.detail)
	.post(sharingController.create)
	
    return router
}