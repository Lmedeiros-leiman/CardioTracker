# Levantamento Inicial de Domínio e Requisitos

## Objetivo

Definir uma base de domínio para um aplicativo móvel de apoio a um programa de reabilitação cardíaca em clínica multiprofissional.

Este documento não fecha produto. Ele organiza o problema para permitir:

- modelagem do domínio
- priorização de MVP
- descoberta com profissionais de saúde
- desenho posterior de fluxos, dados e permissões

## Contexto do Problema

A clínica precisa acompanhar pacientes com condição cardiovascular ao longo de um programa estruturado de reabilitação. Esse acompanhamento não é de um único profissional. Envolve atuação coordenada de cardiologia, fisioterapia, enfermagem, nutrição, psicologia e eventualmente outros perfis.

O valor do sistema está em quatro pontos:

- consolidar dados clínicos e funcionais do paciente
- registrar atendimentos frequentes por diferentes especialidades
- permitir visão longitudinal da evolução
- suportar colaboração segura entre profissionais

## O Que é Reabilitação Cardíaca

Referências clínicas consultadas descrevem reabilitação cardíaca como um programa supervisionado, com foco em:

- treinamento e prescrição de exercício
- educação para hábitos cardioprotetores
- manejo de fatores de risco
- apoio psicossocial
- acompanhamento de evolução e adesão

Componentes recorrentes nas referências:

- avaliação inicial
- plano terapêutico individual
- exercício aeróbico e fortalecimento
- orientação nutricional
- controle de pressão, peso, glicemia e outros fatores de risco
- manejo de estresse, ansiedade e depressão
- monitoramento de sintomas e segurança

## Visão de Negócio

O produto pode ser entendido como um `care coordination system` com camada clínica, operacional e analítica.

Capacidades centrais:

- prontuário multiprofissional orientado ao programa
- agenda e execução de sessões
- registro estruturado de evolução
- monitoramento de metas e adesão
- dashboards clínicos e operacionais

## Usuários e Papéis

## Papéis assistenciais

- `Cardiologista`
  - define elegibilidade, restrições clínicas, diagnóstico, estratificação de risco, condutas médicas
- `Fisioterapeuta` ou profissional de exercício
  - conduz avaliação funcional, prescrição de exercício, progressão de carga, monitoramento durante sessões
- `Enfermeiro`
  - triagem, sinais vitais, educação, monitoramento de intercorrências, apoio à coordenação do cuidado
- `Nutricionista`
  - avaliação alimentar, plano nutricional, metas e adesão
- `Psicólogo`
  - avaliação psicossocial, barreiras de adesão, ansiedade, humor, suporte comportamental
- `Coordenador do programa`
  - acompanha adesão, faltas, indicadores do programa, comunicação entre equipe

## Papéis administrativos

- `Recepção/secretaria`
  - cadastro, agenda, confirmação, faltas
- `Gestor clínico`
  - indicadores, produtividade, qualidade do programa
- `Administrador do sistema`
  - usuários, perfis, permissões, parametrização

## Atores externos

- `Paciente`
  - pode existir em fase posterior com app próprio ou portal
- `Responsável/cuidador`
  - relevante para adesão e comunicação

## Pacientes Alvo

Casos típicos elegíveis ao programa:

- pós-infarto
- pós-angioplastia ou stent
- pós-cirurgia cardíaca
- insuficiência cardíaca
- angina
- doença arterial periférica
- valvopatias ou pós-correção valvar

Observação: os critérios exatos de elegibilidade devem ser definidos pela clínica e validados com responsável técnico.

## Jornada de Alto Nível do Paciente

## 1. Encaminhamento e triagem

- paciente chega por encaminhamento médico ou captação interna
- equipe valida elegibilidade
- coleta dados cadastrais, clínicos e documentos
- identifica riscos, restrições e urgências

## 2. Avaliação inicial multiprofissional

- avaliação médica inicial
- avaliação funcional
- sinais vitais e medidas basais
- avaliação nutricional
- avaliação psicossocial
- definição de metas clínicas e funcionais

## 3. Plano terapêutico individual

- frequência semanal
- tipos de sessão
- metas por disciplina
- alertas e restrições
- critérios de progressão e suspensão

## 4. Execução contínua do programa

