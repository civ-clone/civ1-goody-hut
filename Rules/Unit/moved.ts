import {
  GoodyHutRegistry,
  instance as goodyHutRegistryInstance,
} from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Unit from '@civ-clone/core-unit/Unit';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import isBarbarian from '@civ-clone/base-civilization-barbarian/isBarbarian';

export const getRules: (goodyHutRegistry?: GoodyHutRegistry) => Moved[] = (
  goodyHutRegistry: GoodyHutRegistry = goodyHutRegistryInstance
): Moved[] => [
  new Moved(
    // Barbarians don't open huts (civ-clone/web-renderer#169).
    new Criterion((unit: Unit): boolean => !isBarbarian(unit.player())),
    new Criterion(
      (unit: Unit): boolean => goodyHutRegistry.getByTile(unit.tile()) !== null
    ),
    new Effect((unit): void => {
      const goodyHut = goodyHutRegistry.getByTile(unit.tile());

      (goodyHut as GoodyHut).process(unit);
    })
  ),
];

export default getRules;
