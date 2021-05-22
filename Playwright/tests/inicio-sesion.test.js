const { url: URL, screenshotFolder } = require("../config.json");
const { VALID_USER } = require("./user_mock");
const FEATURE_FOLDER = "feature6";

describe(`${FEATURE_FOLDER}:  Inicio de sesion Ghost Admin`, () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${URL}/ghost/#/signin`);
  });

  test("Scenario 1: Failed LogIn empty inputs", async () => {
    await page.click("#ember12");
    const url = await page.url();
    expect(url.includes("signin")).toBeTruthy();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/1.png`,
    });
  });

  test("Scenario 2: Failed LogIn wrong password", async () => {
    await page.fill("#ember8", VALID_USER.userEmail);
    await page.fill("#ember10", "not a password");
    await page.click("#ember12");
    const url = await page.url();
    expect(url.includes("signin")).toBeTruthy();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/1.png`,
    });
  });

  test("Scenario 3: Success LogIn", async () => {
    await page.fill("#ember8", VALID_USER.userEmail);
    await page.fill("#ember10", VALID_USER.userPassword);
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
