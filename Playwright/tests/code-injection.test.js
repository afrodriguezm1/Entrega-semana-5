const faker = require("faker");
const { url: URL, screenshotFolder } = require("../config.json");
const { iniciarSesion } = require("./user_mock");
const FEATURE_FOLDER = "feature11";

const escenariosGeneracionDatos = [
  [
    "Debe guardar texto aleatorio al header",
    { title: faker.lorem.text(), scenario: 1 },
  ],
  /*[
    "Debe guardar texto aleatorio con links al header",
    {
      title: faker.image.imageUrl(),
      scenario: 2,
    },
  ],*/
];

describe.skip(`${FEATURE_FOLDER}: Creacion de publicaciones`, () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await iniciarSesion(page, URL);
  });

  beforeEach(async () => {
    await page.goto(`${URL}/ghost/#/settings/code-injection`);
  });

  test.each(escenariosGeneracionDatos)(
    "Scenario %#: %s",
    async (description, content) => {
      content.scenario > 1 && (await new Promise((r) => setTimeout(r, 500)));
      await page.click("div#ghost-head>textarea");

      await page.fill("div#ghost-head>textarea", content.title);
      console.log("2");

      const url = await page.url();
      expect(url.includes("/settings/code")).toBeTruthy();

      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${content.scenario}/1.png`,
      });

      await page.click("text=Save");

      await new Promise((r) => setTimeout(r, 200));
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${content.scenario}/2.png`,
      });
    },
    3000
  );
});
