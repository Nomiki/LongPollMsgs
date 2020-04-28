import { IMessage, Message } from "../../entities/Message";
import { MockDbBase } from "../MockDb/MockDbBase";
import { CommonFunctions } from "../../shared/functions";
import { MessageStatus } from "../../entities/MessageStatus";
import { IMessageDao } from "./MessageDao";

export class MessageDao extends MockDbBase implements IMessageDao {
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
    } catch (err) {
      throw err;
    }
  }

  /**
   * Returns @take messages. Skips @skip messages during fetching
   * @param skip How many messages to skip
   * @param take How many massages to take
   */
  public async getMany(skip: number, take: number): Promise<IMessage[]> {
    try {
      const db = await super.openDb();
      return db.messages.slice(skip, skip + take);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Returns user's @user messages.
   * @param user user name messages.
   * @param status (optional) message status.
   */
  public async getOfUser(
    user: string,
    status?: MessageStatus
  ): Promise<IMessage[]> {
    try {
      const db = await super.openDb();
      return db.messages.filter(
        (msg: IMessage) => msg.to === user && (!status || msg.status === status)
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * Adds a message to the DB
   * @param obj Message to add
   */
  public async add(obj: IMessage): Promise<IMessage> {
    try {
      const db = await super.openDb();
      obj.id = CommonFunctions.getRandomId();
      const message = new Message(obj);
      db.messages.push(message);
      await super.saveDb(db);
      return message;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Updates a message
   * @param obj Message to update
   */
  public async update(obj: IMessage): Promise<IMessage> {
    try {
      const db = await super.openDb();
      for (let i = 0; i < db.messages.length; i++) {
        if (db.messages[i].id === obj.id) {
          const message = new Message(obj);
          db.messages[i] = message;
          await super.saveDb(db);
          return message;
        }
      }
      throw new Error("Message not found");
    } catch (err) {
      throw err;
    }
  }

  /**
   * Deletes a message
   * @param key Message ID to delete
   */
  public async delete(key: string): Promise<void> {
    try {
      const db = await super.openDb();
      for (let i = 0; i < db.messages.length; i++) {
        if (db.messages[i].id === key) {
          db.messages.splice(i, 1);
          await super.saveDb(db);
          return;
        }
      }
      throw new Error("Message not found");
    } catch (err) {
      throw err;
    }
  }
}
