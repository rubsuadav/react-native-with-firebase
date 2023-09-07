/// <reference types="cypress" />

function accessBookingForm() {
  cy.wait(2000);
  cy.get('div[class="css-146c3p1"]').eq(2).click().wait(2000);
  cy.get('div[class="css-146c3p1"]').eq(-3).click().wait(2000);
  cy.get('div[class="css-146c3p1"]').eq(-2).click().wait(2000);
  cy.wait(1000);
}

function selectHour() {
  cy.get('span[class="css-1jxf684"]').eq(24).click();
  cy.get("button").eq(1).click();
}

function hourTest() {
  const lastTestRun = new Date().toISOString().split("T")[1].split(".")[0];
  const hoursPassed = lastTestRun.split(":")[0];
  return parseInt(hoursPassed);
}

function showTables() {
  cy.wait(2000);
  cy.get('div[class="css-146c3p1"]').eq(2).click().wait(2000);
  cy.get('div[class="css-146c3p1"]').eq(-3).click().wait(2000);
}

describe("render the tables/bookingForm screens", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5000/");
  });

  it("shouldn't book a table", () => {
    if (hourTest() >= 24) {
      accessBookingForm();

      //caso negativo de teléfono incorrecto
      cy.fixture("bookings.json").then((datos) => {
        datos.bookings.forEach((booking) => {
          cy.get('input[placeholder="Escribe tu teléfono móvil"]').type(
            booking.phone
          );
          cy.get('div[class="css-146c3p1"]').eq(-3).click().wait(1000);
          cy.get('input[placeholder="Escribe tu teléfono móvil"]').clear();
        });
      });

      //caso negativo de hora incorrecta NaN
      selectHour();
      cy.get('input[placeholder="00"]').eq(0).clear().type("wdde");
      cy.get("button").eq(3).click().wait(2000);

      //caso negativo de hora incorrecta < hora actual
      selectHour();
      const hourBeforeNow = new Date().getHours() - 1;
      cy.get('input[placeholder="00"]')
        .eq(0)
        .clear({ force: true })
        .type(hourBeforeNow, { force: true });
      cy.get("button").eq(3).click().wait(1000);
      cy.get('div[class="css-146c3p1"]').eq(-3).click().wait(2000);
      cy.get('input[placeholder="Escribe tu teléfono móvil"]').type(
        "628074495"
      );
      cy.get('div[class="css-146c3p1"]').eq(-3).click().wait(2000);

      //caso negativo de minuto incorrecta NaN
      cy.get("button").click();
      cy.get('input[placeholder="00"]')
        .eq(1)
        .clear({ force: true })
        .type("wdde", { force: true });
      cy.get("button").eq(3).click().wait(2000);
    } else {
      showTables();
    }
  });

  it("should book a table", () => {
    if (hourTest() >= 24) {
      accessBookingForm();
      cy.get('input[placeholder="Escribe tu teléfono móvil"]').type(
        "628074495"
      );
      selectHour();
      const hourAfterNow = new Date().getHours() + 1;
      cy.get('input[placeholder="00"]')
        .eq(0)
        .clear({ force: true })
        .type(hourAfterNow, { force: true });
      cy.get("button").eq(3).click().wait(1000);
      cy.get('div[class="css-146c3p1"]').eq(-3).click().wait(2000);
      cy.get('button[class="swal2-confirm swal2-styled"]').click();
    } else {
      showTables();
    }
  });
});
