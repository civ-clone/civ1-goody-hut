"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const GoodyHutRegistry_1 = require("@civ-clone/core-goody-hut/GoodyHutRegistry");
const Units_1 = require("@civ-clone/civ1-unit/Units");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Unit_1 = require("@civ-clone/base-goody-hut-unit/Rules/Unit");
const getRules = (goodyHutRegistry = GoodyHutRegistry_1.instance, randomNumberGenerator = () => Math.random(), ruleRegistry = RuleRegistry_1.instance) => [
    new Unit_1.default(new Effect_1.default((goodyHut, unit) => {
        const availableUnits = [Units_1.Horseman, Units_1.Swordman], RandomUnit = availableUnits[Math.floor(availableUnits.length * randomNumberGenerator())];
        // TODO: detect nearby city, same as civ1
        // https://forums.civfanatics.com/threads/when-do-bribed-units-become-owned.648334/#post-15510296
        return new RandomUnit(null, unit.player(), unit.tile(), ruleRegistry);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=unit.js.map