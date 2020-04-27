import { IDao } from "../IDao";
import { IMessage } from "../../entities/Message";
import { MessageStatus } from "../../entities/MessageStatus";

export interface IMessageDao extends IDao<IMessage> {
  getOfUser: (user: string, status?: MessageStatus) => Promise<IMessage[]>;
}

export class MessageDao implements IMessageDao {
  /**
   * Returns a message that corresponds the given ID or null.
   * @param key message ID
   */
  public async getOne(key: string): Promise<IMessage | null> {
    // TODO

    return {} as any;
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
   * Returns user's @user messages.
   * @param user user name messages.
   * @param status (optional) message status.
   */
  public async getOfUser(user: string, status?: MessageStatus): Promise<IMessage[]> {
    // TODO

    return {} as any;
  }

  /**
   * Adds a message to the DB
   * @param obj Message to add
   */
  public async add(obj: IMessage): Promise<IMessage> {
    // TODO

    return {} as any;
  }

  /**
   * Updates a message
   * @param obj Message to update
   */
  public async update(obj: IMessage): Promise<IMessage> {
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
