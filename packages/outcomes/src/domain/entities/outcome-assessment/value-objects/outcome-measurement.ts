import { err, ok, type Result } from "neverthrow";

export type OutcomeMeasurementProps = {
    assessedAt: Date;
    sixMinuteWalkDistance?: number;  // TC6M em metros
    restingHeartRate?: number;       // FC de repouso em bpm
    restingBP?: string;              // PA de repouso (ex: "120/80 mmHg")
    weight?: number;                 // Peso em kg
    notes?: string;
};

export type OutcomeMeasurementError =
    | { kind: "invalid_six_minute_walk_distance"; value: number }
    | { kind: "invalid_resting_heart_rate";       value: number }
    | { kind: "invalid_weight";                   value: number };

export class OutcomeMeasurement {
    readonly #props: Readonly<OutcomeMeasurementProps>;

    private constructor(props: OutcomeMeasurementProps) {
        this.#props = Object.freeze({ ...props });
    }

    static create(props: OutcomeMeasurementProps): Result<OutcomeMeasurement, OutcomeMeasurementError> {
        if (props.sixMinuteWalkDistance !== undefined && props.sixMinuteWalkDistance < 0)
            return err({ kind: "invalid_six_minute_walk_distance", value: props.sixMinuteWalkDistance });

        if (props.restingHeartRate !== undefined && props.restingHeartRate <= 0)
            return err({ kind: "invalid_resting_heart_rate", value: props.restingHeartRate });

        if (props.weight !== undefined && props.weight <= 0)
            return err({ kind: "invalid_weight", value: props.weight });

        return ok(new OutcomeMeasurement(props));
    }

    static fromTrusted(props: OutcomeMeasurementProps): OutcomeMeasurement {
        return new OutcomeMeasurement(props);
    }

    get assessedAt(): Date                          { return this.#props.assessedAt; }
    get sixMinuteWalkDistance(): number | undefined { return this.#props.sixMinuteWalkDistance; }
    get restingHeartRate(): number | undefined      { return this.#props.restingHeartRate; }
    get restingBP(): string | undefined             { return this.#props.restingBP; }
    get weight(): number | undefined                { return this.#props.weight; }
    get notes(): string | undefined                 { return this.#props.notes; }
}
