# cardio-tracker-clinical-program

Clinical program bounded context for CardioTracker.

This package owns rehabilitation program participation concepts, such as program enrollment, eligibility, enrollment lifecycle, care plan restrictions, goals and discharge.

## Initial domain shape

```text
src/
  domain/
    entities/
      program-enrollment/
      care-plan/
    repositories/
    services/
  application/
    use-cases/
    dto/
    ports/
  infra/
    repositories/
    mappers/
```

Use `bun install` from the repository root to install workspace dependencies.
