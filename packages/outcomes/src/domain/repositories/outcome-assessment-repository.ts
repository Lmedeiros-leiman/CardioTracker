import type { Cpf } from "@cardio-tracker/shared-kernel";
import type { ProgramEnrollmentId } from "@cardio-tracker/clinical-program";
import type { OutcomeAssessment } from "../entities/outcome-assessment/outcome-assessment.ts";
import type { OutcomeAssessmentId } from "../entities/outcome-assessment/outcome-assessment-id.ts";

export interface IOutcomeAssessmentRepository {
    findById(id: OutcomeAssessmentId): Promise<OutcomeAssessment | null>;
    findByEnrollmentId(id: ProgramEnrollmentId): Promise<OutcomeAssessment | null>;
    findByPatientCpf(cpf: Cpf): Promise<OutcomeAssessment[]>;
    save(assessment: OutcomeAssessment): Promise<void>;
}
