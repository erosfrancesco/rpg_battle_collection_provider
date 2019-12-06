const express = require('express');
const router = express.Router();

const tokenController = require('../controllers/token.js');

module.exports = basePath => {
	const refreshPath = basePath + '/refresh'

	router.post(refreshPath, tokenController.refresh);

	return router
}
