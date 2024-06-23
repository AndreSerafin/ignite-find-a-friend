"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePetUseCase = void 0;
const pet_1 = require("../../../enterprise/entities/pet");
const unique_entity_id_1 = require("../../../../core/unique-entity-id");
const either_1 = require("../../../../core/either");
class CreatePetUseCase {
    petsRepository;
    constructor(petsRepository) {
        this.petsRepository = petsRepository;
    }
    async execute({ about, age, energyLevel, environment, name, authorId, size, specie, breed, }) {
        const pet = pet_1.Pet.create({
            about,
            age,
            energyLevel,
            environment,
            name,
            size,
            specie,
            breed,
            authorId: new unique_entity_id_1.UniqueEntityId(authorId),
        });
        await this.petsRepository.create(pet);
        return (0, either_1.right)({ pet });
    }
}
exports.CreatePetUseCase = CreatePetUseCase;
//# sourceMappingURL=create-pet.js.map