- sessões supervisionadas
- registros de evolução por atendimento
- adesão, faltas, intercorrências
- atualização de metas e condutas

## 5. Reavaliações periódicas

- comparação com baseline
- revisão do plano
- decisão de progressão, manutenção, alta ou pausa

## 6. Alta ou transição

- alta por conclusão
- alta clínica
- abandono
- suspensão temporária
- encaminhamento para seguimento externo

## Fluxo Multiprofissional

O sistema precisa suportar trabalho concorrente sobre o mesmo paciente, sem perder contexto.

Exemplo de fluxo:

1. cardiologista libera paciente com restrições e metas iniciais
2. fisioterapeuta registra avaliação funcional e plano de exercícios
3. enfermagem mede sinais vitais antes e depois das sessões
4. nutricionista acompanha peso, adesão alimentar e comorbidades
5. psicologia registra barreiras emocionais e de adesão
6. coordenação acompanha faltas, risco de evasão e pendências

Necessidade central:

- todos veem uma linha do tempo unificada do paciente
- cada profissional registra em estrutura própria
- o sistema preserva autoria, data, contexto e especialidade

## Entidades de Domínio Iniciais

## Núcleo assistencial

- `Paciente`
- `Profissional`
- `Especialidade`
- `Programa de reabilitação`
- `Matrícula do paciente no programa`
- `Estratificação de risco`
- `Plano terapêutico`
- `Meta clínica/funcional/comportamental`
- `Atendimento`
- `Sessão de reabilitação`
- `Evolução multiprofissional`
- `Intercorrência`
- `Alta`

## Dados clínicos e de acompanhamento

- `Diagnóstico`
- `Comorbidade`
- `Medicação`
- `Alergia`
- `Restrição clínica`
- `Sinais vitais`
- `Antropometria`
- `Exame`
- `Resultado funcional`
- `Questionário`
- `Indicador de adesão`

## Operação

- `Agenda`
- `Presença/falta`
- `Unidade`
- `Turma` ou `grupo de sessão`
- `Notificação`
- `Anexo/documento`

## Possíveis agregados iniciais

- `Paciente`
  - dados pessoais, contatos, fatores de risco, histórico resumido
- `ProgramaEnrollment`
  - status no programa, baseline, elegibilidade, datas-chave
- `CarePlan`
  - metas, restrições, frequência, revisões
- `Encounter`
  - atendimento, autoria, tipo, evolução, medidas coletadas
- `RehabSession`
  - sessão supervisionada, exercícios, resposta do paciente, intercorrências

## Linguagem Ubíqua Inicial

Termos que precisam ter significado único no sistema:

- `programa`
- `paciente ativo`
- `avaliação inicial`
- `reavaliação`
- `sessão`
- `atendimento`
- `evolução`
- `plano terapêutico`
- `meta`
- `restrição`
- `intercorrência`
- `alta`
- `adesão`
- `abandono`

## Casos de Uso Principais

## Cadastro e elegibilidade

- cadastrar paciente
- registrar encaminhamento
- validar elegibilidade clínica
- abrir participação em programa

## Avaliação inicial

- registrar anamnese e histórico cardiovascular
- registrar sinais vitais e medidas basais
- registrar fatores de risco
- registrar avaliações por especialidade
- consolidar baseline do paciente

## Plano terapêutico

- criar plano multiprofissional
- definir metas por horizonte
- registrar restrições e alertas
- revisar plano ao longo do programa

## Operação diária

- agendar sessão individual ou em grupo
- confirmar presença, atraso, falta e cancelamento
- registrar sessão executada
- registrar tolerância ao exercício e sintomas
- registrar intercorrências e condutas tomadas

## Evolução multiprofissional

- registrar nota estruturada por especialidade
- anexar documentos ou exames
- visualizar linha do tempo unificada
- sinalizar pendências para outro profissional

## Acompanhamento e resultado

- acompanhar adesão e risco de evasão
- comparar baseline versus reavaliações
- emitir resumo de evolução
- encerrar programa com motivo de alta

## Analytics e gestão

- dashboard por paciente
- dashboard por programa
- taxa de adesão
- faltas por período
- evolução de indicadores clínicos e funcionais
- volume por especialidade

## Requisitos Funcionais Iniciais

## RF01. Gestão de pacientes

