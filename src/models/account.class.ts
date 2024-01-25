export class Account {
  email: string;
  pw: string;
  name: string;

  constructor(obj?: any) {
    this.email = obj ? obj.email : '';
    this.pw = obj ? obj.pw : '';
    this.name = obj ? obj.name : '';
  }

  public toJSON() {
    return {
      email: this.email,
      pw: this.pw,
      name: this.name,
    };
  }
}
