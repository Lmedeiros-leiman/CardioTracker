import { err, ok, type Result } from "neverthrow";

type BaseClinicalRestrictionProps = {
    description: string;
    startedAt: Date;
};

type ActiveClinicalRestrictionState   = { status: "active" };
type InactiveClinicalRestrictionState = { status: "inactive"; endedAt: Date; endReason?: string };

type ClinicalRestrictionState = ActiveClinicalRestrictionState | InactiveClinicalRestrictionState;

export type ClinicalRestrictionProps = BaseClinicalRestrictionProps & ClinicalRestrictionState;

export type ClinicalRestrictionError = { kind: "empty_description" };

export class ClinicalRestriction {
    readonly #props: ClinicalRestrictionProps;

    private constructor(props: ClinicalRestrictionProps) {
        this.#props = props;
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

    get status(): "active" | "inactive"  { return this.#props.status; }
    get active(): boolean                { return this.#props.status === "active"; }
    get description(): string            { return this.#props.description; }
    get startedAt(): Date                { return this.#props.startedAt; }
    get endedAt(): Date | undefined {
        return this.#props.status === "inactive" ? this.#props.endedAt : undefined;
    }
    get endReason(): string | undefined {
        return this.#props.status === "inactive" ? this.#props.endReason : undefined;
    }
}
