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


const userController = require('./user.js');
// router.get('/users/all', userController.list);
// router.post('/users/signin', userController.create);
router.post('/users/authenticate', userController.authenticate);


const jwt = require('express-jwt')
router.use(jwt({ secret: "secretsToBeEnc6odedOrMoved87905"}).unless({path: ['/users/authenticate']}));

// const validateUser = (req, res, next) => {
//   jwt.verify(req.headers['x-access-token'], "secretsToBeEnc6odedOrMoved87905", (err, decoded) => {
// 	  console.log(err, decoded)
//     if (err) {
//       res.json({status:"error", message: err.message, data:null});
//       return
//     }
    
//     // add user id to request
//     req.body.userId = decoded.id;
//     next();
    
//   }); 
// }

// JWT auth middleware
// const jwt = require('./jwt.js');
// router.use(jwt(), (err, req, res, next) => {
// 	console.log("jtw", err)
// 	if (err.code === 'invalid_token') {
// 		// token is expired
// 		console.log("token is expired!.")
// 		return next(err);
// 	}
// 	return next(err);
// });


// user routes
// router.use('/users', require('./users/users.controller'));


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

	// USER CHECK MIDDLEWARE
	// const isResourceOfUser = (req, res, next) => {
	// 	const {category, id} = req.params;
	// 	const selectedCategory = models[category];

	// 	// console.log(req.user)

	// 	const userCheckOptions = { $or:[ 
	// 		{'user': null}, 
	// 		{"user": { $in: req.user.sub }} 
	// 	]};
	// 	const idFilterOptions = { "_id": id };

	// 	selectedCategory.countDocuments(Object.assign(userCheckOptions, idFilterOptions)).exec((err, count) => {
	// 		if (err) {
	// 			res.status(500).json(err);
	// 			return console.error(err);
	// 		}
			
	// 		// check if count > 0
	// 		if (count > 0) {
	// 			next();
	// 		} else {
	// 			res.status(501).end("user not authorized for this resource");
	// 		}
	// 	});
	// }
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

		//{ "user": { $in: req.user.sub } })
		//.where('age').gt(17).lt(50)  //Additional where query
		//.sort({ age: -1 })
		//.limit(5)
		//.select('src label')

		// const userCheckOptions = { $or:[ 
		// 	{'user': null}, 
		// 	{"user": { $in: req.user.sub }} 
		// ]};

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

		// const {user = []} = req.body;
		// if (user.indexOf(req.user.sub) < 0) {
		// 	user.push(req.user.sub)
		// }
		
		// const itemOptions = Object.assign(req.body, {user});
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

	// const userCheckOptions = { $or:[ 
	// 	{'user': null}, 
	// 	{"user": { $in: req.user.sub }} 
	// ]};
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

		// const userCheckOptions = { $or:[ 
		// 	{'user': null}, 
		// 	{"user": { $in: req.user.sub }} 
		// ]};
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
		console.log("updating ", id, category, update)

		selectedCategory.findByIdAndUpdate(id, update, options)
		.exec((err, item) => {
			console.log(err, item)
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

		// const userCheckOptions = { $or:[ 
		// 	{'user': null}, 
		// 	{"user": { $in: req.user.sub }} 
		// ]};
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
