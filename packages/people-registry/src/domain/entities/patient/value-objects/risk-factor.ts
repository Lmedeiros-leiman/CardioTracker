export const RiskFactorValues = [
    "hypertension",
    "diabetes",
    "smoking",
    "dyslipidemia",
    "obesity",
    "previous_cad",
    "heart_failure",
] as const;

export type RiskFactor = (typeof RiskFactorValues)[number];

export function isRiskFactor(input: string): input is RiskFactor {
    return RiskFactorValues.includes(input as RiskFactor);
}
