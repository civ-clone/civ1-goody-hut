"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const GoodyHutRegistry_1 = require("@civ-clone/core-goody-hut/GoodyHutRegistry");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Distribution_1 = require("@civ-clone/core-goody-hut/Rules/Distribution");
const getRules = (goodyHutRegistry = GoodyHutRegistry_1.instance, randomNumberGenerator = () => Math.random()) => [
    new Distribution_1.default(new Criterion_1.default((tile) => tile.isLand())),
    new Distribution_1.default(new Criterion_1.default((tile) => tile
        .getSurroundingArea(3)
        .every((tile) => goodyHutRegistry.getByTile(tile) === null))),
    new Distribution_1.default(new Criterion_1.default(() => randomNumberGenerator() < 0.05)),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=distribution.js.map