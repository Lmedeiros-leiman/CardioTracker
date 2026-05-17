import { EntityId } from "@cardio-tracker/shared-kernel";

export class AttendanceRecordId extends EntityId<"AttendanceRecordId"> {
    private constructor(value: string) {
        super(value);
    }

    static create(value: string): AttendanceRecordId {
        return new AttendanceRecordId(value);
    }
}
