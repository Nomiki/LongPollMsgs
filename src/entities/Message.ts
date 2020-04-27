import { MessageStatus } from "./MessageStatus";

export interface IMessage {
  id: string;
  from: string;
  to: string;
  message: string;
  status: MessageStatus;
}

export class Message implements IMessage {
  public id: string;
  public from: string;
  public to: string;
  public status: MessageStatus;
  public message: string;

  constructor(iMessage: IMessage) {
    this.id = iMessage.id;
    this.from = iMessage.from;
    this.to = iMessage.to;
    this.message = iMessage.message;
    this.status = iMessage.status || MessageStatus.new;
  }
}
