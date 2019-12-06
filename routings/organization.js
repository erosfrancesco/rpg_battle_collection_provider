const router = require('express').Router();
const organizationController = require("../controllers/organization")

module.exports = basePath => {
    router.route(basePath)
	.get(organizationController.list)
    .post(organizationController.create)


    router.route(basePath + "/:id")
    .get(organizationController.detail)
    .delete(organizationController.remove)
    .patch(organizationController.update)


    // roles
    router.get(basePath + "/:id/roles", organizationController.roleList)
    router.post(basePath + "/:id/roles/invite", organizationController.invite)
    router.post(basePath + "/:id/roles/revoke", organizationController.revoke)
    router.route(basePath + "/:id/roles/:role")
    .get(organizationController.roleDetail)
    .patch(organizationController.roleUpdate)
    
	
    return router
}