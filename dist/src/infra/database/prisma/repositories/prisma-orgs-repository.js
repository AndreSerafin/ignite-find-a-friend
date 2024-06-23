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
exports.PrismaOrgsRepository = void 0;
const prisma_service_1 = require("../prisma.service");
const prisma_orgs_mapper_1 = require("../mappers/prisma-orgs-mapper");
const common_1 = require("@nestjs/common");
let PrismaOrgsRepository = class PrismaOrgsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(org) {
        const data = prisma_orgs_mapper_1.PrismaOrgMapper.toPrisma(org);
        await this.prisma.user.create({ data });
    }
    async findManyNearby({ latitude, longitude }, { page }) {
        const pageSize = 20;
        const offset = (page - 1) * pageSize;
        const orgs = await this.prisma.$queryRaw `
    SELECT * from users
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    LIMIT ${pageSize} OFFSET ${offset}
  `;
        return orgs.map((org) => prisma_orgs_mapper_1.PrismaOrgMapper.toDomain(org));
    }
};
exports.PrismaOrgsRepository = PrismaOrgsRepository;
exports.PrismaOrgsRepository = PrismaOrgsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaOrgsRepository);
//# sourceMappingURL=prisma-orgs-repository.js.map