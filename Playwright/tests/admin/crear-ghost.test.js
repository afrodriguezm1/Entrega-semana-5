const { url, screenshotFolder } = require("../../config.json");
const { VALID_USER } = require("../user_mock");
const FEATURE_FOLDER = "feature1";

const mySite = "My site";

const signups = [
  {
    site: "",
    name: "",
    email: "",
    password: "",
    error: "responses with error messages",
    scenario: 1,
  },
  {
    site: "My site",
    name: "Admin",
    email: "a@com",
    password: "1234567890",
    error: 'responses with "Invalid email"',
    scenario: 2,
  },
  {
    site: "My site",
    name: "Admin",
    email: "a@a.com",
    password: "1234",
    error: 'responses with "Invalid email"',
    scenario: 3,
  },
];

describe(`${FEATURE_FOLDER}: Create new ghost\n\tAs an new user I want to create a new acount and a new Ghost in order to start my blog.`, () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${url}/ghost`);
    await page.waitForNavigation();
  });

  test.each(signups)(
    `Scenario %#: Failed LogIn empty inputs`,
    async (signup) => {
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
    }
  );

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
    await page.fill('input[name="name"]', VALID_USER.userName);
    await page.fill('input[name="email"]', VALID_USER.userEmail);
    await page.fill('input[name="password"]', VALID_USER.userPassword);
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
