export interface IUser {
  name: string;
  pollTimeoutSeconds: number;
}

export class User implements IUser {
  public name: string;
  public pollTimeoutSeconds: number;

  constructor(iUser: IUser) {
    this.name = iUser.name;
    this.pollTimeoutSeconds = iUser.pollTimeoutSeconds;
  }
}
