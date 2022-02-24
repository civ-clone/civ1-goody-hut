import { Advance, City, Gold, Unit } from '../../GoodyHuts';
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
import Terrain from '@civ-clone/core-terrain/Terrain';
import Trade from '@civ-clone/base-terrain-yield-trade/Trade';

export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry,
  cityRegistry?: CityRegistry
) => Action[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  cityRegistry: CityRegistry = cityRegistryInstance
): Action[] => [
  // TODO: Have an action for when there are no actions ("The hut is long abandoned...")
  new Action(
    new Criterion(
      (goodyHut: GoodyHut, unit: PlayerUnit): boolean =>
        playerResearchRegistry.getByPlayer(unit.player()).available().length > 0
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
          .score(unit.player(), [
            [Food, 4],
            [Production, 2],
            [Trade, 1],
          ]) >= 120
    ),
    new Criterion((goodyHut) =>
      goodyHut
        .tile()
        .getSurroundingArea(4)
        .every((tile) => cityRegistry.getByTile(tile).length === 0)
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
  new Action(
    new Effect(
      (goodyHut: GoodyHut, unit: PlayerUnit) => new Unit(goodyHut, unit)
    )
  ),
];

export default getRules;
