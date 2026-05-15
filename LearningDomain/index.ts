import { Email } from "./Domain/Shared/ValueObjects/Email";

export class User {
  constructor(private id: number) {}
}

let test = new User(123);

console.log(Email.isValid("test@gmail"));
