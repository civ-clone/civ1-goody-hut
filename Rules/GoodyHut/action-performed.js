"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const ActionPerformed_1 = require("@civ-clone/core-goody-hut/Rules/ActionPerformed");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const getRules = (engine = Engine_1.instance) => [
    new ActionPerformed_1.default(new Effect_1.default((goodyHut, action) => {
        engine.emit('goody-hut:action-performed', goodyHut, action);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=action-performed.js.map