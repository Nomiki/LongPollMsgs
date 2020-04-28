import { MockDbBase } from "../MockDb/MockDbBase";
import { IUserDao } from "./UserDao";
import { IUser, User } from "../../entities/User";

export class UserDao extends MockDbBase implements IUserDao {
  /**
   * Returns a user that corresponds the given name or null.
   * @param key user name
   */
  public async getOne(key: string): Promise<IUser | null> {
    try {
      const db = await super.openDb();
      for (const user of db.users) {
        if (user.name === key) {
          return user;
        }
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Returns @take users. Skips @skip users during fetching
   * @param skip How many users to skip
   * @param take How many users to take
   */
  public async getMany(skip: number, take: number): Promise<IUser[]> {
    try {
      const db = await super.openDb();
      return db.users.slice(skip, skip + take);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Adds a user to the DB
   * @param obj user to add
   */
  public async add(obj: IUser): Promise<IUser> {
    try {
      const db = await super.openDb();
      const user = new User(obj);
      db.users.push(user);
      await super.saveDb(db);
      return user;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Updates a user
   * @param obj user to update
   */
  public async update(obj: IUser): Promise<IUser> {
    try {
      const db = await super.openDb();
      for (let i = 0; i < db.users.length; i++) {
        if (db.users[i].name === obj.name) {
          const user = new User(obj);
          db.users[i] = user;
          await super.saveDb(db);
          return user;
        }
      }
      throw new Error("user not found");
    } catch (err) {
      throw err;
    }
  }

  /**
   * Deletes a user
   * @param key user name to delete
   */
  public async delete(key: string): Promise<void> {
    try {
      const db = await super.openDb();
      for (let i = 0; i < db.users.length; i++) {
        if (db.users[i].name === key) {
          db.users.splice(i, 1);
          await super.saveDb(db);
          return;
        }
      }
      throw new Error("user not found");
    } catch (err) {
      throw err;
    }
  }
}
