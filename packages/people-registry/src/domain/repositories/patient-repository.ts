import type { Cpf } from "@cardio-tracker/shared-kernel";
import type { Patient } from "../entities/patient/patient.ts";

export interface IPatientRepository {
    findByCpf(cpf: Cpf): Promise<Patient | null>;
    findAll(): Promise<Patient[]>;
    save(patient: Patient): Promise<void>;
}
