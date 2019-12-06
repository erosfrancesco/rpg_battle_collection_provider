const router = require('express').Router();

const categoriesController = require("../controllers/categories")
const resourceController = require("../controllers/resources")

module.exports = basePath => {

	router.get(basePath + "/:category/findById", categoriesController.middleware, resourceController.detailMulti),

	router.route(basePath + "/:category/:id")
	.get(categoriesController.middleware, resourceController.detail)
	.patch(categoriesController.middleware, resourceController.update)
	.delete(categoriesController.middleware, resourceController.remove);

	return router
}
