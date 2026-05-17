import type { Cpf } from "@cardio-tracker/shared-kernel";
import type { ProgramEnrollment } from "../entities/program-enrollment/program-enrollment.ts";
import type { ProgramEnrollmentId } from "../entities/program-enrollment/program-enrollment-id.ts";

export interface IProgramEnrollmentRepository {
    findById(id: ProgramEnrollmentId): Promise<ProgramEnrollment | null>;
    findByPatientCpf(cpf: Cpf): Promise<ProgramEnrollment[]>;
    findActiveByPatientCpf(cpf: Cpf): Promise<ProgramEnrollment | null>;
    save(enrollment: ProgramEnrollment): Promise<void>;
}
