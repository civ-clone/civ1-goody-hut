import { Advance, Barbarians, City, Gold, Unit } from '../../GoodyHuts';
import {
  CityRegistry,
  instance as cityRegistryInstance,
} from '@civ-clone/core-city/CityRegistry';
import { Grassland, Plains, River } from '@civ-clone/civ1-world/Terrains';
import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import Action from '@civ-clone/core-goody-hut/Rules/Action';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Food from '@civ-clone/base-terrain-yield-food/Food';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import PlayerUnit from '@civ-clone/core-unit/Unit';
import Production from '@civ-clone/base-terrain-yield-production/Production';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Terrain from '@civ-clone/core-terrain/Terrain';
import Trade from '@civ-clone/base-terrain-yield-trade/Trade';

// No city of any civilization is nearer than this to a hut that unleashes barbarians.
export const BARBARIANS_FROM_CITIES = 4;

/**
 * Whether a hut unleashes barbarians rather than mercenaries: v474.05's fourth outcome does when the player has a
 * city and no city of anyone's is within 4 squares (OpenCiv1 `Segment_1866`, 0x1b88).
 */
export const unleashesBarbarians = (
  goodyHut: GoodyHut,
  unit: PlayerUnit,
  cityRegistry: Pick<CityRegistry, 'entries' | 'getByPlayer'>
): boolean =>
  cityRegistry.getByPlayer(unit.player()).length > 0 &&
  cityRegistry
    .entries()
    .every(
      (city): boolean =>
        city.destroyed() ||
        city.tile().distanceFrom(goodyHut.tile()) >= BARBARIANS_FROM_CITIES
    );

export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry,
  cityRegistry?: CityRegistry,
  ruleRegistry?: RuleRegistry
) => Action[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  cityRegistry: CityRegistry = cityRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): Action[] => [
  // TODO: Have an action for when there are no actions ("The hut is long abandoned...")
  // Never a repeatable advance (Future Technology): v474.05 only offers an advance whose prerequisites are known, and
  //  a Future Technology's never are (OpenCivOne `UnitManagement.cs` `F0_1866_1931_FoundAncientWisdom`).
  new Action(
    new Criterion((goodyHut: GoodyHut, unit: PlayerUnit): boolean =>
      playerResearchRegistry
        .getByPlayer(unit.player())
        .available()
        .some((AvailableAdvance): boolean => !AvailableAdvance.repeatable)
    ),
    new Effect(
      (goodyHut: GoodyHut, unit: PlayerUnit) => new Advance(goodyHut, unit)
    )
  ),
  new Action(
    new Criterion((goodyHut) =>
      [Grassland, Plains, River].some(
        (TerrainType: typeof Terrain) =>
          goodyHut.tile().terrain() instanceof TerrainType
      )
    ),
    new Criterion(
      (goodyHut: GoodyHut, unit: PlayerUnit) =>
        goodyHut
          .tile()
          .getSurroundingArea()
          .score(null, [
            [Food, 8],
            [Production, 3],
            [Trade, 1],
          ]) >= 150
    ),
    new Criterion((goodyHut) =>
      goodyHut
        .tile()
        .getSurroundingArea(4)
        .every((tile) => cityRegistry.getByTile(tile) === null)
    ),
    new Effect(
      (goodyHut: GoodyHut, unit: PlayerUnit) => new City(goodyHut, unit)
    )
  ),
  new Action(
    new Effect(
      (goodyHut: GoodyHut, unit: PlayerUnit) => new Gold(goodyHut, unit)
    )
  ),
  // v474.05's fourth outcome: barbarians, or mercenaries near a city or before the player has one
  //  (civ-clone/web-renderer#172).
  new Action(
    new Effect((goodyHut: GoodyHut, unit: PlayerUnit) =>
      unleashesBarbarians(goodyHut, unit, cityRegistry)
        ? new Barbarians(goodyHut, unit, ruleRegistry)
        : new Unit(goodyHut, unit)
    )
  ),
];

export default getRules;
