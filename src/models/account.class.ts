export class Account {
  email: string;
  pw: string;

  constructor(obj?: any) {
    this.email = obj ? obj.email : '';
    this.pw = obj ? obj.pw : '';
  }

  public toJSON() {
    return {
      email: this.email,
      pw: this.pw,
    };
  }
}
