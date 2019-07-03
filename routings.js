const express = require('express');
const router = express.Router();
const models = require("./models");

router.use(express.json());

// FUCKING CORS!
const cors = require('cors')
router.use(cors())
//


/**/
	// Category middleware
	const categoryMiddleware = (req, res, next) => {
		const {category} = req.params;

		if (!category) {
			res.status(404).end("No category.");
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
router.route("/:group/:category")
	.get(groupMiddleware, categoryMiddleware, async (req, res) => {
		const {category, group} = req.params;
		const selectedCategory = models[category];

		selectedCategory.find({ "groups": { $in: group } })
		.exec((err, items) => {
			if (err) {
				res.status(500).json(err);
				return console.error(err);
			}
			res.json(items);
		});
	});

	router.post("/:group/", async (req, res) => {
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




/**/
router.route("/:category")
	.get(categoryMiddleware, async (req, res) => {
		const {category} = req.params;
		const selectedCategory = models[category];

		selectedCategory.find()
		//where('sport').equals('Tennis').
		//where('age').gt(17).lt(50).  //Additional where query
		//sort({ age: -1 }).
		//.limit(5)
		//.select('src label')
		.exec((err, items) => {
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

	selectedCategory.find({ "_id": { $in: selectedids } })
	.exec((err, items) => {
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

		selectedCategory.findById(id)
		.exec((err, item) => {
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

		const options = { new: true };

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


// import
router.post("/import/:category/", categoryMiddleware, async (req, res) => {
	const {category} = req.params;
	const items = req.body;
	const results = []

	for (let item of items) {
		const itemToBeSaved = new models[category](item);
		const saved = await itemToBeSaved.save().catch(err => console.error(err))
		results.push(saved)
	}

	res.json(results);
})

module.exports = router;
