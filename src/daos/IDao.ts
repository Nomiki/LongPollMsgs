export interface IDao<T> {
  getOne: (key: string) => Promise<T | null>;
  getMany: (skip: number, take: number) => Promise<T[]>;
  add: (obj: T) => Promise<void>;
  update: (obj: T) => Promise<void>;
  delete: (key: string) => Promise<void>;
}
