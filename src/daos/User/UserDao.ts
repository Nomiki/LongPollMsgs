import { IUser } from "../../entities/User";
import { IDao } from "../IDao";

export interface IUserDao extends IDao<IUser> {}

export class UserDao implements IUserDao {
  /**
   * Returns a user that corresponds the given @key or null.
   * @param key user ID
   */
  public async getOne(key: string): Promise<IUser | null> {
    // TODO

    return {} as any;
  }

  /**
   * Returns @take users. Skips @skip users during fetching
   * @param skip How many users to skip
   * @param take How many users to take
   */
  public async getMany(skip: number, take: number): Promise<IUser[]> {
    // TODO

    return {} as any;
  }

  /**
   * Adds a user to the DB
   * @param obj user to add
   */
  public async add(obj: IUser): Promise<void> {
    // TODO

    return {} as any;
  }

  /**
   * Updates a user
   * @param obj user to update
   */
  public async update(obj: IUser): Promise<void> {
    // TODO

    return {} as any;
  }

  /**
   * Deletes a user
   * @param key user ID to delete
   */
  public async delete(key: string): Promise<void> {
    // TODO

    return {} as any;
  }
}
