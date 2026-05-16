import { Entity } from "../../shared/abstractions/entity.ts";
import type { CompanyId } from "./company-id.ts";
import type { TradeName } from "./value-objects/trade-name.ts";

export type CompanyProps = {
  tradeName: TradeName;
};

export class Company extends Entity<CompanyId, CompanyProps> {
  private constructor(id: CompanyId, props: CompanyProps) {
    super(id, props);
  }

  static create(id: CompanyId, props: CompanyProps): Company {
    return new Company(id, props);
  }

  get tradeName(): TradeName {
    return this.props.tradeName;
  }
}
