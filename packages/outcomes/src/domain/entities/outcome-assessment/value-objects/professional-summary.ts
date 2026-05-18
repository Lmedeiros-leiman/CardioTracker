import { err, ok, type Result } from "neverthrow";
import type { Cpf, Specialty } from "@cardio-tracker/shared-kernel";

export type ProfessionalSummaryProps = {
    authorCpf: Cpf;
    specialty: Specialty;
    summary: string;
    submittedAt: Date;
};

export type ProfessionalSummaryError = { kind: "empty_summary" };

export class ProfessionalSummary {
    readonly #props: ProfessionalSummaryProps;

    private constructor(props: ProfessionalSummaryProps) {
        this.#props = props;
    }

    static create(props: ProfessionalSummaryProps): Result<ProfessionalSummary, ProfessionalSummaryError> {
        const summary = props.summary.trim();
        if (!summary) return err({ kind: "empty_summary" });
        return ok(new ProfessionalSummary({ ...props, summary }));
    }

    static fromTrusted(props: ProfessionalSummaryProps): ProfessionalSummary {
        return new ProfessionalSummary(props);
    }

    get authorCpf(): Cpf         { return this.#props.authorCpf; }
    get specialty(): Specialty   { return this.#props.specialty; }
    get summary(): string        { return this.#props.summary; }
    get submittedAt(): Date      { return this.#props.submittedAt; }
}
