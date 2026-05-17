import { Person, type PersonProps, type ContactAddress } from "@cardio-tracker/shared-kernel";
import type { ProfessionalRole } from "./value-objects/professional-role.ts";
import type { ProfessionalRegistration } from "./value-objects/professional-registration.ts";
import type { Specialty } from "./value-objects/specialty.ts";

// --- State union ---

type ActiveProfessionalState = {
    status: "active";
};

type InactiveProfessionalState = {
    status: "inactive";
    inactivatedAt: Date;
    reason?: string;
};

type OnLeaveProfessionalState = {
    status: "on_leave";
    startedAt: Date;
    expectedReturnAt?: Date;
};

type ProfessionalStatusState =
    | ActiveProfessionalState
    | InactiveProfessionalState
    | OnLeaveProfessionalState;

// ---

type BaseProfessionalProps = {
    role: ProfessionalRole;
    specialty?: Specialty;
    registration?: ProfessionalRegistration;
    contactAddress?: ContactAddress;
    hiredAt: Date;
};

export type ProfessionalProps = BaseProfessionalProps & ProfessionalStatusState;
export type ProfessionalStatus = ProfessionalStatusState["status"];

export class Professional extends Person {
    readonly #professionalProps: Readonly<ProfessionalProps>;

    protected constructor(personProps: PersonProps, professionalProps: ProfessionalProps) {
        super(personProps);
        this.#professionalProps = Object.freeze({ ...professionalProps });
    }

    static create(
        personProps: PersonProps,
        professionalProps: BaseProfessionalProps,
    ): Professional {
        return new Professional(personProps, { ...professionalProps, status: "active" });
    }

    static restore(personProps: PersonProps, professionalProps: ProfessionalProps): Professional {
        return new Professional(personProps, professionalProps);
    }

    get role(): ProfessionalRole                               { return this.#professionalProps.role; }
    get specialty(): Specialty | undefined                     { return this.#professionalProps.specialty; }
    get registration(): ProfessionalRegistration | undefined   { return this.#professionalProps.registration; }
    get contactAddress(): ContactAddress | undefined           { return this.#professionalProps.contactAddress; }
    get status(): ProfessionalStatus                           { return this.#professionalProps.status; }
    get hiredAt(): Date                                        { return this.#professionalProps.hiredAt; }

    get inactivatedAt(): Date | undefined {
        return this.#professionalProps.status === "inactive" ? this.#professionalProps.inactivatedAt : undefined;
    }

    get inactivationReason(): string | undefined {
        return this.#professionalProps.status === "inactive" ? this.#professionalProps.reason : undefined;
    }

    get leaveStartedAt(): Date | undefined {
        return this.#professionalProps.status === "on_leave" ? this.#professionalProps.startedAt : undefined;
    }

    get expectedReturnAt(): Date | undefined {
        return this.#professionalProps.status === "on_leave" ? this.#professionalProps.expectedReturnAt : undefined;
    }
}
