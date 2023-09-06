/// <reference types="cypress" />

describe("render the chat screen", () => {
  beforeEach(() => {
    cy.viewport(1000, 800);
    cy.visit("http://127.0.0.1:5000/");
  });

  it("should can chat with the users", () => {
    cy.wait(1000);
    cy.get('div[class="css-146c3p1"]').eq(2).click().wait(1000);
    cy.get('div[class="css-146c3p1"]').eq(-2).click().wait(1000);

    //escribir un texto

    cy.get('textarea[placeholder="Escribe un mensaje"]').type("prueba");
    cy.get('button[type="button"]').eq(-1).click().wait(1000);

    //enviar una foto

    cy.get('button[type="button"]').eq(-2).click();
    cy.fixture("espacio.png").then((fileContent) => {
      cy.get('input[type="file"]').then(($input) => {
        const blob = Cypress.Blob.base64StringToBlob(fileContent, "image/png");
        const testFile = new File([blob], "espacio.png", { type: "image/png" });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        $input[0].files = dataTransfer.files;
        $input[0].dispatchEvent(new Event("change", { bubbles: true }));
      });
    });
    cy.get('button[class="swal2-confirm swal2-styled"]')
      .eq(-1)
      .click()
      .wait(1000);

    //enviar un video

    cy.get('button[type="button"]').eq(-1).click();
    cy.fixture("video.mp4", "base64").then((videoContent) => {
      cy.get('input[type="file"]').then(($input) => {
        const blob = Cypress.Blob.base64StringToBlob(videoContent, "video/mp4");
        const testFile = new File([blob], "video.mp4", { type: "video/mp4" });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        $input[0].files = dataTransfer.files;
        $input[0].dispatchEvent(new Event("change", { bubbles: true }));
      });
    });
    cy.get('button[class="swal2-confirm swal2-styled"]')
      .eq(-1)
      .click()
      .wait(1000);

    //agregar un paso extra de hacer click en el video pa verlo full screen

    //caso negativo de envio de video xq pesa mas de 200 MB
  });
});
