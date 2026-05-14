# Referência de Backend Empresarial em JS/TS

## Resumo

Use uma referência própria, não um boilerplate único copiado inteiro.

Escolha base:
- Arquitetura: **Pragmático DDD**
- Forma do repo: **monorepo desde o início**
- Evolução técnica: **Node puro primeiro**, adicionando framework só quando a dor aparecer

Referências públicas para calibrar a estrutura, não para copiar:
- Fastify official demo: `fastify/demo` mostra práticas aceitas pela comunidade Fastify. https://github.com/fastify/demo
- `theogravity/fastify-starter-turbo-monorepo` mostra um monorepo atual com API, OpenAPI, client SDK e testes. https://github.com/theogravity/fastify-starter-turbo-monorepo
- `santiq/bulletproof-nodejs` é útil como leitura histórica, mas está velho para servir de base principal. https://github.com/santiq/bulletproof-nodejs

## Estrutura Recomendada

Comece com monorepo, mas com **um único app backend** e poucos packages.

```text
  cardiotracker/
  AGENTS.md
  package.json
  tsconfig.base.json

  apps/
    api/
      package.json
      src/
        main/
          server.ts
        modules/
          users/
            http/
            application/
            domain/
            infra/
          health/
            http/

  packages/
    shared-kernel/
      src/
        result/
        errors/
        ids/
        clock/
        testing/

    contracts/
      src/
        http/
        events/
```

Decisões estruturais:
- `apps/api` contém o sistema executável.
- Cada módulo de negócio é vertical: `domain`, `application`, `infra`, `http`.
- `packages/shared-kernel` guarda utilidade realmente compartilhável e estável.
- `packages/contracts` guarda schemas e DTOs públicos quando isso começar a existir.
- **Não** criar `packages/domain`, `packages/application`, `packages/infra` globais no dia 1. Isso fragmenta cedo demais. Primeiro modularize dentro do app; extraia package só quando houver segundo consumidor real.

## Mudanças e Interfaces

Fase 1, sem framework:
- `main/server.ts` usa `node:http`.
- Cada módulo expõe handlers puros e casos de uso.
- Persistência inicial em memória.
- Validação mínima na borda com funções explícitas ou Zod quando a borda HTTP aparecer de verdade.

Contrato interno por módulo:
- `domain`: entidades, value objects, regras, invariantes.
- `application`: casos de uso, portas, DTOs de entrada/saída.
- `infra`: repositórios e gateways concretos.
- `http`: mapeamento request/response, status code, auth, serialization.

Interface base esperada:
- Use case: `execute(input): Promise<output>`
- Repository port: `save`, `getById`, `find`, só o necessário
- HTTP handler: recebe request normalizado, chama use case, traduz erro

Evolução controlada:
1. Node puro + `node:test`
2. TypeScript estrito
3. Fastify quando rotas/middlewares/validação começarem a doer
4. Postgres + Drizzle quando memória deixar de servir
5. OpenAPI e client generation quando existir segundo cliente
6. Filas/eventos só quando houver caso real

## Plano de Testes

Cobertura mínima desde o início:
- `domain`: testes de invariantes e transições de estado
- `application`: testes com fakes de repositório/gateway
- `http`: testes de contrato por endpoint
- `infra`: testes de integração apenas quando entrar banco

Cenários obrigatórios:
- criação válida de entidade
- falha por regra de negócio
- caso de uso persistindo corretamente
- handler retornando código correto para sucesso, validação e erro de domínio
- troca de implementação de repositório sem quebrar caso de uso

## Assumptions

Defaults escolhidos:
- Linguagem: **TypeScript**, não JS solto
- Runtime: **Node**
- Package manager: **Bun**
- Repo: **monorepo**
- Estilo: **modular monolith primeiro**, não microservices
- HTTP inicial: **Node puro**
- ORM inicial: **nenhum**
- Banco inicial: **nenhum**, usar memória/fakes
- Framework alvo quando necessário: **Fastify**
- ORM alvo quando necessário: **Drizzle**
- Validação de fronteira quando necessário: **Zod**

Ponto principal:
- Para “algo de empresa”, o padrão certo não é “mais camadas”.
- É **fronteira clara, módulo vertical, teste por camada e evolução tardia de framework**.
