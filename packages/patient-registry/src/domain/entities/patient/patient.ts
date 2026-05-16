import { Person, type PersonProps } from "@cardio-tracker/shared-kernel";
import type { ContactAddress } from "./value-objects/contact-address.ts";

export type PatientStatus = "active" | "inactive" | "deceased";

export type PatientProps = {
  contactAddress: ContactAddress;
  healthInsuranceName?: string;
  status: PatientStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterPatientProps = PersonProps & {
  contactAddress: ContactAddress;
  healthInsuranceName?: string;
  registeredAt?: Date;
};

export class Patient extends Person {
  readonly #patientProps: Readonly<PatientProps>;

  private constructor(personProps: PersonProps, patientProps: PatientProps) {
    super(personProps);
    this.#patientProps = Object.freeze({ ...patientProps });
  }

  static register(props: RegisterPatientProps): Patient {
    const now = props.registeredAt ?? new Date();

    return new Patient(
      {
        cpf: props.cpf,
        fullName: props.fullName,
        birthDate: props.birthDate,
        gender: props.gender,
      },
      {
        contactAddress: props.contactAddress,
        healthInsuranceName: props.healthInsuranceName,
        status: "active",
        createdAt: now,
        updatedAt: now,
      },
    );
  }

  get contactAddress(): ContactAddress {
    return this.#patientProps.contactAddress;
  }

  get healthInsuranceName(): string | undefined {
    return this.#patientProps.healthInsuranceName;
  }

  get status(): PatientStatus {
    return this.#patientProps.status;
  }

  get createdAt(): Date {
    return this.#patientProps.createdAt;
  }

  get updatedAt(): Date {
    return this.#patientProps.updatedAt;
  }
}
