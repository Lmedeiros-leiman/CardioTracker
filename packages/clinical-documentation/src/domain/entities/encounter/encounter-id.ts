import { EntityId } from "@cardio-tracker/shared-kernel";

export class EncounterId extends EntityId<"EncounterId"> {
    private constructor(value: string) {
        super(value);
    }

    static create(value: string): EncounterId {
        return new EncounterId(value);
    }
}
