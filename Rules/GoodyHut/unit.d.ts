import { GoodyHutRegistry } from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import UnitRule from '@civ-clone/base-goody-hut-unit/Rules/Unit';
export declare const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  randomNumberGenerator?: () => number,
  ruleRegistry?: RuleRegistry
) => UnitRule[];
export default getRules;
