import {
  GoodyHutRegistry,
  instance as goodyHutRegistryInstance,
} from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Unit from '@civ-clone/core-unit/Unit';
import Moved from '@civ-clone/core-unit/Rules/Moved';

export const getRules: (goodyHutRegistry?: GoodyHutRegistry) => Moved[] = (
  goodyHutRegistry: GoodyHutRegistry = goodyHutRegistryInstance
): Moved[] => [
  new Moved(
    new Criterion(
      (unit: Unit): boolean =>
        goodyHutRegistry.getByTile(unit.tile()).length > 0
    ),
    new Effect((unit): void => {
      const [goodyHut] = goodyHutRegistry.getByTile(unit.tile());

      goodyHut.process(unit);
    })
  ),
];

export default getRules;
