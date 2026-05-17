import { Entity, type Email } from "@cardio-tracker/shared-kernel";
import type { UserId } from "./user-id.ts";
import type { UserPrincipal } from "./value-objects/user-principal.ts";

// --- State union ---

type PendingVerificationState = {
    status: "pending_verification";
};

type ActiveState = {
    status: "active";
};

type SuspendedState = {
    status: "suspended";
    suspendedAt: Date;
    reason?: string;
};

type UserState = PendingVerificationState | ActiveState | SuspendedState;

// ---

type BaseUserProps = {
    email: Email;
    principal: UserPrincipal;
};

export type UserProps = BaseUserProps & UserState;

export type CreateUserProps = {
    email: Email;
    principal: UserPrincipal;
};

export type UserStatus = UserState["status"];

export class User extends Entity<UserId, UserProps> {
    private constructor(id: UserId, props: UserProps) {
        super(id, props);
    }

    static create(id: UserId, props: CreateUserProps): User {
        return new User(id, {
            email:     props.email,
            principal: props.principal,
            status:    "pending_verification",
        });
    }

    static restore(id: UserId, props: UserProps): User {
        return new User(id, props);
    }

    get email(): Email               { return this.props.email; }
    get principal(): UserPrincipal   { return this.props.principal; }
    get status(): UserStatus         { return this.props.status; }
    get isActive(): boolean          { return this.props.status === "active"; }

    get suspendedAt(): Date | undefined {
        return this.props.status === "suspended" ? this.props.suspendedAt : undefined;
    }

    get suspensionReason(): string | undefined {
        return this.props.status === "suspended" ? this.props.reason : undefined;
    }
}
