# shared-kernel

Shared domain primitives for CardioTracker packages.

This package is source-only for now and is consumed through Bun workspace imports.

## EntityId

`EntityId<TBrand>` is the base class for typed entity identifiers.

At runtime, an ID is only a normalized string. At compile time, the brand prevents passing one entity ID where another is expected.

```ts
import { EntityId } from "@cardio-tracker/shared-kernel";

export class PatientId extends EntityId<"PatientId"> {
    private constructor(value: string) {
        super(value);
    }

    static create(value: string): PatientId {
        return new PatientId(value);
    }
}
```

`PatientId` serializes as a string through `toString()` and `toJSON()`, but TypeScript will not treat it as interchangeable with another branded ID type.

## Entity

`Entity<TId, TProps>` is the base class for domain entities.

It exposes a typed `id`, stores frozen props, and compares identity through `id.equals()`.

```ts
import { Entity } from "@cardio-tracker/shared-kernel";

type PatientProps = {
    name: string;
};

export class Patient extends Entity<PatientId, PatientProps> {
    private constructor(id: PatientId, props: PatientProps) {
        super(id, props);
    }
}
```
