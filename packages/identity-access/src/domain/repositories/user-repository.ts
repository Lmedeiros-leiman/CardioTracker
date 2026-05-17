import type { Email } from "@cardio-tracker/shared-kernel";
import type { User } from "../entities/user/user.ts";
import type { UserId } from "../entities/user/user-id.ts";

export interface IUserRepository {
    findById(id: UserId): Promise<User | null>;
    findByEmail(email: Email): Promise<User | null>;
    save(user: User): Promise<void>;
}
