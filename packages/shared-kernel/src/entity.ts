import type { AnyEntityId } from "./entity-id.ts";

export abstract class Entity<TId extends AnyEntityId, TProps extends object> {
    protected readonly props: Readonly<TProps>;

    protected constructor(
        public readonly id: TId,
        props: TProps,
    ) {
        this.props = Object.freeze({ ...props });
    }

    equals(other: this): boolean {
        return this.id.equals(other.id);
    }
}
