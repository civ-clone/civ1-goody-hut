"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const GoodyHutRegistry_1 = require("@civ-clone/core-goody-hut/GoodyHutRegistry");
const Units_1 = require("@civ-clone/civ1-unit/Units");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Unit_1 = require("@civ-clone/base-goody-hut-unit/Rules/Unit");
const core_random_1 = require("@civ-clone/core-random");
const outcomes_1 = require("@civ-clone/base-goody-hut/lib/outcomes");
const getRules = (goodyHutRegistry = GoodyHutRegistry_1.instance, randomNumberGenerator = core_random_1.instance, ruleRegistry = RuleRegistry_1.instance) => [
    // TODO: detect nearby city, same as civ1
    // https://forums.civfanatics.com/threads/when-do-bribed-units-become-owned.648334/#post-15510296
    new Unit_1.default(new Effect_1.default((0, outcomes_1.randomUnit)([Units_1.Horseman, Units_1.Swordman], randomNumberGenerator, ruleRegistry))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=unit.js.map