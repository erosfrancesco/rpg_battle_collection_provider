const mongoose = require("mongoose");
const {Resource, EncodedFunction, idReference} = require("../utils");

const EncodedFunctionEvent = EncodedFunction("scene, options, callback", "callback();");
const CustomFunctionEvent = EncodedFunction("scene, options, callback", "callback();", { name: String });

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
        },
        "events": {
            "customs": [{
                name: "onHit"
                params: ""
                body
            }]
        }
}
*/

const schema = Resource({
    name: String,
    canBeEnemy: { type: Boolean, default: false },
    canBeAlly: { type: Boolean, default: false },
    stats: [Map],
    events: {

        load:   EncodedFunctionEvent,
        create: EncodedFunctionEvent,

        attack: EncodedFunctionEvent,
        damage: EncodedFunctionEvent,
        ko:     EncodedFunctionEvent,
        revive: EncodedFunctionEvent,

        turnStart:  EncodedFunctionEvent,
        turnEnd:    EncodedFunctionEvent,
        turnUpdate: EncodedFunctionEvent,

        battleStart: EncodedFunctionEvent,
        battleEnd:   EncodedFunctionEvent,


        custom: [CustomFunctionEvent]
    },
    sprite: idReference("sprites"),
    actorCommands: [idReference("commands")],
    ai: idReference("ai")
});



//
module.exports = mongoose.model('actors', schema);