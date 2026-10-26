import { CityRegistry } from '@civ-clone/core-city/CityRegistry';
import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import Action from '@civ-clone/core-goody-hut/Rules/Action';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import PlayerUnit from '@civ-clone/core-unit/Unit';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
export declare const BARBARIANS_FROM_CITIES = 4;
/**
 * Whether a hut unleashes barbarians rather than mercenaries: v474.05's fourth outcome does when the player has a
 * city and no city of anyone's is within 4 squares (OpenCiv1 `Segment_1866`, 0x1b88).
 */
export declare const unleashesBarbarians: (
  goodyHut: GoodyHut,
  unit: PlayerUnit,
  cityRegistry: Pick<CityRegistry, 'entries' | 'getByPlayer'>
) => boolean;
export declare const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry,
  cityRegistry?: CityRegistry,
  ruleRegistry?: RuleRegistry
) => Action[];
export default getRules;
