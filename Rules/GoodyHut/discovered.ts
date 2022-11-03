import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import {
  GoodyHutRegistry,
  instance as goodyHutRegistryInstance,
} from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import Discovered from '@civ-clone/core-goody-hut/Rules/Discovered';
import Effect from '@civ-clone/core-rule/Effect';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import Unit from '@civ-clone/core-unit/Unit';

export const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  engine?: Engine,
  randomNumberGenerator?: () => number
) => Discovered[] = (
  goodyHutRegistry: GoodyHutRegistry = goodyHutRegistryInstance,
  engine: Engine = engineInstance,
  randomNumberGenerator: () => number = () => Math.random()
): Discovered[] => [
  new Discovered(
    new Effect((goodyHut: GoodyHut): void =>
      goodyHutRegistry.unregister(goodyHut)
    )
  ),
  new Discovered(
    new Effect((goodyHut: GoodyHut, unit: Unit): void => {
      const availableGoodyHutActions = goodyHut.actions(unit),
        randomAction =
          availableGoodyHutActions[
            Math.floor(
              availableGoodyHutActions.length * randomNumberGenerator()
            )
          ];

      goodyHut.action(randomAction);
    })
  ),
  new Discovered(
    new Effect((goodyHut: GoodyHut, unit: Unit): void => {
      engine.emit('goody-hut:discovered', goodyHut, unit);
    })
  ),
];

export default getRules;
