import { EntityId } from "../../shared/abstractions/entity-id.ts";

export class CompanyId extends EntityId<"CompanyId"> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): CompanyId {
    return new CompanyId(value);
  }
}
