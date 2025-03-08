# Engenharia de requisitos

## Historia do usuário

- Como **Usuário** (comum), eu quero gerar um **Exame** para uma determinada matéria.
- Como **Usuário** (comum), eu desejo salvar um **Exame** (gerado) para praticar novamente mais tarde.
- Como **Usuário** (comum), eu desejo submeter novas **Questões**.
  - **Questões** do tipo múltipla escolha, com apenas uma ou varias opções corretas.
- Como **Usuário** (admin), eu desejo avaliar toda nova **Questão**, antes delas serem usadas na geração de **Exame**.
- Como **Usuário** (admin), eu desejo tornar um **Usuário** (comum) em um **Usuário** (admin).

## Requisitos funcionais

text.

## Requisitos não funcionais

### Rotas

- `/api/courses` | Gestão **Cursos**.
  - `POST /full` | Cadastrar **Curso** e seus **Tópicos**.
  - `GET /unique` | Obter dados de um **Curso**.
  - `GET /search` | Pesquisar **Cursos**.
  - `PATCH /full/unique` | Atualizar cadastro de um **Curso** e seus **Tópicos**.

- `/api/exams` | Gestão **Exames**
  - `/api/exams/save? unique & user_id` | Adicionar um **Exame** na lista de salvos do **Usuário**.
  - `/api/exams/saved? user_id` | Obter lista de **Exames** salvos do **Usuário**

- `/api/questions`
  - `POST /approve? unique & user_id`
