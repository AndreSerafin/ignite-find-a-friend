"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchOrgsNearbyIdUseCase = void 0;
const either_1 = require("../../../../core/either");
class FetchOrgsNearbyIdUseCase {
    orgsRepository;
    constructor(orgsRepository) {
        this.orgsRepository = orgsRepository;
    }
    async execute({ currentLatitude, currentLongitude, page, }) {
        const orgs = await this.orgsRepository.findManyNearby({
            latitude: currentLatitude,
            longitude: currentLongitude,
        }, { page });
        return (0, either_1.right)({ orgs });
    }
}
exports.FetchOrgsNearbyIdUseCase = FetchOrgsNearbyIdUseCase;
//# sourceMappingURL=fetch-orgs-nearby.js.map