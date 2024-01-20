export class User {

    firstName: string;
    lastName: string;
    birthDate: number;
    phone: number;
    email: string;
    street: string;
    zipCode: number;
    city: string;
  id: any;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.phone = obj ? obj.phone : '';
        this.email = obj ? obj.email : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            phone: this.phone,
            email: this.email,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city
        };
    }
}