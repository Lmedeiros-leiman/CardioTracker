import { err, ok, type Result } from "neverthrow";

type BaseGoalProps = {
    description: string;
    targetDate?: Date;
};

type ActiveGoalState    = { status: "active" };
type AchievedGoalState  = { status: "achieved"; achievedAt: Date };
type SuspendedGoalState = { status: "suspended"; suspendedAt: Date; reason?: string };
type CancelledGoalState = { status: "cancelled"; cancelledAt: Date; reason?: string };

type GoalState = ActiveGoalState | AchievedGoalState | SuspendedGoalState | CancelledGoalState;

export type GoalProps   = BaseGoalProps & GoalState;
export type GoalStatus  = GoalState["status"];

export type GoalError = { kind: "empty_description" };

export class Goal {
    readonly #props: GoalProps;

    private constructor(props: GoalProps) {
        this.#props = props;
    }

    static create(description: string, targetDate?: Date): Result<Goal, GoalError> {
        const trimmed = description.trim();
        if (!trimmed) return err({ kind: "empty_description" });
        return ok(new Goal({ status: "active", description: trimmed, targetDate }));
    }

    static restore(props: GoalProps): Goal {
        return new Goal(props);
    }

    get status(): GoalStatus           { return this.#props.status; }
    get description(): string          { return this.#props.description; }
    get targetDate(): Date | undefined { return this.#props.targetDate; }

    get achievedAt(): Date | undefined {
        return this.#props.status === "achieved" ? this.#props.achievedAt : undefined;
    }
    get suspendedAt(): Date | undefined {
        return this.#props.status === "suspended" ? this.#props.suspendedAt : undefined;
    }
    get cancelledAt(): Date | undefined {
        return this.#props.status === "cancelled" ? this.#props.cancelledAt : undefined;
    }
    get reason(): string | undefined {
        return (this.#props.status === "suspended" || this.#props.status === "cancelled")
            ? this.#props.reason
            : undefined;
    }
}
