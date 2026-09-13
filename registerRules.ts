import goodyHutAction from './Rules/GoodyHut/action';
import goodyHutActionPerformed from './Rules/GoodyHut/action-performed';
import goodyHutDiscovered from './Rules/GoodyHut/discovered';
import goodyHutDistribution from './Rules/GoodyHut/distribution';
import goodyHutUnit from './Rules/GoodyHut/unit';
import unitMoved from './Rules/Unit/moved';
import worldBuilt from './Rules/World/built';
import { Game, defaultGame } from '@civ-clone/core-game';

export const register = (game: Game): void =>
  game.rules.register(
    ...goodyHutAction(game.playerResearch, game.cities),
    ...goodyHutActionPerformed(game.engine),
    ...goodyHutDiscovered(game.goodyHuts, game.engine, game.rng),
    ...goodyHutDistribution(game.goodyHuts, game.rng),
    ...goodyHutUnit(game.goodyHuts, game.rng, game.rules),
    ...unitMoved(game.goodyHuts),
    ...worldBuilt(game.goodyHuts, game.rules)
  );

// The plugin loader imports each package for this side effect. Until it passes
// a `Game` of its own, dropping it would produce a game with silently absent
// rules — no error, just wrong behaviour.
register(defaultGame);

export default register;
