import type { Cpf } from "./ValueObjects/CPF";

export class Person {
  private constructor(public readonly cpf: Cpf) {}

  static create(cpf: Cpf): Person {
    return new Person(cpf);
  }
}
