export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(entity: T): Promise<T | null>;
  update(id: string, entity: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
