import type { ProgramEnrollmentId } from "../entities/program-enrollment/program-enrollment-id.ts";
import type { CarePlan } from "../entities/care-plan/care-plan.ts";
import type { CarePlanId } from "../entities/care-plan/care-plan-id.ts";

export interface ICarePlanRepository {
    findById(id: CarePlanId): Promise<CarePlan | null>;
    findByEnrollmentId(id: ProgramEnrollmentId): Promise<CarePlan | null>;
    save(carePlan: CarePlan): Promise<void>;
}
