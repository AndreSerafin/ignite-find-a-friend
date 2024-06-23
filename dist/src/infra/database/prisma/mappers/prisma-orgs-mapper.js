"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaOrgMapper = void 0;
const unique_entity_id_1 = require("../../../../core/unique-entity-id");
const org_1 = require("../../../../domain/enterprise/entities/org");
class PrismaOrgMapper {
    static toDomain(raw) {
        return org_1.Org.create({
            address: raw.address,
            authorName: raw.authorName,
            cep: raw.cep,
            city: raw.city,
            email: raw.email,
            latitude: raw.latitude.toNumber(),
            longitude: raw.longitude.toNumber(),
            name: raw.name,
            neighborhood: raw.neighborhood,
            password: raw.password,
            state: raw.state,
            street: raw.street,
            whatsapp: raw.whatsapp,
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
    static toPrisma(org) {
        return {
            id: org.id.toString(),
            address: org.address,
            authorName: org.authorName,
            cep: org.cep,
            city: org.city,
            email: org.email,
            latitude: org.latitude,
            longitude: org.longitude,
            name: org.name,
            neighborhood: org.neighborhood,
            password: org.password,
            state: org.state,
            street: org.street,
            whatsapp: org.whatsapp,
        };
    }
}
exports.PrismaOrgMapper = PrismaOrgMapper;
//# sourceMappingURL=prisma-orgs-mapper.js.map