import goodyHutAction from './Rules/GoodyHut/action';
import goodyHutActionPerformed from './Rules/GoodyHut/action-performed';
import goodyHutDiscovered from './Rules/GoodyHut/discovered';
import goodyHutDistribution from './Rules/GoodyHut/distribution';
import goodyHutUnit from './Rules/GoodyHut/unit';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import unitMoved from './Rules/Unit/moved';
import worldBuilt from './Rules/World/built';

ruleRegistryInstance.register(
  ...goodyHutAction(),
  ...goodyHutActionPerformed(),
  ...goodyHutDiscovered(),
  ...goodyHutDistribution(),
  ...goodyHutUnit(),
  ...unitMoved(),
  ...worldBuilt()
);
