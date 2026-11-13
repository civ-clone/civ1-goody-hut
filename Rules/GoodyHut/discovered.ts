import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import {
  GoodyHutRegistry,
  instance as goodyHutRegistryInstance,
} from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import {
  emitHutDiscovered,
  performRandomAction,
  removeHut,
} from '@civ-clone/base-goody-hut/lib/entering';
import Discovered from '@civ-clone/core-goody-hut/Rules/Discovered';
import Effect from '@civ-clone/core-rule/Effect';
import { instance as rngInstance } from '@civ-clone/core-random';

export const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  engine?: Engine,
  randomNumberGenerator?: () => number
) => Discovered[] = (
  goodyHutRegistry: GoodyHutRegistry = goodyHutRegistryInstance,
  engine: Engine = engineInstance,
  randomNumberGenerator: () => number = rngInstance
): Discovered[] => [
  new Discovered(new Effect(removeHut(goodyHutRegistry))),
  new Discovered(new Effect(performRandomAction(randomNumberGenerator))),
  new Discovered(new Effect(emitHutDiscovered(engine))),
];

export default getRules;
