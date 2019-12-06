const router = require('express').Router();

const categoriesController = require('../controllers/categories')

module.exports = basePath => {

	router.get(basePath + "/", categoriesController.listCategories);

	router.route(basePath + "/:category")
	.get(categoriesController.middleware, categoriesController.listResources)
	.post(categoriesController.middleware, categoriesController.addResource)

	/* import */
	router.post(basePath + "/:category/import", categoriesController.middleware, categoriesController.import)

	return router
};
