const {defaultErrorHandler, defaultResponseHandler, getCategoryModel, getCategoryList} = require('./utils')


const newResourceFromReq = async (req, options) => {
	try {
		const resourceOptions = Object.assign(options, {owner: req.user.id})
		return newItem = await getCategoryModel(req).create(resourceOptions)
	} catch(err) {
		return err
	}
}

module.exports = {
	middleware: (req, res, next) => {
		if (!getCategoryModel(req) ) {
			res.status(404).end("Category not found: " + req.params.category);
			return
		}
		next();
	},

	addResource: async (req, res) => {
		try {
			const newItem = await newResourceFromReq(req, req.body)
			defaultResponseHandler(res, newItem)
		} catch(err) {
			defaultErrorHandler(res, "Error [Resource New]: " + err)
		}
	},

	import: async (req, res) => {
		try {
			const results = []

			for (let item of req.body) {
				results.push(await newResourceFromReq(req, item))
			}

			defaultResponseHandler(res, results);
		} catch(err) {
			defaultErrorHandler(res, "Error [Resource Import]: " + err)
		}
	},

	listCategories: async (req, res) => {
		try {
			defaultResponseHandler(res, getCategoryList() )
		} catch(err) {
			defaultErrorHandler(res, "Error [Category List]: " + err)
		}
	},

	listResources: async (req, res) => {
		try {
			defaultResponseHandler(res, await ( getCategoryModel(req).find() ))
		} catch(err) {
			defaultErrorHandler(res, "Error [Resource List]: " + err)
		}
	}
};
