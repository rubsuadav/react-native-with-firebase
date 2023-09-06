/// <reference types="cypress" />

function uploadFile(fileName, contentType) {
  cy.fixture(fileName, "base64").then((fileContent) => {
    cy.get('input[type="file"]').then(($input) => {
      const blob = Cypress.Blob.base64StringToBlob(fileContent, contentType);
      const testFile = new File([blob], fileName, { type: contentType });
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
}

describe("render the chat screen", () => {
  beforeEach(() => {
    cy.viewport(1500, 800);
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
    uploadFile("espacio.png", "image/png");

    //enviar un video

    cy.get('button[type="button"]').eq(-1).click();
    uploadFile("video.mp4", "video/mp4");
    cy.wait(2000);
    cy.get('div[class="css-146c3p1 r-lrvibr"]').eq(0).click().wait(2000);
    cy.get("video").should("be.visible");
    cy.reload();
    cy.wait(1000);
    cy.get('div[class="css-146c3p1"]').eq(2).click().wait(1000);
    cy.get('div[class="css-146c3p1"]').eq(-2).click().wait(1000);

    //caso negativo de envio de video

    cy.get('button[type="button"]').eq(-1).click();
    cy.get('input[type="file"]').then(($input) => {
      const fileName = "largeVideo.mp4";
      const contentType = "video/mp4";
      const fileSizeInMB = 250;
      const blob = new Blob(["0".repeat(fileSizeInMB * 1024 * 1024)], {
        type: contentType,
      });
      const testFile = new File([blob], fileName, { type: contentType });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(testFile);
      $input[0].files = dataTransfer.files;
      $input[0].dispatchEvent(new Event("change", { bubbles: true }));
    });
    cy.wait(6000); //tiempo de espera de procesado del video
    cy.get('button[class="swal2-confirm swal2-styled"]').wait(2000).click();
  });
});