O sistema deve permitir cadastro e manutenção de pacientes com dados demográficos, contatos, convênio e contatos de emergência.

## RF02. Linha do tempo clínica integrada

O sistema deve exibir histórico cronológico consolidado de atendimentos, sessões, intercorrências, metas e reavaliações.

## RF03. Registro multiprofissional estruturado

Cada especialidade deve ter formulário próprio, sem perder interoperabilidade no prontuário unificado.

## RF04. Avaliação inicial e reavaliação

O sistema deve permitir coleta de baseline e reavaliações periódicas comparáveis.

## RF05. Plano terapêutico compartilhado

O sistema deve permitir criar, revisar e versionar plano terapêutico com metas e restrições.

## RF06. Sessões de reabilitação

O sistema deve permitir registrar sessões com data, profissional, tipo, intensidade, resposta do paciente e observações de segurança.

## RF07. Monitoramento de sinais e sintomas

O sistema deve permitir registrar sinais vitais e sintomas pré, intra e pós-sessão quando aplicável.

## RF08. Intercorrências e alertas

O sistema deve permitir registrar eventos adversos, gatilhos de atenção e alertas clínicos visíveis à equipe autorizada.

## RF09. Agenda operacional

O sistema deve permitir criar agenda por profissional, paciente, sala, turma ou sessão.

## RF10. Presença e adesão

O sistema deve permitir registrar comparecimento, faltas, justificativas e indicadores de adesão.

## RF11. Indicadores e dashboards

O sistema deve gerar visualizações por paciente, coorte, profissional, especialidade e período.

## RF12. Busca e filtros

O sistema deve permitir localizar pacientes por status, risco, profissional responsável, período e pendências.

## RF13. Controle de acesso por perfil

O sistema deve restringir visualização e edição conforme papel, especialidade e contexto assistencial.

## RF14. Auditoria

O sistema deve manter trilha de auditoria de criação, edição, autoria e acesso a dados sensíveis.

## RF15. Anexos

O sistema deve permitir anexar exames, laudos, termos e documentos relevantes.

## RF16. Alta e encerramento

O sistema deve permitir registrar alta, motivo, resultado final e orientações de continuidade.

## Requisitos Não Funcionais Iniciais

## RNF01. Segurança e privacidade

Dados de saúde são dados pessoais sensíveis. O sistema deve nascer com controles de privacidade, autenticação forte, autorização adequada, criptografia e auditoria.

## RNF02. LGPD

O produto deve suportar princípios de finalidade, necessidade, transparência, controle de acesso, retenção e rastreabilidade do tratamento de dados.

## RNF03. Disponibilidade operacional

O sistema deve funcionar bem em rotina clínica, com baixa fricção para registros curtos e frequentes.

## RNF04. UX mobile-first

O fluxo precisa ser rápido o suficiente para uso durante atendimento, inclusive em ambiente corrido.

## RNF05. Integridade de dados

O sistema deve preservar histórico, versões, autor clínico e carimbo temporal confiável.

## RNF06. Escalabilidade de modelo

O modelo de dados deve acomodar novas especialidades, novos instrumentos de avaliação e novos indicadores sem refatoração estrutural profunda.

## RNF07. Observabilidade

O backend deve permitir rastrear erros, acessos críticos e eventos operacionais relevantes.

## RNF08. Interoperabilidade futura

Mesmo que não exista integração no MVP, o domínio deve prever integração futura com prontuários, laboratórios, mensageria e dispositivos.

## Regras de Negócio Iniciais

- um paciente pode participar de mais de um programa ao longo do tempo, mas cada participação possui ciclo e status próprios
- uma sessão executada deve estar vinculada a paciente, profissional responsável, data e tipo de sessão
- restrições clínicas ativas devem ficar destacadas em qualquer tela operacional relevante
- avaliações e evoluções devem preservar autoria profissional e especialidade
- metas precisam ter status ao menos `ativa`, `atingida`, `suspensa` ou `cancelada`
- altas devem registrar motivo
- indicadores comparativos devem usar baseline explícito
- nem todo profissional pode editar toda informação clínica

## Dashboards Relevantes

## Por paciente

