# CardioTracker — Guia para Claude Code

Bun environment.

## Stack

Monorepo Bun com TypeScript. Cada bounded context é um package separado em `packages/`.

## Convenções de domínio

- Campos privados: `#` (JS nativo), não `private` TypeScript.
- Erros de validação: `Result` do `neverthrow`. Nunca `throw` no domínio, exceto em `EntityId` e `fromTrusted` (invariantes de bug).
- Factories: `create(...)` para objetos novos, `restore(...)` para reidratação do banco, `fromTrusted(value)` em VOs para pular validação (dado vindo do banco).
- `props` nunca público em Entity. VOs nunca expõem campos raw como públicos — sempre getters.
- Entidades que não devem ser instanciadas diretamente devem ser `abstract class`.

## Decisões arquiteturais

### Transições de estado ficam nos use cases

As entidades de domínio **não expõem métodos de transição de estado** (ex: `activate()`, `cancel()`, `markPresent()`). Essa responsabilidade pertence aos use cases da camada de aplicação.

**Motivo:** use cases já precisam coordenar repositórios, autorização e efeitos colaterais. Centralizar a orquestração neles evita que o domínio precise conhecer contexto de aplicação. As entidades continuam garantindo invariantes estruturais via tipos e VOs — o que não fazem é conduzir o fluxo de negócio.

Consequência: ao implementar um use case que muda estado, ele constrói o novo `props` explicitamente e chama `restore(id, newProps)` para produzir o estado atualizado, depois persiste via repositório.

### `occurredAt` em `Encounter` vem da infra

`Encounter.create` recebe `occurredAt` como input (não gera internamente) porque é o timestamp clínico real do atendimento, fornecido pela camada de infra — não o momento de construção do objeto.
