"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const GoodyHutRegistry_1 = require("@civ-clone/core-goody-hut/GoodyHutRegistry");
const placement_1 = require("@civ-clone/base-goody-hut/lib/placement");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Distribution_1 = require("@civ-clone/core-goody-hut/Rules/Distribution");
const core_random_1 = require("@civ-clone/core-random");
// A hut on 1 in 20 land squares, no nearer than 3 to another.
const getRules = (goodyHutRegistry = GoodyHutRegistry_1.instance, randomNumberGenerator = core_random_1.instance) => [
    new Distribution_1.default(new Criterion_1.default(placement_1.onLand)),
    new Distribution_1.default(new Criterion_1.default((0, placement_1.noHutWithin)(3, goodyHutRegistry))),
    new Distribution_1.default(new Criterion_1.default((0, placement_1.chance)(0.05, randomNumberGenerator))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=distribution.js.map