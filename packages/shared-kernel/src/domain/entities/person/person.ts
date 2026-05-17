import { Entity } from "../../shared/abstractions/entity.ts";
import type { BirthDate } from "./value-objects/birth-date.ts";
import type { Cpf } from "./value-objects/cpf.ts";
import type { FullName } from "./value-objects/full-name.ts";
import type { Gender } from "./value-objects/gender.ts";

export type PersonProps = {
    cpf: Cpf;
    fullName?: FullName;
    birthDate?: BirthDate;
    gender?: Gender;
};

export abstract class Person extends Entity<Cpf, PersonProps> {
    protected constructor(props: PersonProps) {
        super(props.cpf, props);
    }

    get cpf(): Cpf                        { return this.props.cpf; }
    get fullName(): FullName | undefined   { return this.props.fullName; }
    get birthDate(): BirthDate | undefined { return this.props.birthDate; }
    get gender(): Gender | undefined       { return this.props.gender; }
}
