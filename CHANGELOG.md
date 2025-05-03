# Nota de atualização

## Roadmap

### v0.5.0

- [ ] Níveis de dificuldade para **Questões**
- [ ] Dashboard para **Usuários** admin

### v0.4.0

- [ ] _frontend_ mínimo para teste de _mono-repositório_

### v0.3.0

- [ ] Endpoint para geração de exames
- [ ] Validação de questões (auto correção) múltipla escolha
- [ ] Gestão de **Cursos**.
  - [ ] Cadastrar **Curso** e seus **Tópicos**.
  - [ ] Obter dados de um **Curso**.
  - [ ] Pesquisar **Cursos**.
  - [ ] Atualizar cadastro de um **Curso** e seus **Tópicos**.

### v0.2.0

- [ ] hospedar o projeto na **AWS**
  - [ ] Instância EC2
  - [ ] Balanceador de carga
  - [ ] Configuração de domínio

## v0.1.0 (????-??-??)

- [ ] Gestão de **Usuários**.
  - [ ] Login de **Usuário**.
  - [ ] Cadastrar **Usuário**.
  - [ ] Atualizar cadastro de **Usuário**.
  - [ ] Alterar papel de **Usuário**.
  - [ ] Obter **Usuário** por valor único.
  - [ ] Listar todos os **Usuários** selecionando campos.
- [ ] Sistema de autenticação.
  - [ ] Autenticar **Usuário**.
  - [ ] Criar token JWT.
  - [ ] Validar token JWT.
  - [ ] Criar middleware para validar token JWT.
- [ ] Arquitetura interna da aplicação:
  - [ ] `AppModule` dinamicamente configurável.
  - [ ] `ConfigurationModule` para configuração de variáveis de ambiente.
  - [ ] `DatabaseModule` para configuração de banco de dados dinâmica.
  - [ ] `LoggerModule` para configuração de logger.
  - [ ] Segregação de definições de entidades (tabela e `openapi`).
- [ ] Ambiente de desenvolvimento:
  - [ ] Docker para desenvolvimento (`devcontainer`).
  - [ ] Docker para produção.
  - [ ] Provedor de banco de dados (SQLite).
- [ ] Testes:
  - [ ] Testes e2e para todos _controllers_.
  - [ ] Provedor de banco de dados em memoria (SQLite).
