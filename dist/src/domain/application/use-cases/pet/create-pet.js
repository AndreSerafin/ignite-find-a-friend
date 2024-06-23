"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePetUseCase = void 0;
const pet_1 = require("../../../enterprise/entities/pet");
const unique_entity_id_1 = require("../../../../core/unique-entity-id");
const pets_repository_1 = require("../../repositories/pets-repository");
const either_1 = require("../../../../core/either");
const common_1 = require("@nestjs/common");
let CreatePetUseCase = class CreatePetUseCase {
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
};
exports.CreatePetUseCase = CreatePetUseCase;
exports.CreatePetUseCase = CreatePetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pets_repository_1.PetsRepository])
], CreatePetUseCase);
//# sourceMappingURL=create-pet.js.map