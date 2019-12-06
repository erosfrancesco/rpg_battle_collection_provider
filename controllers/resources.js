const { defaultErrorHandler, defaultResponseHandler, getCategoryModel } = require('./utils')

const reqParser = req => {
	const {id} = req.params;
	const category = getCategoryModel(req);

	return {category, id}
}

module.exports = {
	detail: async (req, res) => {
		try {
			const {category, id} = reqParser(req)
			defaultResponseHandler(res, await ( category.findById(id) ) )
		} catch(err) {
			defaultErrorHandler(res, "Error [Resource Detail]: " + err)
		}
	},
	
	detailMulti: async (req, res) => {
		try {
			const {category} = reqParser(req)
			const {id = []} = req.query
			const selectedIds = (Array.isArray(id)) ? id : [id];
			const idFilterOptions = { "_id": { $in: selectedIds } };

			defaultResponseHandler(res, await ( category.find(idFilterOptions) ) )
		} catch(err) {
			defaultErrorHandler(res, "Error [Resource Detail Multi]: " + err)
		}
    },
    
	remove: async (req, res) => {
		try {
			const {category, id} = reqParser(req)
			defaultResponseHandler(res, await ( category.findByIdAndRemove(id) ) )
		} catch(err) {
			defaultErrorHandler(res, "Error [Resource Remove]: " + err)
		}
	},
	
	update: async (req, res) => {
		try {
			const {category, id} = reqParser(req)
			const update = req.body;
			const options = { new: true, lean: true };

			defaultResponseHandler(res, await ( category.findByIdAndUpdate(id, update, options) ) )
		} catch(err) {
			defaultErrorHandler(res, "Error [Resource Update]: " + err)
		}
    }
}

