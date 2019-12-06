const mongoose = require("mongoose");
const {Resource, EncodedFunction} = require("../utils");

const defaultEncodedEvent = EncodedFunction("scene, options", "");
const callbackEncodedEvent = EncodedFunction("scene, options, callback", "callback();");

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
const schema = Resource({
	actors: [{
		id: String,
		options: {
			x: Number,
			y: Number,
			isEnemy: { type: Boolean, default: false },
			isAlly:  { type: Boolean, default: false }
		}
	}],
	preload: defaultEncodedEvent,
	create: callbackEncodedEvent,
	update: callbackEncodedEvent,
	onLose: defaultEncodedEvent,
	onWin:  defaultEncodedEvent
});



//
module.exports = mongoose.model('battles', schema);