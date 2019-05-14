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
			label: String,
			options: {
				x: Number,
				y: Number,
				isEnemy: Boolean
			}
		}],
		preload: {
			body: String,
			params: {type: String, default: "scene, options"}
		},
		create: {
			body: String,
			params: {type: String, default: "scene, options"}
		},
		update: {
			body: String,
			params: {type: String, default: "scene, options"}
		},
		onLose: {
			body: String,
			params: {type: String, default: "scene, options"}
		},
		onWin: {
			body: String,
			params: {type: String, default: "scene, options"}
		}
	}
});



//
module.exports = mongoose.model('battles', schema);