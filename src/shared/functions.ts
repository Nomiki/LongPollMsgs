import { v4 as uuidv4 } from 'uuid';

export class CommonFunctions {
  public static getRandomId(): string {
      return uuidv4();
  }
}
