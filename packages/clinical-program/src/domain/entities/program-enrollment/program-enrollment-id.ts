import { EntityId } from "@cardio-tracker/shared-kernel";

export class ProgramEnrollmentId extends EntityId<"ProgramEnrollmentId"> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): ProgramEnrollmentId {
    return new ProgramEnrollmentId(value);
  }
}
