import { Entity } from "../../shared/abstractions/entity.ts";
import type { BirthDate } from "./value-objects/birth-date.ts";
import type { Cpf } from "./value-objects/cpf.ts";
import type { FullName } from "./value-objects/full-name.ts";
import { toGender, toGenderCode, type Gender, type GenderCode } from "./value-objects/gender.ts";

export type PersonProps = {
  cpf: Cpf;
  fullName?: FullName;
  birthDate?: BirthDate;
  gender?: Gender;
};

type StoredPersonProps = Omit<PersonProps, "gender"> & {
  gender?: GenderCode;
};

export class Person extends Entity<Cpf, StoredPersonProps> {
  protected constructor(props: PersonProps) {
    super(props.cpf, {
      ...props,
      gender: props.gender ? toGenderCode(props.gender) : undefined,
    });
  }

  static create(props: PersonProps): Person {
    return new Person(props);
  }

  get cpf(): Cpf {
    return this.props.cpf;
  }

  get fullName(): FullName | undefined {
    return this.props.fullName;
  }

  get birthDate(): BirthDate | undefined {
    return this.props.birthDate;
  }

  get gender(): Gender | undefined {
    return this.props.gender ? toGender(this.props.gender) : undefined;
  }

  protected get genderCode(): GenderCode | undefined {
    return this.props.gender;
  }
}
