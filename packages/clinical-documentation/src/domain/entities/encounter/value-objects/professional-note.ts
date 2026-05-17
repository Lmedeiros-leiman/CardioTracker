import { err, ok, type Result } from "neverthrow";

export type ProfessionalNoteError =
    | { kind: "empty_content" }
    | { kind: "malformed_unicode" };

export class ProfessionalNote {
    readonly #content: string;

    private constructor(content: string) {
        this.#content = content;
    }

    static create(content: string): Result<ProfessionalNote, ProfessionalNoteError> {
        const normalized = content.trim();
        if (!normalized) return err({ kind: "empty_content" });
        if (!normalized.isWellFormed()) return err({ kind: "malformed_unicode" });
        return ok(new ProfessionalNote(normalized));
    }

    static restore(content: string): ProfessionalNote {
        return new ProfessionalNote(content);
    }

    get content(): string { return this.#content; }
    toString(): string { return this.#content; }
    toJSON(): string { return this.#content; }
    [Symbol.toPrimitive](): string { return this.#content; }
}
