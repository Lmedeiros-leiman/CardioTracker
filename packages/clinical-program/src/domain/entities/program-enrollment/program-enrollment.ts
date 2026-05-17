import { Entity, type Cpf } from "@cardio-tracker/shared-kernel";
import { err, ok, type Result } from "neverthrow";
import type { Discharge, DischargeReason } from "./value-objects/discharge.ts";
import type { EligibilityAssessment } from "./value-objects/eligibility.ts";
import type { ProgramEnrollmentStatus } from "./value-objects/enrollment-status.ts";
import type { FunctionalBaseline } from "./value-objects/functional-baseline.ts";
import type { ProgramEnrollmentId } from "./program-enrollment-id.ts";

// --- State union ---

type PendingEnrollmentState = {
    status: "pending";
};

type ActiveEnrollmentState = {
    status: "active";
    eligibility: EligibilityAssessment;
    enrolledAt: Date;
    functionalBaseline: FunctionalBaseline;
};

type PausedEnrollmentState = {
    status: "paused";
    eligibility: EligibilityAssessment;
    enrolledAt: Date;
    pausedAt: Date;
    functionalBaseline: FunctionalBaseline;
};

type ClosedEnrollmentState = {
    status: "completed" | "dropped" | "cancelled";
    eligibility?: EligibilityAssessment;
    enrolledAt?: Date;
    discharge: Discharge;
};

type ProgramEnrollmentState =
    | PendingEnrollmentState
    | ActiveEnrollmentState
    | PausedEnrollmentState
    | ClosedEnrollmentState;

// ---

type BaseEnrollmentProps = {
    patientCpf: Cpf;
    programName: string;
};

export type ProgramEnrollmentProps = BaseEnrollmentProps & ProgramEnrollmentState;

export type CreateProgramEnrollmentProps = {
    patientCpf: Cpf;
    programName: string;
};

export type CreateEnrollmentError = { kind: "empty_program_name" };

export function dischargeReasonToEnrollmentStatus(
    reason: DischargeReason,
): "completed" | "dropped" | "cancelled" {
    switch (reason) {
        case "program_completed":  return "completed";
        case "clinical_discharge": return "completed";
        case "transferred":        return "completed";
        case "death":              return "completed";
        case "dropout":            return "dropped";
        case "cancelled":          return "cancelled";
        default: {
            const exhaustiveCheck: never = reason;
            return exhaustiveCheck;
        }
    }
}

export class ProgramEnrollment extends Entity<ProgramEnrollmentId, ProgramEnrollmentProps> {
    private constructor(id: ProgramEnrollmentId, props: ProgramEnrollmentProps) {
        super(id, props);
    }

    static create(
        id: ProgramEnrollmentId,
        props: CreateProgramEnrollmentProps,
    ): Result<ProgramEnrollment, CreateEnrollmentError> {
        const programName = props.programName.trim();
        if (!programName) return err({ kind: "empty_program_name" });

        return ok(new ProgramEnrollment(id, {
            patientCpf:  props.patientCpf,
            programName,
            status:      "pending",
        }));
    }

    static restore(id: ProgramEnrollmentId, props: ProgramEnrollmentProps): ProgramEnrollment {
        return new ProgramEnrollment(id, props);
    }

    get patientCpf(): Cpf                { return this.props.patientCpf; }
    get programName(): string            { return this.props.programName; }
    get status(): ProgramEnrollmentStatus { return this.props.status; }

    get eligibility(): EligibilityAssessment | undefined {
        const p = this.props;
        if (p.status === "pending") return undefined;
        return p.eligibility;
    }

    get functionalBaseline(): FunctionalBaseline | undefined {
        const p = this.props;
        if (p.status === "active" || p.status === "paused") return p.functionalBaseline;
        return undefined;
    }

    get enrolledAt(): Date | undefined {
        const p = this.props;
        if (p.status === "pending") return undefined;
        return p.enrolledAt;
    }

    get pausedAt(): Date | undefined {
        return this.props.status === "paused" ? this.props.pausedAt : undefined;
    }

    get discharge(): Discharge | undefined {
        const p = this.props;
        if (p.status === "completed" || p.status === "dropped" || p.status === "cancelled") {
            return p.discharge;
        }
        return undefined;
    }
}
