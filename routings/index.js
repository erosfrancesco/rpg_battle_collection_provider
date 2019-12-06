const express = require('express');
const router = express.Router();
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



const tokenController = require('../controllers/token.js');
const userController = require('../controllers/user')

const refreshPath = '/token/refresh'
const authPath = '/user/authenticate'
router.use( tokenController.routesCheck.unless({path: [authPath, refreshPath]}) );
router.use( tokenController.errorHandler )
router.use( userController.middleware )


const userRoute = require('./user')
router.use(userRoute("/user"))

const tokenRoutes = require('./token')
router.use(tokenRoutes("/token"))



const organizationRoutes = require('./organization')
router.use(organizationRoutes('/organization'))



// const sharingRoutes = require('./sharing')
// router.use(sharingRoutes("/sharing"))


const categoryRoutes = require('./categories')
router.use(categoryRoutes("/resources"))

const resourcesRoutes = require('./resources')
router.use(resourcesRoutes("/resources"))


module.exports = router;
