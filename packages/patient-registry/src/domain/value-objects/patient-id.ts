import { EntityId } from "@cardio-tracker/shared-kernel";

export class PatientId extends EntityId<"PatientId"> {
    private constructor(value: string) {
        super(value);
    }

    static create(value: string): PatientId {
        return new PatientId(value);
    }
}
