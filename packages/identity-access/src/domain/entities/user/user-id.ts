import { EntityId } from "@cardio-tracker/shared-kernel";

export class UserId extends EntityId<"UserId"> {
    private constructor(value: string) {
        super(value);
    }

    static create(value: string): UserId {
        return new UserId(value);
    }
}
