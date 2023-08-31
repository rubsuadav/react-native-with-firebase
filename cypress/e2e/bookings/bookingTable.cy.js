/// <reference types="cypress" />

describe("render the tables screen", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5000/");
    cy.wait(1000);
    cy.get("div[class='css-146c3p1']").eq(2).click();
    cy.wait(1000);
    cy.get("div[class='css-146c3p1']").eq(-3).click();
  });

  it("can't booking tables", () => {
    cy.wait(1000);
    cy.get("div[class='css-146c3p1']").eq(-2).click();
    cy.get("input[placeholder='Escribe tu teléfono móvil']").clear();

    //ponemos horas con texto para mensaje NaN y salte validacion
    cy.get("span[class='css-1jxf684']").eq(-1).click();
    cy.get(
      "button[class='css-175oi2r r-1otgn73 r-1loqt21 r-bnwqim r-1udh08x r-1awozwy r-16y2uox r-1777fci']"
    ).click();
    cy.get("input[placeholder='00']").eq(0).clear().type("gfsag");
    cy.get("input[placeholder='00']").eq(1).clear().type("gfsag");
    cy.get("button[class='css-175oi2r r-1otgn73 r-1loqt21 r-bnwqim r-1udh08x']")
      .eq(2)
      .click()
      .wait(1000);

    //ponemos hora anterior a la actual para que salte validacion
    cy.get("span[class='css-1jxf684']").eq(-1).click();
    cy.get(
      "button[class='css-175oi2r r-1otgn73 r-1loqt21 r-bnwqim r-1udh08x r-1awozwy r-16y2uox r-1777fci']"
    ).click();
    cy.get("input[placeholder='00']").eq(0).clear().type("12");
    cy.get("input[placeholder='00']").eq(1).clear().type("14");
    cy.get("button[class='css-175oi2r r-1otgn73 r-1loqt21 r-bnwqim r-1udh08x']")
      .eq(2)
      .click()
      .wait(1000);

    //diferentes CU de booking según teléfonos invalidos
    cy.fixture("bookings.json").then((datos) => {
      datos.bookings.forEach((booking) => {
        cy.get("input[placeholder='Escribe tu teléfono móvil']")
          .type(booking.phone)
          .then(() => {
            cy.get("div[class='css-146c3p1']").eq(-3).click();
            cy.wait(1000);
            cy.get("input[placeholder='Escribe tu teléfono móvil']").clear();
          });
      });
    });
  });
});
