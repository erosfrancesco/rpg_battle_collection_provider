const express = require('express');
const router = express.Router();
const models = require("./models");

/*
{
	"username": "jason",
	"password": "darthvent"
}

{
	"username": "freddy",
	"password": "darthvent"
}

*/

// JSON BODY PARSER
router.use(express.json());
//

// FUCKING CORS!
const cors = require('cors')
router.use(cors())
//


// JWT auth middleware
const jwt = require('./jwt.js');
router.use(jwt(), (err, req, res, next) => {
	if (err.code === 'invalid_token') {
		// token is expired
		console.log("token is expired!.")
		return next(err);
	}
	return next(err);
});


// user routes
router.use('/users', require('./users/users.controller'));


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

	// USER CHECK MIDDLEWARE
	const isResourceOfUser = (req, res, next) => {
		const {category, id} = req.params;
		const selectedCategory = models[category];

		// console.log(req.user)

		const userCheckOptions = { $or:[ 
			{'user': null}, 
			{"user": { $in: req.user.sub }} 
		]};
		const idFilterOptions = { "_id": id };

		selectedCategory.countDocuments(Object.assign(userCheckOptions, idFilterOptions)).exec((err, count) => {
			if (err) {
				res.status(500).json(err);
				return console.error(err);
			}
			
			// check if count > 0
			if (count > 0) {
				next();
			} else {
				res.status(501).end("user not authorized for this resource");
			}
		});
	}
/**/






/**/
router.route("/:category")
	.get(categoryMiddleware, async (req, res) => {
		const {category} = req.params;
		const selectedCategory = models[category];

		//{ "user": { $in: req.user.sub } })
		//.where('age').gt(17).lt(50)  //Additional where query
		//.sort({ age: -1 })
		//.limit(5)
		//.select('src label')

		const userCheckOptions = { $or:[ 
			{'user': null}, 
			{"user": { $in: req.user.sub }} 
		]};

		selectedCategory.find(userCheckOptions).exec((err, items) => {
			if (err) {
				res.status(500).json(err);
				return console.error(err);
			}
			res.json(items);
		});
	})
	.post(categoryMiddleware, async (req, res) => {
		const {category} = req.params;

		const {user = []} = req.body;
		if (user.indexOf(req.user.sub) < 0) {
			user.push(req.user.sub)
		}
		
		const itemOptions = Object.assign(req.body, {user});
		const itemToBeSaved = new models[category](itemOptions);

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

	const userCheckOptions = { $or:[ 
		{'user': null}, 
		{"user": { $in: req.user.sub }} 
	]};
	const idFilterOptions = { "_id": { $in: selectedids } };

	selectedCategory.find(Object.assign(userCheckOptions, idFilterOptions)).exec((err, items) => {
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

		const userCheckOptions = { $or:[ 
			{'user': null}, 
			{"user": { $in: req.user.sub }} 
		]};
		const idFilterOptions = { "_id": id };

		selectedCategory.find(Object.assign(userCheckOptions, idFilterOptions)).exec((err, item) => {
			if (err) {
				res.status(500).json(err);
				return console.error(err);
			}
			res.json(item);
		});
	})
	.patch(categoryMiddleware, isResourceOfUser, async (req, res) => {

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
	.delete(categoryMiddleware, isResourceOfUser, async (req, res) => {
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


/* import */
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
/**/


/* Groups */
router.route("/groups/:group/:category")
	.get(groupMiddleware, categoryMiddleware, async (req, res) => {
		const {category, group} = req.params;
		const selectedCategory = models[category];

		const userCheckOptions = { $or:[ 
			{'user': null}, 
			{"user": { $in: req.user.sub }} 
		]};
		const groupFilterOptions = { "groups": { $in: group } };

		selectedCategory.find(Object.assign(userCheckOptions, groupFilterOptions)).exec((err, items) => {
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
