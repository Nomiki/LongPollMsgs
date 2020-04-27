import { IDao } from "../IDao";
import { IMessage } from "../../entities/Message";
import { MockDaoBase } from "../MockDb/MockDaoBase";

export interface IMessageDao extends IDao<IMessage> {}

export class MessageDao extends MockDaoBase implements IMessageDao {

  /**
   * Returns a message that corresponds the given ID or null.
   * @param key message ID
   */
  public async getOne(key: string): Promise<IMessage | null> {
    try {
        const db = await super.openDb();
        for (const message of db.messages) {
            if (message.id === key) {
                return message;
            }
        }
        return null;
    } catch (err){
        throw err;
    }
  }

  /**
   * Returns @take messages. Skips @skip messages during fetching
   * @param skip How many messages to skip
   * @param take How many massages to take
   */
  public async getMany(skip: number, take: number): Promise<IMessage[]> {
    // TODO

    return {} as any;
  }

  /**
   * Adds a message to the DB
   * @param obj Message to add
   */
  public async add(obj: IMessage): Promise<void> {
    // TODO

    return {} as any;
  }

  /**
   * Updates a message
   * @param obj Message to update
   */
  public async update(obj: IMessage): Promise<void> {
    // TODO

    return {} as any;
  }

  /**
   * Deletes a message
   * @param key Message ID to delete
   */
  public async delete(key: string): Promise<void> {
    // TODO

    return {} as any;
  }
}
