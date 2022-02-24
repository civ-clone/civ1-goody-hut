"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const GoodyHuts_1 = require("../../GoodyHuts");
const CityRegistry_1 = require("@civ-clone/core-city/CityRegistry");
const Terrains_1 = require("@civ-clone/civ1-world/Terrains");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Action_1 = require("@civ-clone/core-goody-hut/Rules/Action");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Food_1 = require("@civ-clone/base-terrain-yield-food/Food");
const Production_1 = require("@civ-clone/base-terrain-yield-production/Production");
const Trade_1 = require("@civ-clone/base-terrain-yield-trade/Trade");
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance, cityRegistry = CityRegistry_1.instance) => [
    // TODO: Have an action for when there are no actions ("The hut is long abandoned...")
    new Action_1.default(new Criterion_1.default((goodyHut, unit) => playerResearchRegistry.getByPlayer(unit.player()).available().length > 0), new Effect_1.default((goodyHut, unit) => new GoodyHuts_1.Advance(goodyHut, unit))),
    new Action_1.default(new Criterion_1.default((goodyHut) => [Terrains_1.Grassland, Terrains_1.Plains, Terrains_1.River].some((TerrainType) => goodyHut.tile().terrain() instanceof TerrainType)), new Criterion_1.default((goodyHut, unit) => goodyHut
        .tile()
        .getSurroundingArea()
        .score(unit.player(), [
        [Food_1.default, 4],
        [Production_1.default, 2],
        [Trade_1.default, 1],
    ]) >= 120), new Criterion_1.default((goodyHut) => goodyHut
        .tile()
        .getSurroundingArea(4)
        .every((tile) => cityRegistry.getByTile(tile).length === 0)), new Effect_1.default((goodyHut, unit) => new GoodyHuts_1.City(goodyHut, unit))),
    new Action_1.default(new Effect_1.default((goodyHut, unit) => new GoodyHuts_1.Gold(goodyHut, unit))),
    new Action_1.default(new Effect_1.default((goodyHut, unit) => new GoodyHuts_1.Unit(goodyHut, unit))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=action.js.map