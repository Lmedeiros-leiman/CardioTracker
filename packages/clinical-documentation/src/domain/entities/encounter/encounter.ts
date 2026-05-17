import { Entity, type Cpf } from "@cardio-tracker/shared-kernel";
import type { ProgramEnrollmentId } from "@cardio-tracker/clinical-program";
import type { EncounterId } from "./encounter-id.ts";
import type { EncounterType } from "./value-objects/encounter-type.ts";
import type { ProfessionalNote } from "./value-objects/professional-note.ts";
import type { StructuredPayload } from "./value-objects/structured-payload.ts";
import type { VitalSigns } from "./value-objects/vital-signs.ts";
import type { Specialty } from "@cardio-tracker/shared-kernel";

export type EncounterProps = {
    patientCpf: Cpf;
    authorCpf: Cpf;
    programEnrollmentId: ProgramEnrollmentId;
    encounterType: EncounterType;
    occurredAt: Date;
    payload: StructuredPayload;
    professionalNote?: ProfessionalNote;
    vitalSigns?: VitalSigns;
};

export type CreateEncounterProps = EncounterProps;

export class Encounter extends Entity<EncounterId, EncounterProps> {
    private constructor(id: EncounterId, props: EncounterProps) {
        super(id, props);
    }

    static create(id: EncounterId, props: CreateEncounterProps): Encounter {
        return new Encounter(id, props);
    }

    static restore(id: EncounterId, props: EncounterProps): Encounter {
        return new Encounter(id, props);
    }

    get patientCpf(): Cpf                         { return this.props.patientCpf; }
    get authorCpf(): Cpf                          { return this.props.authorCpf; }
    get programEnrollmentId(): ProgramEnrollmentId { return this.props.programEnrollmentId; }
    get encounterType(): EncounterType            { return this.props.encounterType; }
    get specialty(): Specialty                    { return this.props.payload.specialty; }
    get occurredAt(): Date                        { return this.props.occurredAt; }
    get payload(): StructuredPayload              { return this.props.payload; }
    get professionalNote(): ProfessionalNote | undefined { return this.props.professionalNote; }
    get vitalSigns(): VitalSigns | undefined      { return this.props.vitalSigns; }
}
