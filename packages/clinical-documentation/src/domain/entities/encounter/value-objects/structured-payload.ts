import type { RiskStratification } from "@cardio-tracker/clinical-program";

export type CardiologyPayload = {
    specialty: "cardiology";
    primaryDiagnosis: string;
    nyhaClass?: "I" | "II" | "III" | "IV";
    riskLevel: RiskStratification;
    restrictions?: string;
    medications?: string;
};

export type PhysiotherapyPayload = {
    specialty: "physiotherapy";
    sixMinuteWalkDistance?: number;  // metros — TC6M
    borgScale?: number;              // 6–20
    exercisePrescription?: string;
    effortResponse?: string;
};

export type NursingPayload = {
    specialty: "nursing";
    triage?: string;
    intercurrences?: string;
};

export type NutritionPayload = {
    specialty: "nutrition";
    bmi?: number;
    nutritionalAssessment?: string;
    dietaryGoals?: string;
};

export type PsychologyPayload = {
    specialty: "psychology";
    psychosocialAssessment?: string;
    adherenceBarriers?: string;
    interventionGoals?: string;
};

export type StructuredPayload =
    | CardiologyPayload
    | PhysiotherapyPayload
    | NursingPayload
    | NutritionPayload
    | PsychologyPayload;
