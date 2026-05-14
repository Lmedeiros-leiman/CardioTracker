# MVP Web para Reabilitação Cardíaca Multiprofissional

## Resumo

Construir a primeira versão como **plataforma web interna para profissionais**, não app mobile. O MVP cobre coordenação clínica básica de um programa de reabilitação cardíaca com **atendimento individual**, prontuário multiprofissional estruturado, linha do tempo unificada do paciente, agenda simples, presença/faltas e dashboard individual de evolução/adesão.

Arquitetura alvo: **monólito modular** em **TypeScript/Node**, monorepo com `Bun`, seguindo a direção já registrada no repositório: separar por módulos de negócio e evoluir framework/banco apenas quando houver necessidade concreta.

## Implementação

### 1. Domínio e módulos
- Criar módulos iniciais: `identity-access`, `patient-registry`, `clinical-program`, `clinical-documentation`, `scheduling`, `outcomes`.
- Definir agregados centrais:
  - `Patient`
  - `ProgramEnrollment`
  - `CarePlan`
  - `Encounter`
  - `AttendanceRecord`
- Tratar `RehabSession` como tipo de `Encounter` no MVP, já que o escopo é só individual.
- Modelar `ClinicalRestriction`, `VitalSigns`, `FunctionalBaseline`, `ProfessionalNote`, `Discharge` como entidades/VOs associados aos agregados acima.
- Fechar glossário operacional no código e na documentação para os termos: `programa`, `matrícula`, `avaliação inicial`, `reavaliação`, `atendimento`, `evolução`, `restrição`, `adesão`, `alta`.

### 2. Fluxos do MVP
- Autenticação e sessão para equipe interna.
- Cadastro e manutenção de pacientes.
- Cadastro de profissionais com papel e especialidade.
- Abertura de participação do paciente no programa com status, datas-chave e baseline.
- Avaliação inicial simplificada por especialidade.
- Registro de atendimento/evolução por especialidade com autoria, timestamp e contexto.
- Registro de sinais vitais e observações clínicas vinculados ao atendimento.
- Linha do tempo unificada do paciente com filtros por tipo de evento e especialidade.
- Agenda individual simples por profissional e paciente.
- Presença, falta, cancelamento e justificativa.
- Encerramento do programa com motivo de alta.

### 3. Permissões e compliance
- Implementar RBAC com regra por `papel` + `especialidade`.
- Princípios do MVP:
  - recepção administra cadastro e agenda, sem editar conteúdo clínico
  - profissional assistencial cria e edita apenas seus próprios registros clínicos
  - equipe autorizada visualiza histórico clínico conforme contexto assistencial
  - gestor clínico acessa dashboards e visão operacional, sem editar condutas clínicas
  - administrador gerencia usuários, perfis e parametrização
- Auditoria obrigatória para criação/edição de registros clínicos e acessos a dados sensíveis.
- Sem assinatura digital formal no MVP; validade operacional baseada em autoria, trilha de auditoria e carimbo temporal.

### 4. Dados clínicos estruturados
- Formular cada especialidade com estrutura própria, mas normalizar envelope comum:
  - `authorProfessionalId`
  - `specialty`
  - `encounterType`
  - `occurredAt`
  - `patientId`
  - `programEnrollmentId`
  - `structuredPayload`
  - `freeTextNote`
- Definir no MVP formulários específicos para:
  - cardiologia: elegibilidade, diagnóstico, restrições, risco
  - fisioterapia/exercício: avaliação funcional, prescrição inicial, resposta ao esforço
  - enfermagem: sinais vitais, triagem, intercorrências
  - nutrição: avaliação nutricional resumida, metas iniciais
  - psicologia: avaliação psicossocial resumida, barreiras de adesão
- Manter baseline explícito para qualquer métrica comparativa exibida depois.

### 5. UX e analytics
- Entrega primária em web responsiva, otimizada para uso em desktop e tablet.
- Priorizar telas:
  - login
  - lista/busca de pacientes
  - detalhe do paciente
  - linha do tempo
  - avaliação inicial
  - novo atendimento/evolução
  - agenda
  - presença/faltas
  - encerramento de programa
- Dashboard do MVP restrito a:
  - evolução individual do paciente
  - comparecimento
  - adesão básica
  - pendências simples de registro
- Não incluir dashboards gerenciais agregados nesta fase.

## Interfaces e contratos

- `Patient`: dados demográficos, contatos, convênio, contato de emergência, fatores de risco resumidos.
- `ProgramEnrollment`: programa, status, elegibilidade, baseline, datas-chave, motivo de encerramento.
- `Encounter`: tipo, paciente, profissional, especialidade, data/hora, payload estruturado, nota livre, medidas coletadas.
- `AttendanceRecord`: agenda, presença, falta, cancelamento, justificativa.
- `CarePlan`: restrições ativas, frequência proposta, metas iniciais e revisões.
- Estados mínimos:
  - `ProgramEnrollment.status`: `pending`, `active`, `paused`, `completed`, `dropped`, `cancelled`
  - `Goal.status`: `active`, `achieved`, `suspended`, `cancelled`
  - `AttendanceStatus`: `scheduled`, `present`, `absent`, `cancelled`
- API interna do backend deve expor recursos para:
  - autenticação
  - pacientes
  - profissionais
  - matrículas em programa
  - atendimentos/evoluções
  - agenda/presença
  - dashboard do paciente

## Testes

- Domínio:
  - paciente pode ter múltiplas matrículas ao longo do tempo
  - matrícula ativa exige baseline e elegibilidade mínimas
  - alta exige motivo
  - restrição clínica ativa aparece em contexto operacional
- Aplicação:
  - profissional não edita registro clínico de outro profissional
  - recepção não altera conteúdo assistencial
  - presença/falta atualiza indicador básico de adesão
  - linha do tempo retorna eventos ordenados e tipados corretamente
- HTTP/API:
  - autenticação e autorização por papel/especialidade
  - criação de paciente, matrícula, avaliação inicial e atendimento
  - filtros da linha do tempo
  - dashboard individual com baseline e evolução
- Aceitação:
  - cadastrar paciente, matricular em programa, fazer avaliação inicial, registrar dois atendimentos, marcar presença/falta, visualizar evolução longitudinal e encerrar programa sem operação manual fora do sistema

## Assumptions

- Superfície do MVP: web interna para profissionais.
- Modelo operacional do MVP: somente atendimento individual.
- Sem app do paciente, sem offline, sem integrações externas, sem assinatura digital formal.
- Banco, ORM e framework HTTP podem começar simples, mas a modelagem já deve prever evolução para persistência relacional e integrações futuras.
- Especialidades iniciais ativas no MVP: cardiologia, fisioterapia/exercício, enfermagem, nutrição e psicologia.
