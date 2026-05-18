import { Entity, type Cpf } from "@cardio-tracker/shared-kernel";
import type { ProgramEnrollmentId } from "@cardio-tracker/clinical-program";
import type { OutcomeAssessmentId } from "./outcome-assessment-id.ts";
import type { AssessmentPeriod } from "./value-objects/assessment-period.ts";
import type { OutcomeMeasurement } from "./value-objects/outcome-measurement.ts";
import type { PatientDecision } from "./value-objects/patient-decision.ts";
import type { ProfessionalSummary } from "./value-objects/professional-summary.ts";

// --- State union ---

type DraftAssessmentState = {
    status: "draft";
};

type CompletedAssessmentState = {
    status: "completed";
    patientDecision: PatientDecision;
    completedAt: Date;
};

type OutcomeAssessmentState = DraftAssessmentState | CompletedAssessmentState;

// ---

type BaseOutcomeAssessmentProps = {
    enrollmentId: ProgramEnrollmentId;
    patientCpf: Cpf;
    period: AssessmentPeriod;
    measurements: OutcomeMeasurement;
    summaries: readonly ProfessionalSummary[];
};

export type OutcomeAssessmentProps = BaseOutcomeAssessmentProps & OutcomeAssessmentState;

export type CreateOutcomeAssessmentProps = {
    enrollmentId: ProgramEnrollmentId;
    patientCpf: Cpf;
    period: AssessmentPeriod;
    measurements: OutcomeMeasurement;
};

export type OutcomeAssessmentStatus = OutcomeAssessmentState["status"];

export class OutcomeAssessment extends Entity<OutcomeAssessmentId, OutcomeAssessmentProps> {
    private constructor(id: OutcomeAssessmentId, props: OutcomeAssessmentProps) {
        super(id, props);
    }

    static create(id: OutcomeAssessmentId, props: CreateOutcomeAssessmentProps): OutcomeAssessment {
        return new OutcomeAssessment(id, {
            ...props,
            summaries: [],
            status:    "draft",
        });
    }

    static restore(id: OutcomeAssessmentId, props: OutcomeAssessmentProps): OutcomeAssessment {
        return new OutcomeAssessment(id, props);
    }

    get enrollmentId(): ProgramEnrollmentId            { return this.props.enrollmentId; }
    get patientCpf(): Cpf                              { return this.props.patientCpf; }
    get period(): AssessmentPeriod                     { return this.props.period; }
    get measurements(): OutcomeMeasurement             { return this.props.measurements; }
    get summaries(): readonly ProfessionalSummary[]    { return this.props.summaries; }
    get status(): OutcomeAssessmentStatus              { return this.props.status; }

    get patientDecision(): PatientDecision | undefined {
        return this.props.status === "completed" ? this.props.patientDecision : undefined;
    }

    get completedAt(): Date | undefined {
        return this.props.status === "completed" ? this.props.completedAt : undefined;
    }
}
