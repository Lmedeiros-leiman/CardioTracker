import { err, ok, type Result } from "neverthrow";

export type VitalSignsProps = {
    systolicBP?: number;        // mmHg
    diastolicBP?: number;       // mmHg
    heartRate?: number;         // bpm
    oxygenSaturation?: number;  // % SpO₂  (0–100)
    weight?: number;            // kg
    measuredAt: Date;
};

export type VitalSignsError =
    | { kind: "invalid_systolic_bp";      value: number }
    | { kind: "invalid_diastolic_bp";     value: number }
    | { kind: "bp_systolic_below_diastolic" }
    | { kind: "invalid_heart_rate";       value: number }
    | { kind: "invalid_oxygen_saturation"; value: number }
    | { kind: "invalid_weight";           value: number };

export class VitalSigns {
    readonly #props: Readonly<VitalSignsProps>;

    private constructor(props: VitalSignsProps) {
        this.#props = Object.freeze({ ...props });
    }

    static create(props: VitalSignsProps): Result<VitalSigns, VitalSignsError> {
        if (props.systolicBP !== undefined && props.systolicBP <= 0)
            return err({ kind: "invalid_systolic_bp", value: props.systolicBP });

        if (props.diastolicBP !== undefined && props.diastolicBP <= 0)
            return err({ kind: "invalid_diastolic_bp", value: props.diastolicBP });

        if (props.systolicBP !== undefined && props.diastolicBP !== undefined
            && props.systolicBP <= props.diastolicBP)
            return err({ kind: "bp_systolic_below_diastolic" });

        if (props.heartRate !== undefined && props.heartRate <= 0)
            return err({ kind: "invalid_heart_rate", value: props.heartRate });

        if (props.oxygenSaturation !== undefined
            && (props.oxygenSaturation < 0 || props.oxygenSaturation > 100))
            return err({ kind: "invalid_oxygen_saturation", value: props.oxygenSaturation });

        if (props.weight !== undefined && props.weight <= 0)
            return err({ kind: "invalid_weight", value: props.weight });

        return ok(new VitalSigns(props));
    }

    static restore(props: VitalSignsProps): VitalSigns {
        return new VitalSigns(props);
    }

    get systolicBP(): number | undefined        { return this.#props.systolicBP; }
    get diastolicBP(): number | undefined       { return this.#props.diastolicBP; }
    get heartRate(): number | undefined         { return this.#props.heartRate; }
    get oxygenSaturation(): number | undefined  { return this.#props.oxygenSaturation; }
    get weight(): number | undefined            { return this.#props.weight; }
    get measuredAt(): Date                      { return this.#props.measuredAt; }

    get bloodPressure(): string | undefined {
        if (this.#props.systolicBP === undefined || this.#props.diastolicBP === undefined) return undefined;
        return `${this.#props.systolicBP}/${this.#props.diastolicBP} mmHg`;
    }
}
