/// <reference types="cypress" />

describe("render the register screen", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5000/");
  });

  it("should be register", () => {
    cy.get(".css-1jxf684")
      .should("be.visible")
      .click()
      .then(() => {
        cy.get(".css-146c3p1").should("be.visible");
      });
    const response = cy.request("https://randomuser.me/api/");
    response.its("body").then((body) => {
      const user = body.results[0];
      const email = user.email.replace("example", "gmail");
      cy.get('input[placeholder="Nombre"]').type(user.name.first);
      cy.get('input[placeholder="Apellidos"]').type(user.name.last);
      cy.get('input[placeholder="Correo"]').type(email);
      cy.get('input[placeholder="Contraseña"]')
        .eq(-1)
        .type("password123", { force: true });
      cy.get('input[placeholder="Confirmar contraseña"]').type("password123");
      cy.get(".css-175oi2r").then(() => {
        cy.get("button").eq(1).click().wait(2000);
      });
    });
    cy.get('div[class="css-146c3p1"]')
      .eq(0)
      .click()
      .then(() => {
        cy.get('div[class="css-146c3p1"]').eq(1).click();
      });
    cy.get('button[class="swal2-confirm swal2-styled"]').click();
    cy.wait(1000);
  });
});
