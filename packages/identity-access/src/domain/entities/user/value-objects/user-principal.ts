import type { Cpf } from "@cardio-tracker/shared-kernel";

export type PatientPrincipal = {
    kind: "patient";
    cpf: Cpf;
};

export type ProfessionalPrincipal = {
    kind: "professional";
    cpf: Cpf;
};

export type UserPrincipal = PatientPrincipal | ProfessionalPrincipal;
