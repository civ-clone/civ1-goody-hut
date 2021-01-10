import { CityRegistry } from '@civ-clone/core-city/CityRegistry';
import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import Action from '@civ-clone/core-goody-hut/Rules/Action';
export declare const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry,
  cityRegistry?: CityRegistry
) => Action[];
export default getRules;
