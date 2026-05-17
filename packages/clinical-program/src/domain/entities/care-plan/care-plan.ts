import { Entity } from "@cardio-tracker/shared-kernel";
import { err, ok, type Result } from "neverthrow";
import type { ProgramEnrollmentId } from "../program-enrollment/program-enrollment-id.ts";
import type { CarePlanId } from "./care-plan-id.ts";
import type { ClinicalRestriction } from "./value-objects/clinical-restriction.ts";
import type { Goal } from "./value-objects/goal.ts";

export type CarePlanProps = {
    enrollmentId: ProgramEnrollmentId;
    weeklyFrequency?: number;
    restrictions: readonly ClinicalRestriction[];
    goals: readonly Goal[];
};

export type CreateCarePlanProps = CarePlanProps;

export type CarePlanError = { kind: "invalid_weekly_frequency"; value: number };

export class CarePlan extends Entity<CarePlanId, CarePlanProps> {
    private constructor(id: CarePlanId, props: CarePlanProps) {
        super(id, props);
    }

    static create(id: CarePlanId, props: CreateCarePlanProps): Result<CarePlan, CarePlanError> {
        if (props.weeklyFrequency !== undefined && props.weeklyFrequency <= 0)
            return err({ kind: "invalid_weekly_frequency", value: props.weeklyFrequency });

        return ok(new CarePlan(id, {
            ...props,
            restrictions: [...props.restrictions],
            goals:        [...props.goals],
        }));
    }

    static restore(id: CarePlanId, props: CarePlanProps): CarePlan {
        return new CarePlan(id, props);
    }

    get enrollmentId(): ProgramEnrollmentId            { return this.props.enrollmentId; }
    get weeklyFrequency(): number | undefined          { return this.props.weeklyFrequency; }
    get restrictions(): readonly ClinicalRestriction[] { return this.props.restrictions; }
    get activeRestrictions(): readonly ClinicalRestriction[] {
        return this.props.restrictions.filter(r => r.active);
    }
    get goals(): readonly Goal[]       { return this.props.goals; }
    get activeGoals(): readonly Goal[] { return this.props.goals.filter(g => g.status === "active"); }
}
