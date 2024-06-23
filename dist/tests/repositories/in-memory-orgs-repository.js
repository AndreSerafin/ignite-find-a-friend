"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryOrgsRepository = void 0;
const get_distance_beetwen_coordinates_1 = require("../../src/domain/application/utils/get-distance-beetwen-coordinates");
class InMemoryOrgsRepository {
    items = [];
    async create(org) {
        this.items.push(org);
    }
    async findByEmail(email) {
        const org = this.items.find((item) => item.email === email);
        if (!org) {
            return null;
        }
        return org;
    }
    async findManyNearby(findManyNearbyParams, { page }) {
        const orgs = this.items
            .filter((item) => {
            const distance = (0, get_distance_beetwen_coordinates_1.getDistanceBetweenCoordinates)({
                latitude: findManyNearbyParams.latitude,
                longitude: findManyNearbyParams.longitude,
            }, {
                latitude: item.latitude,
                longitude: item.longitude,
            });
            return distance < 10;
        })
            .slice((page - 1) * 20, page * 20);
        return orgs;
    }
}
exports.InMemoryOrgsRepository = InMemoryOrgsRepository;
//# sourceMappingURL=in-memory-orgs-repository.js.map