"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const common_1 = require("@nestjs/common");
const get_pet_controller_1 = require("./controllers/pet/get-pet.controller");
const create_account_controller_1 = require("./controllers/account/create-account.controller");
const create_org_1 = require("../../domain/application/use-cases/org/create-org");
const database_module_1 = require("../database/database.module");
let HttpModule = class HttpModule {
};
exports.HttpModule = HttpModule;
exports.HttpModule = HttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [get_pet_controller_1.GetPetContoller, create_account_controller_1.CreateAccountContoller],
        providers: [create_org_1.RegisterOrgUseCase],
    })
], HttpModule);
//# sourceMappingURL=http.module.js.map