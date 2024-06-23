import { Entity } from '@/core/entity';
import { UniqueEntityId } from '@/core/unique-entity-id';
import { Optional } from '@/@types/optional';
declare enum Size {
    SMALL = 0,
    MEDIUM = 1,
    BIG = 2
}
export interface PetProps {
    name: string;
    specie: string;
    age: number;
    size: Size;
    breed: string;
    energyLevel: number;
    environment: string;
    about: string;
    authorId: UniqueEntityId;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class Pet extends Entity<PetProps> {
    static create(props: Optional<PetProps, 'createdAt'>, id?: UniqueEntityId): Pet;
    get authorId(): UniqueEntityId;
    get age(): number;
    set age(age: number);
    get name(): string;
    set name(name: string);
    get specie(): string;
    set specie(specie: string);
    get size(): Size;
    set size(size: Size);
    get breed(): string;
    set breed(breed: string);
    get energyLevel(): number;
    set energyLevel(energyLevel: number);
    get environment(): string;
    set environment(environment: string);
    get about(): string;
    set about(about: string);
    get excerptAbout(): string;
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
    private touch;
}
export {};
