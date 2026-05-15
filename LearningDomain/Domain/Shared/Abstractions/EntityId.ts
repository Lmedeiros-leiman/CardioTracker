export abstract class EntityId<TBrand extends string> {
  declare protected readonly __brand: TBrand;

  readonly #value: string;

  protected constructor(value: string) {
    const normalized = value.trim();

    if (!normalized) {
      throw new Error("EntityId cannot be empty.");
    }

    this.#value = normalized;
  }

  public get value(): string {
    return this.#value;
  }

  public equals(other: this): boolean {
    return this.#value === other.#value;
  }

  public toString(): string {
    return this.#value;
  }

  public toJSON(): string {
    return this.#value;
  }
}
