"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchPetsByOrgIdUseCase = void 0;
const either_1 = require("../../../../core/either");
class FetchPetsByOrgIdUseCase {
    petsRepository;
    constructor(petsRepository) {
        this.petsRepository = petsRepository;
    }
    async execute({ orgId, page, filterParams, }) {
        const pets = await this.petsRepository.findManyByOrgId(orgId, { page }, filterParams);
        return (0, either_1.right)({ pets });
    }
}
exports.FetchPetsByOrgIdUseCase = FetchPetsByOrgIdUseCase;
//# sourceMappingURL=fetch-pets-by-org-id.js.map