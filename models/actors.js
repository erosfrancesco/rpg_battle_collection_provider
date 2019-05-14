const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
/*
{
    "label": "Terra",
    "properties": {
        "name": "Terra",
        "isEnemy": false,
        "AI": "1",
        "sprite": "0",
        "actorCommands": [
            0
        ],
        "stats": {
            "health": 1,
            "mana": 1,
            "strenght": 1,
            "defense": 1,
            "velocity": 1,
            "intelligence": 1,
            "magic": 1
        }
}
*/

const schema = new mongoose.Schema({
	label: String,
    properties: {
        name: String,
        canBeEnemy: Boolean,
        canBeAlly: Boolean,
        stats: [Map],
        sprite: ObjectId,
        actorCommands: [ObjectId],
        ai: ObjectId
    }
});



//
module.exports = mongoose.model('actors', schema);