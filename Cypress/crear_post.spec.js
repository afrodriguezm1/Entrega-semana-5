const URL_ABP = "http://localhost:2368/ghost/#/signin";
context("Inicio de sesion", () => {
  beforeEach(() => {
    cy.visit(URL_ABP);
    cy.get("#ember8").type("nf.ortiz@uniandes.edu.co");
    cy.get("#ember10").type("elfer-Fern@nd0");
    cy.get("#ember12").click();
  });

  it("Crear publicacion vacia", () => {
    cy.location("hash").should("equal", "#/dashboard");
    cy.get('a[title="New post"]').click(); // Ecntra el crear publicacion
    cy.location("hash").should("equal", "#/editor/post");

    cy.intercept("POST", "/ghost/api/canary/admin/posts/", {}).as("createPost");

    cy.get("textarea.gh-editor-title").click(); // Click en el titulo
    cy.get("div.koenig-editor__editor-wrapper").click();

    cy.wait("@createPost");
    cy.location("hash").should("include", "#/editor/post/");

    cy.get("div.gh-publishmenu").click(); // click en publicar
    cy.get("button#ember96").click(); // Clic en publicar
  });

  it("Crear publicacion vacia", () => {
    cy.location("hash").should("equal", "#/dashboard");
    cy.get('a[title="New post"]').click(); // Ecntra el crear publicacion
    cy.location("hash").should("equal", "#/editor/post");

    cy.get("textarea.gh-editor-title").click().type("Primer post"); // Click en el titulo
    cy.wait(1000);
    cy.get("div.koenig-editor__editor-wrapper").click();
    cy.get("div.koenig-editor__editor-wrapper").type("Contenido");

    cy.location("hash").should("include", "#/editor/post/");

    cy.get("div.gh-publishmenu").click(); // click en publicar
    cy.get("button#ember96").click(); // Clic en publicar
  });

  it("Crear publicacion vacia", () => {
    cy.location("hash").should("equal", "#/dashboard");
    cy.get('a[title="New post"]').click(); // Ecntra el crear publicacion
    cy.location("hash").should("equal", "#/editor/post");

    cy.get("textarea.gh-editor-title")
      .click()
      .type(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ); // Click en el titulo
    cy.wait(500);
    cy.get("div.koenig-editor__editor-wrapper").click();
    cy.get("div.koenig-editor__editor-wrapper").type("Contenido");

    cy.location("hash").should("include", "#/editor/post");

    cy.get("div.gh-publishmenu").click(); // click en publicar
    cy.get("button#ember96").click(); // Clic en publicar
  });
});
