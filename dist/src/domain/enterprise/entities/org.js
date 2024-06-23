"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Org = void 0;
const entity_1 = require("../../../core/entity");
class Org extends entity_1.Entity {
    static create(props, id) {
        const org = new Org({ ...props, createdAt: props.createdAt ?? new Date() }, id);
        return org;
    }
    get name() {
        return this.props.name;
    }
    set name(name) {
        this.props.name = name;
        this.touch();
    }
    get address() {
        return this.props.address;
    }
    set address(address) {
        this.props.address = address;
        this.touch();
    }
    get whatsapp() {
        return this.props.whatsapp;
    }
    set whatsapp(whatsapp) {
        this.props.whatsapp = whatsapp;
        this.touch();
    }
    get authorName() {
        return this.props.authorName;
    }
    set authorName(authorName) {
        this.props.authorName = authorName;
        this.touch();
    }
    get cep() {
        return this.props.cep;
    }
    set cep(cep) {
        this.props.cep = cep;
        this.touch();
    }
    get state() {
        return this.props.state;
    }
    set state(state) {
        this.props.state = state;
        this.touch();
    }
    get city() {
        return this.props.city;
    }
    set city(city) {
        this.props.city = city;
        this.touch();
    }
    get neighborhood() {
        return this.props.neighborhood;
    }
    set neighborhood(neighborhood) {
        this.props.neighborhood = neighborhood;
        this.touch();
    }
    get street() {
        return this.props.street;
    }
    set street(street) {
        this.props.street = street;
        this.touch();
    }
    get latitude() {
        return this.props.latitude;
    }
    set latitude(latitude) {
        this.props.latitude = latitude;
        this.touch();
    }
    get longitude() {
        return this.props.longitude;
    }
    set longitude(longitude) {
        this.props.longitude = longitude;
        this.touch();
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    touch() {
        this.props.updatedAt = new Date();
    }
}
exports.Org = Org;
//# sourceMappingURL=org.js.map