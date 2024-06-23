"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePet = makePet;
const unique_entity_id_1 = require("../../src/core/unique-entity-id");
const pet_1 = require("../../src/domain/enterprise/entities/pet");
const faker_1 = require("@faker-js/faker");
function makePet(override = {}, id) {
    const pet = pet_1.Pet.create({
        authorId: new unique_entity_id_1.UniqueEntityId(),
        age: faker_1.faker.number.int({ min: 0, max: 20 }),
        about: faker_1.faker.lorem.paragraph(1),
        breed: faker_1.faker.lorem.word(),
        energyLevel: faker_1.faker.number.int({ min: 0, max: 5 }),
        environment: faker_1.faker.lorem.word(),
        name: faker_1.faker.animal.dog.name,
        size: faker_1.faker.number.int({ min: 0, max: 3 }),
        specie: 'Dog',
        ...override,
    }, id);
    return pet;
}
//# sourceMappingURL=make-pet.js.map