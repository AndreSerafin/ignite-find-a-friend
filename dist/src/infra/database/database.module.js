"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const orgs_repository_1 = require("../../domain/application/repositories/orgs-repository");
const prisma_orgs_repository_1 = require("./prisma/repositories/prisma-orgs-repository");
const pets_repository_1 = require("../../domain/application/repositories/pets-repository");
const prisma_pets_repository_1 = require("./prisma/repositories/prisma-pets-repository");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            prisma_service_1.PrismaService,
            { provide: orgs_repository_1.OrgsRepository, useClass: prisma_orgs_repository_1.PrismaOrgsRepository },
            { provide: pets_repository_1.PetsRepository, useClass: prisma_pets_repository_1.PrismaPetsRepository },
        ],
        exports: [prisma_service_1.PrismaService, orgs_repository_1.OrgsRepository, pets_repository_1.PetsRepository],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map