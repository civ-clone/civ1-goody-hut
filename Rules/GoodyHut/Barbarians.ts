import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import PlayerUnit from '@civ-clone/core-unit/Unit';
import Rule from '@civ-clone/core-rule/Rule';

// The horde a goody hut unleashes: the hut, and the unit that entered it.
export class Barbarians extends Rule<[GoodyHut, PlayerUnit], void> {}

export default Barbarians;
