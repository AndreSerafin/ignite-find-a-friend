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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountContoller = void 0;
const create_org_1 = require("../../../../domain/application/use-cases/org/create-org");
const common_1 = require("@nestjs/common");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const zod_1 = require("zod");
const org_already_exists_error_1 = require("../../../../domain/application/use-cases/org/errors/org-already-exists-error");
const createAccountBodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    whatsapp: zod_1.z.string(),
    authorName: zod_1.z.string(),
    cep: zod_1.z.string(),
    state: zod_1.z.string(),
    city: zod_1.z.string(),
    neighborhood: zod_1.z.string(),
    street: zod_1.z.string(),
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number(),
});
let CreateAccountContoller = class CreateAccountContoller {
    registerOrg;
    constructor(registerOrg) {
        this.registerOrg = registerOrg;
    }
    async handle(body) {
        const data = body;
        const result = await this.registerOrg.execute(data);
        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case org_already_exists_error_1.OrgAlreadyExistsError:
                    throw new common_1.ConflictException(error.message);
                default:
                    throw new common_1.BadRequestException(error.message);
            }
        }
    }
};
exports.CreateAccountContoller = CreateAccountContoller;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(createAccountBodySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateAccountContoller.prototype, "handle", null);
exports.CreateAccountContoller = CreateAccountContoller = __decorate([
    (0, common_1.Controller)('/accounts'),
    __metadata("design:paramtypes", [create_org_1.RegisterOrgUseCase])
], CreateAccountContoller);
//# sourceMappingURL=create-account.controller.js.map