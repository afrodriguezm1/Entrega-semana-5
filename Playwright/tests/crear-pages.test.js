const faker = require("faker");
const { url: URL, screenshotFolder } = require("../config.json");
const { iniciarSesion } = require("./user_mock");
const FEATURE_FOLDER = "feature10";

const escenariosGeneracionDatos = [
  [
    "Debe crear page, titulo corto(string aleatorio generado con faker) y contenido corto (generado con faker)",
    { title: faker.lorem.text(), body: faker.lorem.sentence(), scenario: 1 },
  ],
  [
    "Debe crear page, titulo vacio y contenido largo (generado con faker)",
    { title: "", body: faker.lorem.sentences(100), scenario: 3 },
  ],
  [
    "Debe crear page, titulo con link(generado por faker) y contenido con link de una imagen (generado con faker) y contenido largo",
    {
      title: faker.internet.url(),
      body: `${faker.image.imageUrl()}\n${faker.lorem.sentences(100)}`,
      scenario: 4,
    },
  ],
  [
    "Create a page with title and empty body",
    { title: faker.lorem.sentences(1), body: "", scenario: 5 },
  ],
  ["Create an empty page", { title: "", body: "", scenario: 6 }],
];

describe(`${FEATURE_FOLDER}: Creacion de publicaciones`, () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await iniciarSesion(page, URL);
  });

  beforeEach(async () => {
    await page.goto(`${URL}/ghost/#/pages`);
  });

  test.each(escenariosGeneracionDatos)(
    "Scenario %#: %s",
    async (description, post) => {
      await page.click('text="New page"');

      await page.click("textarea.gh-editor-title");
      await page.fill("textarea.gh-editor-title", post.title);

      await page.click("div.koenig-editor__editor-wrapper");
      await page.fill(
        "div.koenig-editor__editor.__mobiledoc-editor",
        post.body
      );

      await page.waitForNavigation();
      const url = await page.url();

      const titleTextContent = await page.$eval(
        "textarea.gh-editor-title",
        (el) => el.value
      );
      expect(titleTextContent).toEqual(
        post.title === "" ? "(Untitled)" : post.title
      );
      expect(url.includes("/editor/page")).toBeTruthy();

      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${post.scenario}/1.png`,
      });

      await page.click("div.gh-publishmenu");
      await page.click(
        "button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view"
      );
      await new Promise((r) => setTimeout(r, 200));
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${post.scenario}/2.png`,
      });
    }
  );

  test(`Scenario ${
    escenariosGeneracionDatos.length + 1
  }: Doest not create a page with long title and long body`, async () => {
    const POST_TITLE = faker.lorem.sentences(200);
    await page.click('text="New page"');

    await page.click("textarea.gh-editor-title");
    await page.fill("textarea.gh-editor-title", POST_TITLE);

    await page.click("div.koenig-editor__editor-wrapper");
    await page.fill(
      "div.koenig-editor__editor.__mobiledoc-editor",
      faker.lorem.sentences(200)
    );

    const url = await page.url();

    const titleTextContent = await page.$eval(
      "textarea.gh-editor-title",
      (el) => el.value
    );
    expect(titleTextContent).toEqual(POST_TITLE);
    expect(url.includes("/editor/page")).toBeTruthy();

    const publishButton = await page.$$("div.gh-publishmenu");
    expect(publishButton).toEqual([]);

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        escenariosGeneracionDatos.length + 1
      }/1.png`,
    });
  }, 5000);
});
