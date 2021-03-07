import {
  GoodyHutRegistry,
  instance as goodyHutRegistryInstance,
} from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import Criterion from '@civ-clone/core-rule/Criterion';
import Distribution from '@civ-clone/core-goody-hut/Rules/Distribution';
import Tile from '@civ-clone/core-world/Tile';

export const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  randomNumberGenerator?: () => number
) => Distribution[] = (
  goodyHutRegistry: GoodyHutRegistry = goodyHutRegistryInstance,
  randomNumberGenerator: () => number = () => Math.random()
): Distribution[] => [
  new Distribution(new Criterion((tile: Tile): boolean => tile.isLand())),
  new Distribution(
    new Criterion((tile: Tile): boolean =>
      tile
        .getSurroundingArea(3)
        .every(
          (tile: Tile): boolean => goodyHutRegistry.getByTile(tile) === null
        )
    )
  ),
  new Distribution(
    new Criterion((): boolean => randomNumberGenerator() < 0.05)
  ),
];

export default getRules;
