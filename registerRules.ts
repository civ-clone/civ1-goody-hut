import actionPerformed from './Rules/GoodyHut/action-performed';
import discovered from './Rules/GoodyHut/discovered';
import distribution from './Rules/GoodyHut/distribution';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import unitMoved from './Rules/Unit/moved';
import worldBuilt from './Rules/World/built';

ruleRegistryInstance.register(
  ...actionPerformed(),
  ...discovered(),
  ...distribution(),
  ...unitMoved(),
  ...worldBuilt()
);
