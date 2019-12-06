const Sharing = require('../models/sharing')
const {dbHandler} = require("./utils")

module.exports = {
    detail: async (req, res) => {
		Sharing.find()
		.exec((err, items) => dbHandler(res, err, items));
	},
	create: async (req, res) => {
		new Sharing(req.body)
		.save((err, items) => dbHandler(res, err, items));
    }
}