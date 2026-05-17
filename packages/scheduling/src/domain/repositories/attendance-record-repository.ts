import type { Cpf } from "@cardio-tracker/shared-kernel";
import type { ProgramEnrollmentId } from "@cardio-tracker/clinical-program";
import type { AttendanceRecord } from "../entities/attendance-record/attendance-record.ts";
import type { AttendanceRecordId } from "../entities/attendance-record/attendance-record-id.ts";

export interface IAttendanceRecordRepository {
    findById(id: AttendanceRecordId): Promise<AttendanceRecord | null>;
    findByEnrollmentId(id: ProgramEnrollmentId): Promise<AttendanceRecord[]>;
    findByPatientCpf(cpf: Cpf): Promise<AttendanceRecord[]>;
    findByProfessionalCpf(cpf: Cpf): Promise<AttendanceRecord[]>;
    save(record: AttendanceRecord): Promise<void>;
}
