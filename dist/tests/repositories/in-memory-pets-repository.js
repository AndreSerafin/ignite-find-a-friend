"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPetsRepository = void 0;
class InMemoryPetsRepository {
    items = [];
    async create(pet) {
        this.items.push(pet);
    }
    async findManyByOrgId(orgId, { page }, filterParams = {}) {
        const { age, breed, energyLevel, environment, search, size, specie } = filterParams;
        const filters = (item) => (age !== undefined ? item.age === age : true) &&
            (breed ? item.breed === breed : true) &&
            (energyLevel !== undefined ? item.energyLevel === energyLevel : true) &&
            (environment ? item.environment === environment : true) &&
            (search
                ? item.name.includes(search) || item.about.includes(search)
                : true) &&
            (size !== undefined ? item.size === size : true) &&
            (specie ? item.specie === specie : true);
        const pets = this.items
            .filter((item) => item.authorId.toString() === orgId)
            .filter(filters)
            .slice((page - 1) * 20, page * 20);
        return pets;
    }
    async getById(petId) {
        const pet = this.items.find((item) => item.id.toString() === petId);
        if (!pet) {
            return null;
        }
        return pet;
    }
}
exports.InMemoryPetsRepository = InMemoryPetsRepository;
//# sourceMappingURL=in-memory-pets-repository.js.map