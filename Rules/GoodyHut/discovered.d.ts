import { Engine } from '@civ-clone/core-engine/Engine';
import { GoodyHutRegistry } from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import Discovered from '@civ-clone/core-goody-hut/Rules/Discovered';
export declare const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  engine?: Engine,
  randomNumberGenerator?: () => number
) => Discovered[];
export default getRules;
