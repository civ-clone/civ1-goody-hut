import {
  GoodyHutRegistry,
  instance as goodyHutRegistryInstance,
} from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import { Horseman, Swordman } from '@civ-clone/civ1-unit/Units';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Effect from '@civ-clone/core-rule/Effect';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import Unit from '@civ-clone/core-unit/Unit';
import UnitRule from '@civ-clone/base-goody-hut-unit/Rules/Unit';

export const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  randomNumberGenerator?: () => number,
  ruleRegistry?: RuleRegistry
) => UnitRule[] = (
  goodyHutRegistry: GoodyHutRegistry = goodyHutRegistryInstance,
  randomNumberGenerator: () => number = (): number => Math.random(),
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): UnitRule[] => [
  new UnitRule(
    new Effect((goodyHut: GoodyHut, unit: Unit): Unit => {
      const availableUnits = [Horseman, Swordman],
        RandomUnit =
          availableUnits[
            Math.floor(availableUnits.length * randomNumberGenerator())
          ];

      // TODO: detect nearby city, same as civ1
      // https://forums.civfanatics.com/threads/when-do-bribed-units-become-owned.648334/#post-15510296
      return new RandomUnit(null, unit.player(), unit.tile(), ruleRegistry);
    })
  ),
];

export default getRules;
