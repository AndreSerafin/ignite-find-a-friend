"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOrg = makeOrg;
const org_1 = require("../../src/domain/enterprise/entities/org");
const faker_1 = require("@faker-js/faker");
function makeOrg(override = {}, id) {
    const org = org_1.Org.create({
        address: faker_1.faker.location.streetAddress(),
        authorName: faker_1.faker.person.fullName(),
        name: faker_1.faker.company.name(),
        cep: faker_1.faker.location.zipCode(),
        city: faker_1.faker.location.city(),
        latitude: faker_1.faker.location.latitude(),
        longitude: faker_1.faker.location.longitude(),
        neighborhood: faker_1.faker.lorem.word(),
        state: faker_1.faker.location.state(),
        street: faker_1.faker.location.street(),
        whatsapp: faker_1.faker.phone.number(),
        ...override,
    }, id);
    return org;
}
//# sourceMappingURL=make-org.js.map