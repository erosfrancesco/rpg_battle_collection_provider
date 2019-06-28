const mongoose = require("mongoose");
/*
{
	"label": "TestBattle",
	"properties": {
	    "actors": [
	        {
	            "label": "TeamSkullGruntFemale",
	            "options": {
	                "x": "200",
	                "y": "200",
	                "isEnemy": true
	            }
	        }
	    ],
	    "preload": "scene.load.image(\"background\", \"./resources/assets/backgrounds/fantasy.jpg\");",
	    "create": "\nscene.backgroundCamera.setTint('rgba(120, 120, 120, 1)')\n\n// BANNER\n",
	    "onLose": "scene.topPanel.play(\"show\", null, {text: \"You lose!\"});\nscene.pause();",
	    "onWin": "scene.topPanel.play(\"show\", null, {text: \"You win!\"});\nscene.pause();",
	    "update": "//console.log(\"updating\")"
	}
*/
const schema = new mongoose.Schema({
	label: String,
	properties: {
		actors: [{
			id: String,
			options: {
				x: Number,
				y: Number,
				isEnemy: { type: Boolean, default: false },
				isAlly:  { type: Boolean, default: false }
			}
		}],
		preload: {
			body: {type: String, default: ""},
			params: {type: String, default: "scene, options"}
		},
		create: {
			body: {type: String, default: "callback();"},
			params: {type: String, default: "scene, options, callback"}
		},
		update: {
			body: {type: String, default: "callback();"},
			params: {type: String, default: "scene, options, callback"}
		},
		onLose: {
			body: {type: String, default: ""},
			params: {type: String, default: "scene, options"}
		},
		onWin: {
			body: {type: String, default: ""},
			params: {type: String, default: "scene, options"}
		}
	}
});



//
module.exports = mongoose.model('battles', schema);