- frequência e adesão
- evolução de peso, pressão arterial, frequência cardíaca e outros sinais relevantes
- evolução funcional
- metas abertas versus concluídas
- eventos/intercorrências
- pendências por especialidade

## Por programa

- pacientes ativos
- taxa de adesão
- taxa de abandono
- comparecimento por período
- distribuição por risco
- evolução agregada de indicadores

## Por gestão

- produtividade por especialidade
- tempo médio até avaliação inicial
- volume de reavaliações em atraso
- pacientes sem registro recente

## Escopo Sugerido de MVP

Para não errar no produto, o MVP deve resolver coordenação clínica básica antes de perseguir analytics avançado.

## MVP fase 1

- autenticação
- cadastro de pacientes
- cadastro de profissionais e papéis
- participação do paciente no programa
- avaliação inicial simplificada
- sessões e evoluções multiprofissionais
- linha do tempo do paciente
- agenda básica
- presença/faltas
- dashboard simples de adesão e evolução

## Fase 2

- questionários padronizados
- metas compartilhadas
- alertas clínicos
- anexos
- relatórios exportáveis
- notificações

## Fase 3

- app/portal do paciente
- telemonitoramento
- integrações externas
- BI mais avançado

## Perguntas de Discovery que Ainda Precisam de Resposta

## Operação clínica

- a clínica trabalha com sessões individuais, em grupo, ou híbridas?
- quais profissionais registram em toda sessão e quais registram por reavaliação?
- quais sinais vitais são obrigatórios e em que momentos?
- quais critérios suspendem uma sessão?
- quem pode dar alta?

## Modelo assistencial

- existe protocolo fechado da clínica ou cada profissional atua com autonomia ampla?
- quais instrumentos e escalas já são usados hoje?
- quais indicadores são realmente acompanhados pela equipe?
- qual frequência típica do programa?
- existe estratificação formal de risco?

## Operação do produto

- o paciente também usará app ou só a equipe?
- haverá uso offline?
- haverá assinatura digital?
- haverá integração com ERP, prontuário externo, laboratório ou wearables?
- dashboards são operacionais, clínicos, comerciais ou todos?

## Compliance

- qual base legal de tratamento será adotada em cada fluxo?
- qual política de retenção de prontuário será exigida?
- haverá segregação por unidade ou por clínica parceira?

## Bounded Contexts Sugeridos

Se esse produto evoluir, a separação inicial mais natural é:

- `Identity and Access`
- `Patient Registry`
- `Clinical Program`
- `Scheduling`
- `Clinical Documentation`
- `Outcomes and Analytics`
- `Notifications`

Para início prático, isso ainda pode viver como modular monolith.

## Próximos Passos Recomendados

1. validar este documento com pelo menos um cardiologista e um fisioterapeuta
2. transformar perguntas abertas em roteiro de entrevista
3. extrair um glossário fechado de domínio
4. priorizar MVP em no máximo 8 a 12 fluxos
5. desenhar modelo de permissões antes de implementar prontuário
6. só depois detalhar telas e arquitetura técnica

## Fontes consultadas

- MedlinePlus, `Cardiac Rehabilitation`, última atualização em 16/10/2024: https://medlineplus.gov/cardiacrehabilitation.html
- MedlinePlus Medical Encyclopedia, `Cardiac rehabilitation`: https://medlineplus.gov/ency/patientinstructions/000791.htm
- American Heart Association, `What is Cardiac Rehabilitation?`, revisado em 24/04/2024: https://www.heart.org/en/health-topics/cardiac-rehab/what-is-cardiac-rehabilitation
- American Heart Association, `Cardiac Rehabilitation for Heart Failure`: https://www.heart.org/en/health-topics/heart-failure/treatment-options-for-heart-failure/cardiac-rehab-for-heart-failure
- NHLBI/NIH, `Heart Treatments - Cardiac rehabilitation`: https://www.nhlbi.nih.gov/health/heart-treatments-procedures
- Ministério da Saúde, `Lei Geral de Proteção de Dados Pessoais (LGPD)`: https://www.gov.br/saude/pt-br/acesso-a-informacao/lgpd

## Nota

Este documento é uma análise inicial de produto e domínio, não uma especificação clínica definitiva. Critérios assistenciais, segurança do paciente e compliance regulatório precisam ser validados com profissionais habilitados e responsável técnico da operação.
