import {
  GoodyHutRegistry,
  instance as goodyHutRegistryInstance,
} from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Built from '@civ-clone/core-world/Rules/Built';
import Effect from '@civ-clone/core-rule/Effect';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import Tile from '@civ-clone/core-world/Tile';
import World from '@civ-clone/core-world/World';
import Distribution from '@civ-clone/core-goody-hut/Rules/Distribution';

export const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  ruleRegistry?: RuleRegistry
) => Built[] = (
  goodyHutRegistry: GoodyHutRegistry = goodyHutRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): Built[] => [
  new Built(
    new Effect((world: World): void => {
      const goodyHutRules = ruleRegistry.get(Distribution);

      world.forEach((tile: Tile): void => {
        if (
          goodyHutRules.every((rule: Distribution): boolean =>
            rule.validate(tile)
          )
        ) {
          goodyHutRegistry.register(new GoodyHut(tile));
        }
      });
    })
  ),
];

export default getRules;
