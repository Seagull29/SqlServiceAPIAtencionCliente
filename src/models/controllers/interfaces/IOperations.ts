export interface IOperations<Entity> {
    list() : Promise<Array<object> | any>;
    add(entity : Entity) : Promise<object | any>;
    delete(entity : Entity) : Promise<object | any>;
    update(entity : Entity) : Promise<object | any>;
    search(query : string | any, criteria : string | any) : Promise<Array<object> | any>;
}



