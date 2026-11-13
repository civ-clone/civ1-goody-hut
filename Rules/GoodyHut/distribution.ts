import {
  GoodyHutRegistry,
  instance as goodyHutRegistryInstance,
} from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import {
  chance,
  noHutWithin,
  onLand,
} from '@civ-clone/base-goody-hut/lib/placement';
import Criterion from '@civ-clone/core-rule/Criterion';
import Distribution from '@civ-clone/core-goody-hut/Rules/Distribution';
import { instance as rngInstance } from '@civ-clone/core-random';

// A hut on 1 in 20 land squares, no nearer than 3 to another.
export const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  randomNumberGenerator?: () => number
) => Distribution[] = (
  goodyHutRegistry: GoodyHutRegistry = goodyHutRegistryInstance,
  randomNumberGenerator: () => number = rngInstance
): Distribution[] => [
  new Distribution(new Criterion(onLand)),
  new Distribution(new Criterion(noHutWithin(3, goodyHutRegistry))),
  new Distribution(new Criterion(chance(0.05, randomNumberGenerator))),
];

export default getRules;
