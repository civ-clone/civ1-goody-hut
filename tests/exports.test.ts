import * as GoodyHuts from '../GoodyHuts';
import BarbariansAction, {
  Barbarians as BarbariansActionNamed,
} from '../Barbarians';
import BarbariansRule, {
  Barbarians as BarbariansRuleNamed,
} from '../Rules/GoodyHut/Barbarians';
import { Barbarians as BaseBarbarians } from '@civ-clone/base-goody-hut-barbarians/Barbarians';
import { Barbarians as BaseBarbariansRule } from '@civ-clone/base-goody-hut-barbarians/Rules/Barbarians';
import { Gold } from '@civ-clone/base-goody-hut-gold/Gold';
import { expect } from 'chai';

// Re-exports, not copies: `civ1-barbarians` registers its horde on the rule class it imports from here, and the
//  action processes the one it imports from the base package, so they must be the same object.
describe('civ1-goody-hut exports', (): void => {
  it('re-exports the Barbarians action and rule', (): void => {
    expect(BarbariansAction).equal(BaseBarbarians);
    expect(BarbariansActionNamed).equal(BaseBarbarians);
    expect(GoodyHuts.Barbarians).equal(BaseBarbarians);
    expect(BarbariansRule).equal(BaseBarbariansRule);
    expect(BarbariansRuleNamed).equal(BaseBarbariansRule);
  });

  it('re-exports the goody-hut outcomes', (): void => {
    expect(GoodyHuts.Gold).equal(Gold);
    expect(Object.keys(GoodyHuts)).eql([
      'Advance',
      'Barbarians',
      'City',
      'Gold',
      'Unit',
    ]);
  });
});
