import { Entity, type Cpf } from "@cardio-tracker/shared-kernel";
import type { ProgramEnrollmentId } from "@cardio-tracker/clinical-program";
import type { AttendanceRecordId } from "./attendance-record-id.ts";
import type { AttendanceStatus } from "./value-objects/attendance-status.ts";

// --- State union ---

type ScheduledState  = { status: "scheduled" };
type PresentState    = { status: "present"; attendedAt: Date };
type AbsentState     = { status: "absent"; absentAt: Date; justification?: string };
type CancelledState  = { status: "cancelled"; cancelledAt: Date; cancelledBy: Cpf; reason?: string };

type AttendanceState = ScheduledState | PresentState | AbsentState | CancelledState;

// ---

type BaseAttendanceProps = {
    patientCpf: Cpf;
    programEnrollmentId: ProgramEnrollmentId;
    scheduledFor: Date;
    professionalCpf: Cpf;
};

export type AttendanceRecordProps = BaseAttendanceProps & AttendanceState;

export type CreateAttendanceRecordProps = {
    patientCpf: Cpf;
    professionalCpf: Cpf;
    programEnrollmentId: ProgramEnrollmentId;
    scheduledFor: Date;
};

export class AttendanceRecord extends Entity<AttendanceRecordId, AttendanceRecordProps> {
    private constructor(id: AttendanceRecordId, props: AttendanceRecordProps) {
        super(id, props);
    }

    static create(id: AttendanceRecordId, props: CreateAttendanceRecordProps): AttendanceRecord {
        return new AttendanceRecord(id, {
            patientCpf:          props.patientCpf,
            programEnrollmentId: props.programEnrollmentId,
            status:              "scheduled",
            scheduledFor:        props.scheduledFor,
            professionalCpf:     props.professionalCpf,
        });
    }

    static restore(id: AttendanceRecordId, props: AttendanceRecordProps): AttendanceRecord {
        return new AttendanceRecord(id, props);
    }

    get patientCpf(): Cpf                          { return this.props.patientCpf; }
    get programEnrollmentId(): ProgramEnrollmentId { return this.props.programEnrollmentId; }
    get scheduledFor(): Date                       { return this.props.scheduledFor; }
    get professionalCpf(): Cpf                     { return this.props.professionalCpf; }
    get status(): AttendanceStatus                 { return this.props.status; }

    get attendedAt(): Date | undefined {
        return this.props.status === "present" ? this.props.attendedAt : undefined;
    }

    get absentAt(): Date | undefined {
        return this.props.status === "absent" ? this.props.absentAt : undefined;
    }

    get justification(): string | undefined {
        return this.props.status === "absent" ? this.props.justification : undefined;
    }

    get cancelledAt(): Date | undefined {
        return this.props.status === "cancelled" ? this.props.cancelledAt : undefined;
    }

    get cancelledBy(): Cpf | undefined {
        return this.props.status === "cancelled" ? this.props.cancelledBy : undefined;
    }

    get cancellationReason(): string | undefined {
        return this.props.status === "cancelled" ? this.props.reason : undefined;
    }
}
