import action from './Rules/GoodyHut/action';
import actionPerformed from './Rules/GoodyHut/action-performed';
import discovered from './Rules/GoodyHut/discovered';
import distribution from './Rules/GoodyHut/distribution';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import unit from './Rules/GoodyHut/unit';
import unitMoved from './Rules/Unit/moved';
import worldBuilt from './Rules/World/built';

ruleRegistryInstance.register(
  ...action(),
  ...actionPerformed(),
  ...discovered(),
  ...distribution(),
  ...unit(),
  ...unitMoved(),
  ...worldBuilt()
);
