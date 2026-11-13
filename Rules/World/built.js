"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const GoodyHutRegistry_1 = require("@civ-clone/core-goody-hut/GoodyHutRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Built_1 = require("@civ-clone/core-world/Rules/Built");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const placement_1 = require("@civ-clone/base-goody-hut/lib/placement");
const getRules = (goodyHutRegistry = GoodyHutRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance) => [
    new Built_1.default(new Effect_1.default((0, placement_1.distributeHuts)(goodyHutRegistry, ruleRegistry))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=built.js.map