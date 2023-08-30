/// <reference types="cypress" />

describe("render the tables screen", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5000/");
  });

  it("should render tables", () => {
    cy.wait(1000);
    cy.get("div[class='css-146c3p1']").eq(2).click();
    cy.wait(1000);
    cy.get("div[class='css-146c3p1']").eq(-3).click();
  });
});
