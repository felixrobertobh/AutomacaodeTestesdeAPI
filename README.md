# Automação de Testes de API com Cypress + Cucumber (BDD)

Este projeto foi desenvolvido para demonstrar uma automação de testes de APIs utilizando Cypress com suporte a BDD (Behavior Driven Development) utilizando Cucumber.

A API utilizada como base de testes é a [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

---

## Objetivo do Projeto

- Construir uma automação de testes de API utilizando Cypress.
- Implementar testes utilizando a abordagem BDD (Behavior-Driven Development) com arquivos `.feature`.
- Evidências de execução (vídeos e screenshots).

---

## Estrutura de Pastas

cypress/
e2e/
features/                # Arquivos .feature que descrevem os cenários de teste em Gherkin
api_tests/                # Testes tradicionais Cypress em JavaScript (.cy.js)
evidencias/
screenshots/              # Evidências em imagem dos testes executados
videos/                   # Evidências em vídeo dos testes executados
fixtures/
example.json              # Massa de dados para testes
support/
step_definitions/         # Implementações dos passos dos testes (Given, When, Then)
commands.js               # Comandos customizados para o Cypress
cypress.config.js              # Configurações principais do Cypress
package.json                   # Dependências e scripts de execução do projeto
README.md                      # Documentação do projeto
.gitignore                     # Arquivos e pastas ignoradas no versionamento

---

## Tecnologias Utilizadas

- Node.js
- Cypress
- Cucumber (Gherkin)
- Cypress Cucumber Preprocessor
- Esbuild Preprocessor

---

## Configurações realizadas no projeto

### Instalação de Dependências

Foram instalados os seguintes pacotes:

```bash
npm install --save-dev cypress
npm install --save-dev @badeball/cypress-cucumber-preprocessor
npm install --save-dev @bahmutov/cypress-esbuild-preprocessor
npm install --save-dev esbuild

Esses pacotes permitem que o Cypress interprete corretamente arquivos .feature escritos em Gherkin.

⸻

Arquivo cypress.config.js

Configurado para:
	•	Rodar arquivos .feature (BDD) e arquivos .cy.js (Cypress puro).
	•	Suportar screenshots e gravação de vídeos dos testes.
	•	Configurar o preprocessor para integrar Cucumber no Cypress.

const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      }));
      return config;
    },
    specPattern: [
      'cypress/e2e/features/**/*.feature',
      'cypress/e2e/api_tests/**/*.cy.js'
    ],
    supportFile: 'cypress/support/e2e.js',
    screenshotsFolder: 'cypress/evidencias/screenshots',
    videosFolder: 'cypress/evidencias/videos',
    baseUrl: 'https://jsonplaceholder.typicode.com',
    video: true,
    screenshotOnRunFailure: true}});



⸻

Arquivo cypress/support/e2e.js

Importação dos comandos customizados e dos steps:

import './commands';
import '../support/step_definitions';

⸻

Ajuste no package.json

Adição no package.json para localizar corretamente os steps:

"cypress-cucumber-preprocessor": {
  "stepDefinitions": "cypress/support/step_definitions"};

⸻

Estrutura dos Testes

Cada teste é descrito utilizando BDD:
	•	Given: Define o estado inicial
	•	When: Executa uma ação
	•	Then: Valida o resultado esperado

Exemplo de .feature para GET:

Feature: Consulta de posts existentes

  Scenario: Buscar todos os posts com sucesso
    Given que a API está disponível
    When realizo uma requisição GET para '/posts'
    Then o status da resposta deve ser 200

⸻

Exemplo de Step correspondente (get.steps.js):

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('que a API está disponível', () => {
  cy.log('Verificando se a API está disponível');
});

When('realizo uma requisição GET para {string}', (endpoint) => {
  cy.request(endpoint).as('getPostsResponse');
});

Then('o status da resposta deve ser {int}', (statusCode) => {
  cy.get('@getPostsResponse').its('status').should('eq', statusCode);
});

⸻

Evidências de Teste

O Cypress gera automaticamente:
	•	Screenshots dos testes que falharem
	•	Vídeos da execução dos testes

As evidências ficam armazenadas nas pastas:
	•	cypress/evidencias/screenshots
	•	cypress/evidencias/videos

⸻

Como rodar o projeto
	1.	Instale as dependências:

npm install

	2.	Execute o Cypress:

npx cypress open

	3.	Escolha o navegador e selecione o teste desejado (arquivo .feature ou .cy.js).

Para rodar diretamente pelo terminal:

npx cypress run

⸻

Melhorias futuras
	•	Implementar testes para novos endpoints da API.
	•	Adicionar integração contínua (CI) com GitHub Actions.
	•	Melhorar a gestão de massa de dados utilizando ferramentas como Faker.js.

-----

Conclusão

Este projeto consolida:
	•	Automação de testes de APIs utilizando Cypress e Cucumber.
	•	Estruturação de testes BDD.
	•	Geração de evidências de execução (vídeos e screenshots).

-----

Autor

Felix Samaritani

⸻