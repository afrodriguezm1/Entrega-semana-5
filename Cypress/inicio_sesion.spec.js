/// <reference types="cypress" />

const URL_ABP = "http://localhost:2368/ghost/#/signin";
context("Inicio de sesion", () => {
  beforeEach(() => {
    cy.visit(URL_ABP);
  });

  it("Inicio de sesion vacio, no debe continuar", () => {
    cy.get("#ember12").click();
    cy.location("href").should("equal", URL_ABP);
  });

  it("Inicio de sesion exitoso", () => {
    cy.get("#ember8").type("nf.ortiz@uniandes.edu.co");
    cy.get("#ember10").type("elfer-Fern@nd0");
    cy.get("#ember12").click();
    cy.location("hash").should("equal", "#/dashboard");
  });

  it("Inicio de sesion condatos invalidos", () => {
    cy.get("#ember8").type("nf.ortiz@uniandes.edu.co");
    cy.get("#ember10").type("not a password");
    cy.get("#ember12").click();
    cy.location("href").should("equal", URL_ABP);
  });
});
