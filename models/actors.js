const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const EncodedFunctionEvent = {
    params: { type: String, default: "scene, options, callback" },
    body: { type: String, default: "callback();" }
}
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
        canBeEnemy: { type: Boolean, default: false },
        canBeAlly: { type: Boolean, default: false },
        stats: [Map],
        events: {
            attack: EncodedFunctionEvent,
            damage: EncodedFunctionEvent,
            ko: EncodedFunctionEvent,
            revive: EncodedFunctionEvent
        },
        sprite: ObjectId,
        actorCommands: [ObjectId],
        ai: ObjectId
    }
});



//
module.exports = mongoose.model('actors', schema);