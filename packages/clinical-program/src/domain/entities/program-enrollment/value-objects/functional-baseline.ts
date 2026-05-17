import { err, ok, type Result } from "neverthrow";

export type FunctionalBaselineProps = {
    sixMinuteWalkDistance?: number;  // TC6M em metros
    restingHeartRate?: number;       // FC de repouso em bpm
    restingBP?: string;              // PA de repouso (ex: "120/80 mmHg")
    assessedAt: Date;
    notes?: string;
};

export type FunctionalBaselineError =
    | { kind: "invalid_six_minute_walk_distance"; value: number }
    | { kind: "invalid_resting_heart_rate";       value: number };

export class FunctionalBaseline {
    readonly #props: Readonly<FunctionalBaselineProps>;

    private constructor(props: FunctionalBaselineProps) {
        this.#props = Object.freeze({ ...props });
    }

    static create(props: FunctionalBaselineProps): Result<FunctionalBaseline, FunctionalBaselineError> {
        if (props.sixMinuteWalkDistance !== undefined && props.sixMinuteWalkDistance < 0)
            return err({ kind: "invalid_six_minute_walk_distance", value: props.sixMinuteWalkDistance });

        if (props.restingHeartRate !== undefined && props.restingHeartRate <= 0)
            return err({ kind: "invalid_resting_heart_rate", value: props.restingHeartRate });

        return ok(new FunctionalBaseline(props));
    }

    static restore(props: FunctionalBaselineProps): FunctionalBaseline {
        return new FunctionalBaseline(props);
    }

    get sixMinuteWalkDistance(): number | undefined { return this.#props.sixMinuteWalkDistance; }
    get restingHeartRate(): number | undefined      { return this.#props.restingHeartRate; }
    get restingBP(): string | undefined             { return this.#props.restingBP; }
    get assessedAt(): Date                          { return this.#props.assessedAt; }
    get notes(): string | undefined                 { return this.#props.notes; }
}
