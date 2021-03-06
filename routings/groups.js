const express = require('express');
const router = express.Router();
const models = require('../models')

/**/
	// Category middleware
	const categoryMiddleware = (req, res, next) => {
		const {category} = req.params;

		if (!category) {
			res.status(404).end("No category.");
			return
		}

		if (category == "users") {
			next();
			return
		}

		if (!models[category]) {
			res.status(404).end("Category route not found for: " + category);
			return
		}

		next();
	};

	// GROUP MIDDLEWARE
	const groupMiddleware = (req, res, next) => {
		const {group} = req.params;

		if (!group) {
			res.status(404).end("No group.");
			return
		}

		models.groups.findById(group, (err, items) => {

			if (err) {
				res.status(404).end("Group not found: " + group);
				console.error(err);
				return;
			}

			next();
		});
	}
/**/






/**/
	router.get("/", async (req, res) => {
		const categories = Object.keys(models)
		const index = categories.findIndex(name => name === "groups")
		categories.splice(index, 1)
		res.json(categories);
	});

	router.route("/:category")
	.get(categoryMiddleware, async (req, res) => {
		const {category} = req.params;
		const selectedCategory = models[category];

		selectedCategory.find().exec((err, items) => {
			if (err) {
				res.status(500).json(err);
				return console.error(err);
			}
			res.json(items);
		});
	})
	.post(categoryMiddleware, async (req, res) => {
		const {category} = req.params;
		const itemToBeSaved = new models[category](req.body);

		itemToBeSaved.save((err, item) => {
			if (err) {
				res.status(500).json(err);
				return console.error(err);
			}
			
			res.json(item);
		});
	})
/**/


/**/
router.get("/:category/findById", categoryMiddleware, async (req, res) => {

	const {category} = req.params;
	const {id=[]} = req.query;
	const selectedCategory = models[category];
	const selectedids = (Array.isArray(id)) ? id : [id];
	const idFilterOptions = { "_id": { $in: selectedids } };

	selectedCategory.find(idFilterOptions).exec((err, items) => {
		if (err) {
			res.status(500).json(err);
			return console.error(err);
		}
		res.json(items);
	});
})
/**/

/**/
router.route("/:category/:id")
	.get(categoryMiddleware, async (req, res) => {
		const {category, id} = req.params;
		const selectedCategory = models[category];
		const idFilterOptions = { "_id": id };

		selectedCategory.find(idFilterOptions).exec((err, item) => {
			if (err) {
				res.status(500).json(err);
				return console.error(err);
			}
			res.json(item);
		});
	})
	.patch(categoryMiddleware, async (req, res) => {

		const {category, id} = req.params;
		const update = req.body;
		const selectedCategory = models[category];
		const options = { new: true, lean: true };

		selectedCategory.findByIdAndUpdate(id, update, options)
		.exec((err, item) => {
			if (err) {
				res.status(500).json(err);
				return console.error(err);
			}
			res.json(item);
		});
	})
	.delete(categoryMiddleware, async (req, res) => {
		const {category, id} = req.params;
		const selectedCategory = models[category];
		selectedCategory.findByIdAndRemove(id)
		.exec((err, item) => {
			if (err) {
				res.status(500).json(err);
				return console.error(err);
			}
			res.json(item);
		})
	});
/**/



/* Groups */
router.route("/groups/:group/:category")
	.get(groupMiddleware, categoryMiddleware, async (req, res) => {
		const {category, group} = req.params;
		const selectedCategory = models[category];
		const groupFilterOptions = { "groups": { $in: group } };

		selectedCategory.find(groupFilterOptions).exec((err, items) => {
			if (err) {
				res.status(500).json(err);
				return console.error(err);
			}
			res.json(items);
		});
	});

	router.post("/groups/:group/", async (req, res) => {
		const itemToBeSaved = new models.groups(req.body);

		itemToBeSaved.save((err, item) => {
			if (err) {
				res.status(500).json(err);
				return console.error(err);
			}
			
			res.json(item);
		});
	});
/**/




module.exports = router;
