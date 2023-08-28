/// <reference types="cypress" />

describe("render the app", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5000/");
  });

  it("should be stay in login page", () => {
    cy.get(".css-146c3p1").should("be.visible");
  });
});
