import { EntityId } from "@cardio-tracker/shared-kernel";

export class CarePlanId extends EntityId<"CarePlanId"> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): CarePlanId {
    return new CarePlanId(value);
  }
}
