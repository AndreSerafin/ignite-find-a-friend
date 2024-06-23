import { UniqueEntityId } from './unique-entity-id';
export declare class Entity<Props> {
    private _id;
    protected props: Props;
    protected constructor(props: Props, id?: UniqueEntityId);
    get id(): UniqueEntityId;
    equals(entity: Entity<any>): boolean;
}
