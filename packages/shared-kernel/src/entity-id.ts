export abstract class EntityId<TBrand extends string> {
    declare protected readonly __entityIdBrand: TBrand;

    readonly #value: string;

    protected constructor(value: string) {
        const normalizedValue = value.trim();

        if (!normalizedValue) {
            throw new Error("Entity ID cannot be empty");
        }

        this.#value = normalizedValue;
    }

    get value(): string {
        return this.#value;
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }

    toJSON(): string {
        return this.value;
    }
}

export type AnyEntityId = EntityId<string>;
