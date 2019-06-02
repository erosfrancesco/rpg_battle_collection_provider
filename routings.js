const express = require('express');
const router = express.Router();
const models = require("./models");

router.use(express.json());


// Category middleware
const middleware = (req, res, next) => {
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
}


//
router.route("/:category")
	.get(middleware, async (req, res) => {
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
	.post(middleware, async (req, res) => {
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

//router.route("/:category/groups")

/**/
router.route("/:category/:id")
	.get(middleware, async (req, res) => {
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
	.patch(middleware, async (req, res) => {

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
	.delete(middleware, async (req, res) => {
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
//


// import
router.post("/import/:category/", async (req, res) => {
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