import { Person, type PersonProps } from "@cardio-tracker/shared-kernel";
import type { ContactAddress } from "@cardio-tracker/shared-kernel";
import type { EmergencyContact } from "./value-objects/emergency-contact.ts";
import type { RiskFactor } from "./value-objects/risk-factor.ts";

// --- State union ---

type ActivePatientState = {
    status: "active";
};

type InactivePatientState = {
    status: "inactive";
    inactivatedAt: Date;
    reason?: string;
};

type DeceasedPatientState = {
    status: "deceased";
    deceasedAt: Date;
};

type PatientStatusState = ActivePatientState | InactivePatientState | DeceasedPatientState;

// ---

type BasePatientProps = {
    contactAddress: ContactAddress;
    emergencyContact: EmergencyContact;
    healthInsuranceName?: string;
    riskFactors?: readonly RiskFactor[];
};

export type PatientProps = BasePatientProps & PatientStatusState;
export type PatientStatus = PatientStatusState["status"];

export class Patient extends Person {
    readonly #patientProps: Readonly<PatientProps>;

    protected constructor(personProps: PersonProps, patientProps: PatientProps) {
        super(personProps);
        this.#patientProps = Object.freeze({ ...patientProps });
    }

    static create(
        personProps: PersonProps,
        patientProps: BasePatientProps,
    ): Patient {
        return new Patient(personProps, {
            ...patientProps,
            status:    "active",
        });
    }

    static restore(personProps: PersonProps, patientProps: PatientProps): Patient {
        return new Patient(personProps, patientProps);
    }

    get contactAddress(): ContactAddress                  { return this.#patientProps.contactAddress; }
    get emergencyContact(): EmergencyContact              { return this.#patientProps.emergencyContact; }
    get healthInsuranceName(): string | undefined         { return this.#patientProps.healthInsuranceName; }
    get riskFactors(): readonly RiskFactor[] | undefined  { return this.#patientProps.riskFactors; }
    get status(): PatientStatus                           { return this.#patientProps.status; }

    get inactivatedAt(): Date | undefined {
        return this.#patientProps.status === "inactive" ? this.#patientProps.inactivatedAt : undefined;
    }

    get inactivationReason(): string | undefined {
        return this.#patientProps.status === "inactive" ? this.#patientProps.reason : undefined;
    }

    get deceasedAt(): Date | undefined {
        return this.#patientProps.status === "deceased" ? this.#patientProps.deceasedAt : undefined;
    }
}
