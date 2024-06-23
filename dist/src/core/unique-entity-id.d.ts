export declare class UniqueEntityId {
    private value;
    constructor(value?: string);
    toString(): string;
    toValue(): string;
    equals(id: UniqueEntityId): boolean;
}
