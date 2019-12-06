const Categories = require("../models/categories")


const defaultErrorHandler = (res, err) => res.staus(500).end(err)
const defaultResponseHandler = (res, json) => res.status(200).json(json)

const getCategoryModel = req => {
	const {category} = req.params;
	if (!category) {
		return null
	}
	return Categories[category]
}

const getCategoryList = req => {
	return Object.keys(Categories)
}


module.exports = {
	defaultErrorHandler,
	defaultResponseHandler,

	getCategoryModel,
	getCategoryList
}