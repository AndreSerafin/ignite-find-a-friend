"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPetByIdUseCase = void 0;
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const either_1 = require("../../../../core/either");
class GetPetByIdUseCase {
    petsRepository;
    constructor(petsRepository) {
        this.petsRepository = petsRepository;
    }
    async execute({ petId, }) {
        const pet = await this.petsRepository.findById(petId);
        if (!pet) {
            return (0, either_1.left)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        return (0, either_1.right)({ pet });
    }
}
exports.GetPetByIdUseCase = GetPetByIdUseCase;
//# sourceMappingURL=get-pet-by-id.js.map