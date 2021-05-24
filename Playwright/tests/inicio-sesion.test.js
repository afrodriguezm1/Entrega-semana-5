const faker = require("faker");
const { url: URL, screenshotFolder } = require("../config.json");
const { USER_ADMIN } = require("./user_mock");
const FEATURE_FOLDER = "feature6";

const logins = [
  [
    "No debe inciar sesión, campos vacios",
    {
      scenario: 1,
      email: "",
      password: "",
    },
  ],
  [
    "No debe inciar sesión, correo no valido (correo generado con faker) y password no valido (string generado con faker)",
    {
      scenario: 2,
      email: faker.internet.email(),
      password: faker.random.words(10),
    },
  ],
  [
    "No debe inciar sesión, correo valido  y password no valido (string generado con faker)",
    {
      scenario: 3,
      email: USER_ADMIN.userEmail,
      password: faker.random.words(2),
    },
  ],
  [
    "No debe inciar sesión, correo valido (generado con faker) y password vacio",
    {
      scenario: 4,
      email: USER_ADMIN.userEmail,
      password: "",
    },
  ],
];

describe(`${FEATURE_FOLDER}:  Inicio de sesion Ghost Admin`, () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${URL}/ghost/#/signin`);
  });

  test.each(logins)("Scenario %#: %s", async (description, login) => {
    await page.fill("#ember8", login.email);
    await page.fill("#ember10", login.password);
    await page.click("#ember12");
    const url = await page.url();
    expect(url.includes("signin")).toBeTruthy();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${login.scenario}/1.png`,
    });
  });

  test(`Scenario ${logins.length + 1}: Success LogIn`, async () => {
    await page.fill("#ember8", USER_ADMIN.userEmail);
    await page.fill("#ember10", USER_ADMIN.userPassword);
    await page.click("#ember12");
    await page.waitForNavigation();
    const url = await page.url();
    expect(url).toEqual(`${URL}/ghost/#/site`);
    expect(url.includes("site")).toBeTruthy();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/1.png`,
    });
  });

  afterEach(async () => {
    await page.close();
  });
});
