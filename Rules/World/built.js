"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const GoodyHutRegistry_1 = require("@civ-clone/core-goody-hut/GoodyHutRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Built_1 = require("@civ-clone/core-world/Rules/Built");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const GoodyHut_1 = require("@civ-clone/core-goody-hut/GoodyHut");
const Distribution_1 = require("@civ-clone/core-goody-hut/Rules/Distribution");
const getRules = (goodyHutRegistry = GoodyHutRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance) => [
    new Built_1.default(new Effect_1.default((world) => {
        const goodyHutRules = ruleRegistry.get(Distribution_1.default);
        world.forEach((tile) => {
            if (goodyHutRules.every((rule) => rule.validate(tile))) {
                goodyHutRegistry.register(new GoodyHut_1.default(tile));
            }
        });
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=built.js.map