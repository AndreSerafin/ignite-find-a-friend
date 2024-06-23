"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrgUseCase = void 0;
const org_1 = require("../../../enterprise/entities/org");
const either_1 = require("../../../../core/either");
class CreateOrgUseCase {
    orgsRepository;
    constructor(orgsRepository) {
        this.orgsRepository = orgsRepository;
    }
    async execute(request) {
        const org = org_1.Org.create(request);
        await this.orgsRepository.create(org);
        return (0, either_1.right)({ org });
    }
}
exports.CreateOrgUseCase = CreateOrgUseCase;
//# sourceMappingURL=create-org.js.map