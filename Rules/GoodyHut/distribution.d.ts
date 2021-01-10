import { GoodyHutRegistry } from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import Distribution from '@civ-clone/core-goody-hut/Rules/Distribution';
export declare const getRules: (
  goodyHutRegistry?: GoodyHutRegistry,
  randomNumberGenerator?: () => number
) => Distribution[];
export default getRules;
