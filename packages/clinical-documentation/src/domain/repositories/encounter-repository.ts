import type { Cpf } from "@cardio-tracker/shared-kernel";
import type { ProgramEnrollmentId } from "@cardio-tracker/clinical-program";
import type { Encounter } from "../entities/encounter/encounter.ts";
import type { EncounterId } from "../entities/encounter/encounter-id.ts";

export interface IEncounterRepository {
    findById(id: EncounterId): Promise<Encounter | null>;
    findByEnrollmentId(id: ProgramEnrollmentId): Promise<Encounter[]>;
    findByPatientCpf(cpf: Cpf): Promise<Encounter[]>;
    save(encounter: Encounter): Promise<void>;
}
