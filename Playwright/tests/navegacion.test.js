const faker = require("faker");
const { url: URL, screenshotFolder } = require("../config.json");
const { iniciarSesion } = require("./user_mock");
const FEATURE_FOLDER = "feature12";

const escenariosGeneracionDatos = [
  [
    "Debe guardar texto aleatorio al header",
    { name: faker.lorem.text(), ruta: "", scenario: 1 },
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
    await page.goto(`${URL}/ghost/#/settings/design`);
  });

  test.each(escenariosGeneracionDatos)(
    "Scenario %#: %s",
    async (description, content) => {
      await page.fill(
        "#settings-navigation>div.gh-blognav-item.ember-view>input[placeholder=Label]",
        content.name
      );
      console.log("2");

      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${content.scenario}/1.png`,
      });

      await page.click(
        "#settings-navigation>div.gh-blognav-item.ember-view>button"
      );

      await new Promise((r) => setTimeout(r, 200));
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${content.scenario}/2.png`,
      });
    },
    3000
  );
});
