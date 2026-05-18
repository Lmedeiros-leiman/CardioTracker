import { err, ok, type Result } from "neverthrow";

export type AssessmentPeriodProps = {
    from: Date;
    to: Date;
};

export type AssessmentPeriodError = { kind: "invalid_period" };

export class AssessmentPeriod {
    readonly #from: Date;
    readonly #to: Date;

    private constructor(props: AssessmentPeriodProps) {
        this.#from = props.from;
        this.#to   = props.to;
    }

    static create(props: AssessmentPeriodProps): Result<AssessmentPeriod, AssessmentPeriodError> {
        if (props.from >= props.to) return err({ kind: "invalid_period" });
        return ok(new AssessmentPeriod(props));
    }

    static fromTrusted(props: AssessmentPeriodProps): AssessmentPeriod {
        return new AssessmentPeriod(props);
    }

    get from(): Date { return this.#from; }
    get to(): Date   { return this.#to; }
}
