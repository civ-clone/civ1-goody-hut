"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_performed_1 = require("./Rules/GoodyHut/action-performed");
const discovered_1 = require("./Rules/GoodyHut/discovered");
const distribution_1 = require("./Rules/GoodyHut/distribution");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const moved_1 = require("./Rules/Unit/moved");
const built_1 = require("./Rules/World/built");
RuleRegistry_1.instance.register(...action_performed_1.default(), ...discovered_1.default(), ...distribution_1.default(), ...moved_1.default(), ...built_1.default());
//# sourceMappingURL=registerRules.js.map