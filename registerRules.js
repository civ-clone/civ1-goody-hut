"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const action_1 = require("./Rules/GoodyHut/action");
const action_performed_1 = require("./Rules/GoodyHut/action-performed");
const discovered_1 = require("./Rules/GoodyHut/discovered");
const distribution_1 = require("./Rules/GoodyHut/distribution");
const unit_1 = require("./Rules/GoodyHut/unit");
const moved_1 = require("./Rules/Unit/moved");
const built_1 = require("./Rules/World/built");
const core_game_1 = require("@civ-clone/core-game");
const register = (game) => game.rules.register(...(0, action_1.default)(game.playerResearch, game.cities), ...(0, action_performed_1.default)(game.engine), ...(0, discovered_1.default)(game.goodyHuts, game.engine, game.rng), ...(0, distribution_1.default)(game.goodyHuts, game.rng), ...(0, unit_1.default)(game.goodyHuts, game.rng, game.rules), ...(0, moved_1.default)(game.goodyHuts), ...(0, built_1.default)(game.goodyHuts, game.rules));
exports.register = register;
// The plugin loader imports each package for this side effect. Until it passes
// a `Game` of its own, dropping it would produce a game with silently absent
// rules — no error, just wrong behaviour.
(0, exports.register)(core_game_1.defaultGame);
exports.default = exports.register;
//# sourceMappingURL=registerRules.js.map