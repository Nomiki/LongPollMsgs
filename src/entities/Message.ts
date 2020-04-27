export interface IMessage {
  id: string;
  to: string;
  message: string;
}

export class Message implements IMessage {
  public id: string;
  public to: string;
  public message: string;

  constructor(iMessage: IMessage) {
    this.id = iMessage.id;
    this.to = iMessage.to;
    this.message = iMessage.message;
  }
}
