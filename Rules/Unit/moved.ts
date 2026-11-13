import {
  GoodyHutRegistry,
  instance as goodyHutRegistryInstance,
} from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import { enterHut, onHut } from '@civ-clone/base-goody-hut/lib/entering';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import Unit from '@civ-clone/core-unit/Unit';
import isBarbarian from '@civ-clone/base-civilization-barbarian/isBarbarian';

export const getRules: (goodyHutRegistry?: GoodyHutRegistry) => Moved[] = (
  goodyHutRegistry: GoodyHutRegistry = goodyHutRegistryInstance
): Moved[] => [
  new Moved(
    // Barbarians don't open huts (civ-clone/web-renderer#169).
    new Criterion((unit: Unit): boolean => !isBarbarian(unit.player())),
    new Criterion(onHut(goodyHutRegistry)),
    new Effect(enterHut(goodyHutRegistry))
  ),
];

export default getRules;
