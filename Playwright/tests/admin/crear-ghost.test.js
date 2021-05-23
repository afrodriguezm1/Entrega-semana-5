const faker = require("faker");
const { url, screenshotFolder } = require("../../config.json");
const { USER_ADMIN } = require("../user_mock");
const FEATURE_FOLDER = "feature1";

const mySite = "My site";

const signups = [
  [
    "No debe crear admin, correo no valido (string generado con faker), password no valido (string generado con faker) y nombre del sitio (string generado con faker)",
    {
      site: faker.random.words(10),
      name: faker.random.words(10),
      email: faker.random.words(10),
      password: faker.random.words(10),
      error: "responses with error messages",
      scenario: 1,
    },
  ],
  [
    "No debe crear admin, correo vacio, password no valido (string generado con faker) y nombre del sitio (string generado con faker)",
    {
      site: faker.random.words(10),
      name: "Admin",
      email: "",
      password: faker.random.words(10),
      error: 'responses with "Invalid email"',
      scenario: 2,
    },
  ],
  [
    "No debe crear admin, correo no valido (string generado con faker), password vacio y nombre del sitio (string generado con faker)",
    {
      site: faker.random.words(10),
      name: "Admin",
      email: faker.random.words(10),
      password: "",
      error: 'responses with "Invalid email"',
      scenario: 3,
    },
  ],
  [
    "No debe crear admin, correo no valido (string generado con faker) y password no valido (string generado con faker) y nombre del sitio vacio",
    {
      site: "",
      name: "",
      email: faker.random.words(10),
      password: faker.random.words(10),
      error: 'responses with "Invalid email"',
      scenario: 4,
    },
  ],
];

describe(`${FEATURE_FOLDER}: Create new ghost\n\tAs an new user I want to create a new acount and a new Ghost in order to start my blog.`, () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${url}/ghost`);
    await page.waitForNavigation();
  });

  test.each(signups)(`Scenario %#: %s`, async (description, signup) => {
    // Given I go to the ghost admin website");
    await page.goto(`${url}/ghost`);
    await page.waitForLoadState();

    // When I open the signup screen");
    await page.click("text=Create your account");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${signup.scenario}/1.png`,
    });

    await page.fill('input[name="blog-title"]', signup.site);
    await page.fill('input[name="name"]', signup.name);
    await page.fill('input[name="email"]', signup.email);
    await page.fill('input[name="password"]', signup.password);
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${signup.scenario}/2.png`,
    });

    //  And I try to login");
    await page.click('button[type="submit"]');

    //  Then I expect to see ${signup[i].error}`);
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${signup.scenario}/3.png`,
    });
  });

  test(`Scenario ${
    signups.length + 1
  }:  Sign up succes with correct inputs`, async () => {
    await page.click("text=Create your account");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        signups.length + 1
      }/1.png`,
    });

    await page.fill('input[name="blog-title"]', mySite);
    await page.fill('input[name="name"]', USER_ADMIN.userName);
    await page.fill('input[name="email"]', USER_ADMIN.userEmail);
    await page.fill('input[name="password"]', USER_ADMIN.userPassword);
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        signups.length + 1
      }/2.png`,
    });

    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    await page.click(".gh-flow-skip");
    await new Promise((r) => setTimeout(r, 5000));

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        signups.length + 1
      }/3.png`,
    });

    expect((await page.url()).includes("ghost/#/site")).toEqual(true);
  });

  afterEach(async () => {
    await page.close();
  });
});
