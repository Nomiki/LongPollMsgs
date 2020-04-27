export interface IDao<T> {
  getOne: (key: string) => Promise<T | null>;
  getMany: (skip: number, take: number) => Promise<T[]>;
  add: (obj: T) => Promise<T>;
  update: (obj: T) => Promise<T>;
  delete: (key: string) => Promise<void>;
}
