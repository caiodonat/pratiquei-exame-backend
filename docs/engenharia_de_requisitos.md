# Engenharia de requisitos

## Historia do usuário

- Como **Usuário** (comum), eu quero gerar um **Exame** para uma determinada matéria.
- Como **Usuário** (comum), eu desejo salvar um **Exame** (gerado) para praticar novamente mais tarde.
- Como **Usuário** (comum), eu desejo submeter novas **Questões**.
  - **Questões** do tipo múltipla escolha, com apenas uma ou varias opções corretas.
- Como **Usuário** (admin), eu desejo avaliar toda nova **Questão**, antes delas serem usadas na geração de **Exame**.
- Como **Usuário** (admin), eu desejo tornar um **Usuário** (comum) em um **Usuário** (admin).

## Requisitos funcionais

1. O sistema deve permitir a geração de exames para matérias específicas
2. O sistema deve permitir que usuários salvem exames gerados para uso posterior
3. O sistema deve permitir que usuários submetam novas questões de múltipla escolha
4. O sistema deve implementar um fluxo de aprovação para novas questões por usuários admin
5. O sistema deve permitir a administração de perfis de usuários (promoção para admin)
6. O sistema deve gerenciar cursos e seus tópicos relacionados

## Requisitos não funcionais

1. **Segurança**: O sistema deve implementar autenticação JWT para proteger as rotas
2. **Desempenho**: O tempo de resposta para geração de exames não deve ultrapassar 3 segundos
3. **Escalabilidade**: O sistema deve suportar até 1000 usuários simultâneos
4. **Disponibilidade**: O sistema deve estar disponível 99.9% do tempo

### Rotas

- `/api/courses` | Gestão **Cursos**.
  - `POST /full` | Cadastrar **Curso** e seus **Tópicos**.
  - `GET /unique` | Obter dados de um **Curso**.
  - `GET /search` | Pesquisar **Cursos**.
  - `PATCH /full/unique` | Atualizar cadastro de um **Curso** e seus **Tópicos**.

- `/api/exams` | Gestão **Exames**
  - `/api/exams/save? unique & user_id` | Adicionar um **Exame** na lista de salvos do **Usuário**.
  - `/api/exams/saved? user_id` | Obter lista de **Exames** salvos do **Usuário**

- `/api/questions` | Gestão de **Questões**
  - `POST /` | Submeter nova **Questão**
  - `POST /approve?unique&user_id` | Aprovar uma **Questão** específica
  - `POST /reject?unique&user_id` | Rejeitar uma **Questão** específica
  - `GET /search` | Pesquisar **Questões** por curso/tópico
    - `?course_id` filtrar por **Curso**
    - `?topic_id` filtrar por **Tópico**
    - `?status` filtrar por status (aprovada/rejeitada)

### Funcionalidades

- [ ] Gestão de **Usuários**
  - [ ] **Cadastro de Usuário**: Permitir que novos usuários se registrem no sistema.
  - [ ] **Login de Usuário**: Permitir que usuários existentes façam login.
  - [ ] **Atualização de Usuário**: Permitir que usuários atualizem suas informações.
  - [ ] **Alterar cargo de Usuário**: Permitir que um usuário admin promova ou remova outro usuário a admin.
  - [ ] **Listagem de Usuários**: Permitir que um usuário admin visualize todos os usuários cadastrados.
  - [ ] **Desativação de Usuário**: Permitir que um usuário admin desabilite um cadastro de **Usuário**.
  - [ ] **Visualização de Usuário**: Permitir que um usuário visualize os detalhes de um **Usuário** específico.

## Modelo de Dados

### Entidades principais

- **Usuário**: Informações de cadastro e nível de acesso (comum/admin)
- **Curso**: Informações sobre matérias disponíveis
- **Tópico**: Subtemas de um curso, ou tópicos de estudo
- **Questão**: Perguntas de múltipla escolha com suas opções
- **Exame**: Coleção de questões geradas para um curso específico
