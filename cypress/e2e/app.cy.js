/// <reference types="cypress" />

describe("render the app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
  });

  it("should be stay in login page", () => {
    cy.get(".css-text-146c3p1").should("be.visible");
  });
});
