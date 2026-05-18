import { EntityId } from "@cardio-tracker/shared-kernel";

export class OutcomeAssessmentId extends EntityId<"OutcomeAssessmentId"> {
    private constructor(value: string) {
        super(value);
    }

    static create(value: string): OutcomeAssessmentId {
        return new OutcomeAssessmentId(value);
    }
}
