import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import ActionPerformed from '@civ-clone/core-goody-hut/Rules/ActionPerformed';
import Effect from '@civ-clone/core-rule/Effect';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import Action from '@civ-clone/core-goody-hut/Action';

export const getRules: (engine?: Engine) => ActionPerformed[] = (
  engine: Engine = engineInstance
): ActionPerformed[] => [
  new ActionPerformed(
    new Effect((goodyHut: GoodyHut, action: Action): void => {
      engine.emit('goody-hut:action-performed', goodyHut, action);
    })
  ),
];

export default getRules;
