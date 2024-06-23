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
const create_account_controller_1 = require("./controllers/account/create-account.controller");
const register_org_1 = require("../../domain/application/use-cases/org/register-org");
const database_module_1 = require("../database/database.module");
const cryptography_module_1 = require("../cryptography/cryptography.module");
const authenticate_controller_1 = require("./controllers/session/authenticate.controller");
const authenticate_org_1 = require("../../domain/application/use-cases/org/authenticate-org");
const create_pet_controller_1 = require("./controllers/pet/create-pet.controller");
const create_pet_1 = require("../../domain/application/use-cases/pet/create-pet");
const fetch_pets_controller_1 = require("./controllers/pet/fetch-pets.controller");
const fetch_pets_1 = require("../../domain/application/use-cases/pet/fetch-pets");
const fetch_pets_by_org_id_1 = require("../../domain/application/use-cases/pet/fetch-pets-by-org-id");
const fetch_pets_by_org_id_controller_1 = require("./controllers/pet/fetch-pets-by-org-id.controller");
const edit_pet_controller_1 = require("./controllers/pet/edit-pet.controller");
const edit_pet_1 = require("../../domain/application/use-cases/pet/edit-pet");
let HttpModule = class HttpModule {
};
exports.HttpModule = HttpModule;
exports.HttpModule = HttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, cryptography_module_1.CryptographyModule],
        controllers: [
            create_account_controller_1.CreateAccountContoller,
            authenticate_controller_1.AuthenticateContoller,
            create_pet_controller_1.CreatePetContoller,
            fetch_pets_controller_1.FetchPetsContoller,
            fetch_pets_by_org_id_controller_1.FetchPetsByOrgIdContoller,
            edit_pet_controller_1.EditPetContoller,
        ],
        providers: [
            register_org_1.RegisterOrgUseCase,
            authenticate_org_1.AuthenticateOrgUseCase,
            create_pet_1.CreatePetUseCase,
            fetch_pets_1.FetchPetsUseCase,
            fetch_pets_by_org_id_1.FetchPetsByOrgIdUseCase,
            edit_pet_1.EditPetUseCase,
        ],
    })
], HttpModule);
//# sourceMappingURL=http.module.js.map