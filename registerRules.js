"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./Rules/GoodyHut/action");
const action_performed_1 = require("./Rules/GoodyHut/action-performed");
const discovered_1 = require("./Rules/GoodyHut/discovered");
const distribution_1 = require("./Rules/GoodyHut/distribution");
const unit_1 = require("./Rules/GoodyHut/unit");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const moved_1 = require("./Rules/Unit/moved");
const built_1 = require("./Rules/World/built");
RuleRegistry_1.instance.register(...(0, action_1.default)(), ...(0, action_performed_1.default)(), ...(0, discovered_1.default)(), ...(0, distribution_1.default)(), ...(0, unit_1.default)(), ...(0, moved_1.default)(), ...(0, built_1.default)());
//# sourceMappingURL=registerRules.js.map