"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barbarians = void 0;
const Action_1 = require("@civ-clone/core-goody-hut/Action");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Barbarians_1 = require("./Rules/GoodyHut/Barbarians");
/**
 * "You have unleashed a horde of barbarians!" (civ-clone/web-renderer#172). The horde itself is the barbarians' to
 * raise: `civ1-barbarians` registers the `Barbarians` rule that spawns it, so a game without barbarians gets nothing.
 */
class Barbarians extends Action_1.Action {
    constructor(goodyHut, unit, ruleRegistry = RuleRegistry_1.instance) {
        super(goodyHut, unit);
        this._ruleRegistry = ruleRegistry;
    }
    perform() {
        this._ruleRegistry.process(Barbarians_1.default, this.goodyHut(), this.unit());
    }
}
exports.Barbarians = Barbarians;
Barbarians.transient = ['_ruleRegistry'];
exports.default = Barbarians;
//# sourceMappingURL=Barbarians.js.map