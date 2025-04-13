import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

Given("que a API está disponível 4", () => {
  cy.log("API disponível");
});

When("envio uma requisição PUT para \"/posts/1\" com novo título", () => {
  cy.request({
    method: "PUT",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    body: {
      id: 1,
      title: "Título Atualizado",
      body: "Corpo do post atualizado",
      userId: 1
    }
  }).as("putResponse");
});

Then("o status da resposta deve ser 200", () => {
  cy.get("@putResponse").its("status").should("eq", 200);
});