import { GoodyHutRegistry } from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Built from '@civ-clone/core-world/Rules/Built';
export declare const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  ruleRegistry?: RuleRegistry
) => Built[];
export default getRules;
