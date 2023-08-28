/// <reference types="cypress" />

describe("render the register screen", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5000/");
  });

  it("shouldn't be register", () => {
    cy.get(".css-1jxf684")
      .should("be.visible")
      .click()
      .then(() => {
        cy.get(".css-146c3p1").should("be.visible");
      });
    cy.fixture("users.json").then((datos) => {
      datos.users.forEach((user) => {
        cy.get('input[placeholder="Nombre"]').type(user.name);
        cy.get('input[placeholder="Apellidos"]').type(user.last_name);
        cy.get('input[placeholder="Correo"]').type(user.email);
        cy.get('input[placeholder="Contraseña"]')
          .eq(-1)
          .type(user.password, { force: true });
        cy.get('input[placeholder="Confirmar contraseña"]').type(user.confirm);
        cy.get(".css-175oi2r").then(() => {
          cy.get("button").eq(1).click().wait(2000);
          cy.get("button").eq(-1).click();
          cy.get(".css-1jxf684").click();
        });
      });
    });
  });
});
