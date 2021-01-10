"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const GoodyHutRegistry_1 = require("@civ-clone/core-goody-hut/GoodyHutRegistry");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const getRules = (goodyHutRegistry = GoodyHutRegistry_1.instance) => [
    new Moved_1.default(new Criterion_1.default((unit) => goodyHutRegistry.getByTile(unit.tile()).length > 0), new Effect_1.default((unit) => {
        const [goodyHut] = goodyHutRegistry.getByTile(unit.tile());
        goodyHut.process(unit);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=moved.js.map