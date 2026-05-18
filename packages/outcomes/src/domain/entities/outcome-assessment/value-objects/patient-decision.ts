type ContinueDecision    = { kind: "continue";     reason?: string };
type DiscontinueDecision = { kind: "discontinue";  reason?: string };
type UndecidedDecision   = { kind: "undecided" };

export type PatientDecisionProps = ContinueDecision | DiscontinueDecision | UndecidedDecision;
export type PatientDecisionKind  = PatientDecisionProps["kind"];

export class PatientDecision {
    readonly #props: PatientDecisionProps;

    private constructor(props: PatientDecisionProps) {
        this.#props = props;
    }

    static continue(reason?: string): PatientDecision {
        return new PatientDecision({ kind: "continue", reason });
    }

    static discontinue(reason?: string): PatientDecision {
        return new PatientDecision({ kind: "discontinue", reason });
    }

    static undecided(): PatientDecision {
        return new PatientDecision({ kind: "undecided" });
    }

    static fromTrusted(props: PatientDecisionProps): PatientDecision {
        return new PatientDecision(props);
    }

    get kind(): PatientDecisionKind { return this.#props.kind; }

    get reason(): string | undefined {
        return this.#props.kind !== "undecided" ? this.#props.reason : undefined;
    }
}
