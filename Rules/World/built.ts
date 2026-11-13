import {
  GoodyHutRegistry,
  instance as goodyHutRegistryInstance,
} from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Built from '@civ-clone/core-world/Rules/Built';
import Effect from '@civ-clone/core-rule/Effect';
import { distributeHuts } from '@civ-clone/base-goody-hut/lib/placement';

export const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  ruleRegistry?: RuleRegistry
) => Built[] = (
  goodyHutRegistry: GoodyHutRegistry = goodyHutRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): Built[] => [
  new Built(new Effect(distributeHuts(goodyHutRegistry, ruleRegistry))),
];

export default getRules;
