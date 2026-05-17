export const RiskStratificationValues = ["low", "moderate", "high", "not_assessed"] as const;
export type RiskStratification = (typeof RiskStratificationValues)[number];

export type EligibleAssessmentProps = {
    status: "eligible";
    assessedAt: Date;
    risk: Exclude<RiskStratification, "not_assessed">;
    notes?: string;
};

export type IneligibleAssessmentProps = {
    status: "ineligible";
    assessedAt: Date;
    risk: RiskStratification;
    reason?: string;
    notes?: string;
};

export type EligibilityAssessmentProps = EligibleAssessmentProps | IneligibleAssessmentProps;

export class EligibilityAssessment {
    readonly #state: EligibilityAssessmentProps;

    private constructor(state: EligibilityAssessmentProps) {
        this.#state = state;
    }

    static eligible(props: Omit<EligibleAssessmentProps, "status">): EligibilityAssessment {
        return new EligibilityAssessment({ ...props, status: "eligible" });
    }

    static ineligible(props: Omit<IneligibleAssessmentProps, "status">): EligibilityAssessment {
        return new EligibilityAssessment({ ...props, status: "ineligible" });
    }

    static restore(props: EligibilityAssessmentProps): EligibilityAssessment {
        return new EligibilityAssessment(props);
    }

    get isEligible(): boolean                  { return this.#state.status === "eligible"; }
    get status(): "eligible" | "ineligible"    { return this.#state.status; }
    get assessedAt(): Date                     { return this.#state.assessedAt; }
    get risk(): RiskStratification             { return this.#state.risk; }
    get notes(): string | undefined            { return this.#state.notes; }
    get reason(): string | undefined {
        return this.#state.status === "ineligible" ? this.#state.reason : undefined;
    }
}
