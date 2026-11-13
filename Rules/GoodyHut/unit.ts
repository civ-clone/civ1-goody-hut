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
import UnitRule from '@civ-clone/base-goody-hut-unit/Rules/Unit';
import { instance as rngInstance } from '@civ-clone/core-random';
import { randomUnit } from '@civ-clone/base-goody-hut/lib/outcomes';

export const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  randomNumberGenerator?: () => number,
  ruleRegistry?: RuleRegistry
) => UnitRule[] = (
  goodyHutRegistry: GoodyHutRegistry = goodyHutRegistryInstance,
  randomNumberGenerator: () => number = rngInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): UnitRule[] => [
  // TODO: detect nearby city, same as civ1
  // https://forums.civfanatics.com/threads/when-do-bribed-units-become-owned.648334/#post-15510296
  new UnitRule(
    new Effect(
      randomUnit([Horseman, Swordman], randomNumberGenerator, ruleRegistry)
    )
  ),
];

export default getRules;
