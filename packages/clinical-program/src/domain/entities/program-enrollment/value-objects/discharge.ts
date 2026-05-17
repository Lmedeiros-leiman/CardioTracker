export const DischargeReasonValues = [
    "program_completed",
    "clinical_discharge",
    "dropout",
    "transferred",
    "cancelled",
    "death",
] as const;

export type DischargeReason = (typeof DischargeReasonValues)[number];

export type DischargeProps = {
    reason: DischargeReason;
    occurredAt: Date;
    notes?: string;
};

export class Discharge {
    readonly #reason: DischargeReason;
    readonly #occurredAt: Date;
    readonly #notes: string | undefined;

    private constructor(props: DischargeProps) {
        this.#reason     = props.reason;
        this.#occurredAt = props.occurredAt;
        this.#notes      = props.notes;
    }

    static create(props: DischargeProps): Discharge {
        return new Discharge({
            ...props,
            notes: props.notes?.trim(),
        });
    }

    get reason(): DischargeReason      { return this.#reason; }
    get occurredAt(): Date             { return this.#occurredAt; }
    get notes(): string | undefined    { return this.#notes; }
}
