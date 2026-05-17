import type { Cpf } from "@cardio-tracker/shared-kernel";
import type { Professional } from "../entities/professional/professional.ts";

export interface IProfessionalRepository {
    findByCpf(cpf: Cpf): Promise<Professional | null>;
    findAll(): Promise<Professional[]>;
    save(professional: Professional): Promise<void>;
}
