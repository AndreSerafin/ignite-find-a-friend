"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityId = void 0;
const node_crypto_1 = require("node:crypto");
class UniqueEntityId {
    value;
    constructor(value) {
        this.value = value ?? (0, node_crypto_1.randomUUID)();
    }
    toString() {
        return this.value;
    }
    toValue() {
        return this.value;
    }
    equals(id) {
        return id.value === this.value;
    }
}
exports.UniqueEntityId = UniqueEntityId;
//# sourceMappingURL=unique-entity-id.js.map