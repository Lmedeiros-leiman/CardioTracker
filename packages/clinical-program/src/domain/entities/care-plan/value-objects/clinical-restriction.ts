import { err, ok, type Result } from "neverthrow";

export type ActiveClinicalRestrictionProps = {
    status: "active";
    description: string;
    startedAt: Date;
};

export type InactiveClinicalRestrictionProps = {
    status: "inactive";
    description: string;
    startedAt: Date;
    endedAt: Date;
    endReason?: string;
};

export type ClinicalRestrictionProps =
    | ActiveClinicalRestrictionProps
    | InactiveClinicalRestrictionProps;

export type ClinicalRestrictionError = { kind: "empty_description" };

export class ClinicalRestriction {
    readonly #state: ClinicalRestrictionProps;

    private constructor(state: ClinicalRestrictionProps) {
        this.#state = state;
    }

    static create(
        description: string,
        startedAt = new Date(),
    ): Result<ClinicalRestriction, ClinicalRestrictionError> {
        const trimmed = description.trim();
        if (!trimmed) return err({ kind: "empty_description" });
        return ok(new ClinicalRestriction({ status: "active", description: trimmed, startedAt }));
    }

    static restore(props: ClinicalRestrictionProps): ClinicalRestriction {
        return new ClinicalRestriction(props);
    }

    get status(): "active" | "inactive"  { return this.#state.status; }
    get active(): boolean                { return this.#state.status === "active"; }
    get description(): string            { return this.#state.description; }
    get startedAt(): Date                { return this.#state.startedAt; }
    get endedAt(): Date | undefined {
        return this.#state.status === "inactive" ? this.#state.endedAt : undefined;
    }
    get endReason(): string | undefined {
        return this.#state.status === "inactive" ? this.#state.endReason : undefined;
    }
}
