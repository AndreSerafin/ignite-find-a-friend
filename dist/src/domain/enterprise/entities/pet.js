"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = void 0;
const entity_1 = require("../../../core/entity");
class Pet extends entity_1.Entity {
    static create(props, id) {
        const pet = new Pet({ ...props, createdAt: props.createdAt ?? new Date() }, id);
        return pet;
    }
    get authorId() {
        return this.props.authorId;
    }
    get age() {
        return this.props.age;
    }
    set age(age) {
        this.props.age = age;
    }
    get name() {
        return this.props.name;
    }
    set name(name) {
        this.props.name = name;
        this.touch();
    }
    get specie() {
        return this.props.specie;
    }
    set specie(specie) {
        this.props.specie = specie;
        this.touch();
    }
    get size() {
        return this.props.size;
    }
    set size(size) {
        this.props.size = size;
        this.touch();
    }
    get breed() {
        return this.props.breed;
    }
    set breed(breed) {
        this.props.breed = breed;
        this.touch();
    }
    get energyLevel() {
        return this.props.energyLevel;
    }
    set energyLevel(energyLevel) {
        this.props.energyLevel = energyLevel;
        this.touch();
    }
    get environment() {
        return this.props.environment;
    }
    set environment(environment) {
        this.props.environment = environment;
        this.touch();
    }
    get about() {
        return this.props.about;
    }
    set about(about) {
        this.props.about = about;
        this.touch();
    }
    get excerptAbout() {
        return this.props.about.substring(0, 120).trimEnd().concat('...');
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
exports.Pet = Pet;
//# sourceMappingURL=pet.js.map