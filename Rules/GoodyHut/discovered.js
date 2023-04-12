"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const GoodyHutRegistry_1 = require("@civ-clone/core-goody-hut/GoodyHutRegistry");
const Discovered_1 = require("@civ-clone/core-goody-hut/Rules/Discovered");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const High_1 = require("@civ-clone/core-rule/Priorities/High");
const getRules = (goodyHutRegistry = GoodyHutRegistry_1.instance, engine = Engine_1.instance, randomNumberGenerator = () => Math.random()) => [
    new Discovered_1.default(new Effect_1.default((goodyHut) => goodyHutRegistry.unregister(goodyHut))),
    new Discovered_1.default(new Effect_1.default((goodyHut, unit) => {
        const availableGoodyHutActions = goodyHut.actions(unit), randomAction = availableGoodyHutActions[Math.floor(availableGoodyHutActions.length * randomNumberGenerator())];
        goodyHut.action(randomAction);
    })),
    new Discovered_1.default(new Effect_1.default((goodyHut, unit) => {
        engine.emit('goody-hut:discovered', goodyHut, unit);
    }), new High_1.default()),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=discovered.js.map