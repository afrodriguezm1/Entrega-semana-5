const { url: URL, screenshotFolder } = require("../config.json");
const { iniciarSesion } = require("./user_mock");
const FEATURE_FOLDER = "feature5";

describe(`${FEATURE_FOLDER}: Themes\n\tAs an admin I want to add a new theme to the page.`, () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await iniciarSesion(page, URL);
  });

  beforeEach(async () => {
    await page.goto(`${URL}/settings/design`);
  });

  test(`Scenario 1: Install a new theme`, async () => {
    // Given I go to settings on ghost admin site"
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/1.png`,
    });

    // When I click Theme
    await page.click("text=Theme");
    await new Promise((r) => setTimeout(r, 3000));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/2.png`,
    });

    // And I click Install
    await page.click("text=Install", { force: true });
    await new Promise((r) => setTimeout(r, 3000));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/3.png`,
    });

    // And I click Install`
    await page.click(".gh-btn-icon", { force: true });
    await new Promise((r) => setTimeout(r, 10000));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/4.png`,
    });

    // Then I expect to see a new theme in Installed themes`
    await page.goto(`${URL}/settings/theme`);
    await new Promise((r) => setTimeout(r, 3000));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/5.png`,
    });
  });

  test(`Scenario 2: Active a new theme`, async () => {
    // Given I go to settings on ghost admin site
    await page.goto(`${URL}/settings`);
    await new Promise((r) => setTimeout(r, 3000));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/1.png`,
    });

    //  When I click Activate
    await page.click("text=ACTIVATE");
    await new Promise((r) => setTimeout(r, 3000));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/2.png`,
    });

    // Then I expect to see the new theme activated
    await page.goto(`${URL}/settings`);
    await new Promise((r) => setTimeout(r, 3000));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/3.png`,
    });
  });
});
