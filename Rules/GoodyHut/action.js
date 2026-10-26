"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = exports.unleashesBarbarians = exports.BARBARIANS_FROM_CITIES = void 0;
const GoodyHuts_1 = require("../../GoodyHuts");
const CityRegistry_1 = require("@civ-clone/core-city/CityRegistry");
const Terrains_1 = require("@civ-clone/civ1-world/Terrains");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Action_1 = require("@civ-clone/core-goody-hut/Rules/Action");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Food_1 = require("@civ-clone/base-terrain-yield-food/Food");
const Production_1 = require("@civ-clone/base-terrain-yield-production/Production");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Trade_1 = require("@civ-clone/base-terrain-yield-trade/Trade");
// No city of any civilization is nearer than this to a hut that unleashes barbarians.
exports.BARBARIANS_FROM_CITIES = 4;
/**
 * Whether a hut unleashes barbarians rather than mercenaries: v474.05's fourth outcome does when the player has a
 * city and no city of anyone's is within 4 squares (OpenCiv1 `Segment_1866`, 0x1b88).
 */
const unleashesBarbarians = (goodyHut, unit, cityRegistry) => cityRegistry.getByPlayer(unit.player()).length > 0 &&
    cityRegistry
        .entries()
        .every((city) => city.destroyed() ||
        city.tile().distanceFrom(goodyHut.tile()) >= exports.BARBARIANS_FROM_CITIES);
exports.unleashesBarbarians = unleashesBarbarians;
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance, cityRegistry = CityRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance) => [
    // TODO: Have an action for when there are no actions ("The hut is long abandoned...")
    // Never a repeatable advance (Future Technology): v474.05 only offers an advance whose prerequisites are known, and
    //  a Future Technology's never are (OpenCivOne `UnitManagement.cs` `F0_1866_1931_FoundAncientWisdom`).
    new Action_1.default(new Criterion_1.default((goodyHut, unit) => playerResearchRegistry
        .getByPlayer(unit.player())
        .available()
        .some((AvailableAdvance) => !AvailableAdvance.repeatable)), new Effect_1.default((goodyHut, unit) => new GoodyHuts_1.Advance(goodyHut, unit))),
    new Action_1.default(new Criterion_1.default((goodyHut) => [Terrains_1.Grassland, Terrains_1.Plains, Terrains_1.River].some((TerrainType) => goodyHut.tile().terrain() instanceof TerrainType)), new Criterion_1.default((goodyHut, unit) => goodyHut
        .tile()
        .getSurroundingArea()
        .score(null, [
        [Food_1.default, 8],
        [Production_1.default, 3],
        [Trade_1.default, 1],
    ]) >= 150), new Criterion_1.default((goodyHut) => goodyHut
        .tile()
        .getSurroundingArea(4)
        .every((tile) => cityRegistry.getByTile(tile) === null)), new Effect_1.default((goodyHut, unit) => new GoodyHuts_1.City(goodyHut, unit))),
    new Action_1.default(new Effect_1.default((goodyHut, unit) => new GoodyHuts_1.Gold(goodyHut, unit))),
    // v474.05's fourth outcome: barbarians, or mercenaries near a city or before the player has one
    //  (civ-clone/web-renderer#172).
    new Action_1.default(new Effect_1.default((goodyHut, unit) => (0, exports.unleashesBarbarians)(goodyHut, unit, cityRegistry)
        ? new GoodyHuts_1.Barbarians(goodyHut, unit, ruleRegistry)
        : new GoodyHuts_1.Unit(goodyHut, unit))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=action.js.map