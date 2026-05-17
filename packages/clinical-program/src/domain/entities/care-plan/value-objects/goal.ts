import { err, ok, type Result } from "neverthrow";

export type ActiveGoalProps = {
    status: "active";
    description: string;
    targetDate?: Date;
};

export type AchievedGoalProps = {
    status: "achieved";
    description: string;
    targetDate?: Date;
    achievedAt: Date;
};

export type SuspendedGoalProps = {
    status: "suspended";
    description: string;
    targetDate?: Date;
    suspendedAt: Date;
    reason?: string;
};

export type CancelledGoalProps = {
    status: "cancelled";
    description: string;
    targetDate?: Date;
    cancelledAt: Date;
    reason?: string;
};

export type GoalProps =
    | ActiveGoalProps
    | AchievedGoalProps
    | SuspendedGoalProps
    | CancelledGoalProps;

export type GoalStatus = GoalProps["status"];

export type GoalError = { kind: "empty_description" };

export class Goal {
    readonly #state: GoalProps;

    private constructor(state: GoalProps) {
        this.#state = state;
    }

    static create(description: string, targetDate?: Date): Result<Goal, GoalError> {
        const trimmed = description.trim();
        if (!trimmed) return err({ kind: "empty_description" });
        return ok(new Goal({ status: "active", description: trimmed, targetDate }));
    }

    static restore(props: GoalProps): Goal {
        return new Goal(props);
    }

    get status(): GoalStatus             { return this.#state.status; }
    get description(): string            { return this.#state.description; }
    get targetDate(): Date | undefined   { return this.#state.targetDate; }

    get achievedAt(): Date | undefined {
        return this.#state.status === "achieved" ? this.#state.achievedAt : undefined;
    }
    get suspendedAt(): Date | undefined {
        return this.#state.status === "suspended" ? this.#state.suspendedAt : undefined;
    }
    get cancelledAt(): Date | undefined {
        return this.#state.status === "cancelled" ? this.#state.cancelledAt : undefined;
    }
    get reason(): string | undefined {
        return (this.#state.status === "suspended" || this.#state.status === "cancelled")
            ? this.#state.reason
            : undefined;
    }
}
