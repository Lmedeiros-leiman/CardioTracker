import type { EntityId } from "./EntityId";

export abstract class Entity<TId extends EntityId<string>> {
  public readonly id: TId;

  protected constructor(id: TId) {
    this.id = id;
  }

  public equals(other: this): boolean {
    return this.id.equals(other.id);
  }
}
