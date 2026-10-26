import { Action, IAction } from '@civ-clone/core-goody-hut/Action';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import PlayerUnit from '@civ-clone/core-unit/Unit';
/**
 * "You have unleashed a horde of barbarians!" (civ-clone/web-renderer#172). The horde itself is the barbarians' to
 * raise: `civ1-barbarians` registers the `Barbarians` rule that spawns it, so a game without barbarians gets nothing.
 */
export declare class Barbarians extends Action implements IAction {
  static readonly transient: string[];
  private _ruleRegistry;
  constructor(
    goodyHut: GoodyHut,
    unit: PlayerUnit,
    ruleRegistry?: RuleRegistry
  );
  perform(): void;
}
export default Barbarians;
