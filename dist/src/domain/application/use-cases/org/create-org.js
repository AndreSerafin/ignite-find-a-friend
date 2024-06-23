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
exports.RegisterOrgUseCase = void 0;
const org_1 = require("../../../enterprise/entities/org");
const orgs_repository_1 = require("../../repositories/orgs-repository");
const either_1 = require("../../../../core/either");
const common_1 = require("@nestjs/common");
const org_already_exists_error_1 = require("./errors/org-already-exists-error");
const hash_generator_1 = require("../../../cryptography/hash-generator");
let RegisterOrgUseCase = class RegisterOrgUseCase {
    orgsRepository;
    hashGenerator;
    constructor(orgsRepository, hashGenerator) {
        this.orgsRepository = orgsRepository;
        this.hashGenerator = hashGenerator;
    }
    async execute({ email, password, ...request }) {
        const orgWithSameEmail = await this.orgsRepository.findByEmail(email);
        if (orgWithSameEmail) {
            return (0, either_1.left)(new org_already_exists_error_1.OrgAlreadyExistsError(email));
        }
        const hashedPassword = await this.hashGenerator.hash(password);
        const org = org_1.Org.create({ ...request, email, password: hashedPassword });
        await this.orgsRepository.create(org);
        return (0, either_1.right)({ org });
    }
};
exports.RegisterOrgUseCase = RegisterOrgUseCase;
exports.RegisterOrgUseCase = RegisterOrgUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orgs_repository_1.OrgsRepository,
        hash_generator_1.HashGenerator])
], RegisterOrgUseCase);
//# sourceMappingURL=create-org.js.map