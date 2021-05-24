const { url: URL, screenshotFolder } = require("../config.json");
const { iniciarSesion } = require("./user_mock");
const FEATURE_FOLDER = "feature5";

describe(`${FEATURE_FOLDER}: Pages\n\tAs an admin I want to add a new page to the site.`, () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await iniciarSesion(page, URL);
  });

  beforeEach(async () => {
    await page.goto(`${URL}/ghost/#/pages`);
  });

  test(`Scenario 1: Create Page with invalid input`, async () => {
    await page.goto(`${URL}/ghost/#/pages`)

    await page.click('text="New page"');
    await page.click("textarea.gh-editor-title");
    await page.click("div.koenig-editor__editor-wrapper");

    await page.waitForNavigation();

    const url = await page.url();
    expect(url.includes("/editor/page/")).toBeTruthy();

    const titleTextContent = await page.$eval(
      "textarea.gh-editor-title",
      (el) => el.value
    );
    expect(titleTextContent).toEqual("(Untitled)");

    await page.click("div.gh-publishmenu");
    await page.click(
      "button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view"
    );
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/1.png`,
    });
  });

  test("Scenario 2: Create a page with title and empty body", async () => {
    const PAGE_TITLE = "Primer page";
    await page.click('text="New page"');
    await page.click("textarea.gh-editor-title");
    await page.fill("textarea.gh-editor-title", PAGE_TITLE);
    await page.click("div.koenig-editor__editor-wrapper");
    await page.waitForNavigation();
    const url = await page.url();
    const titleTextContent = await page.$eval(
      "textarea.gh-editor-title",
      (el) => el.value
    );
    expect(titleTextContent).toEqual(PAGE_TITLE);
    expect(url.includes("/editor/page/")).toBeTruthy();
    await page.click("div.gh-publishmenu");
    await page.click(
      "button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view"
    );
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/1.png`,
    });
  });

  test("Scenario 3: Create a post with title and body", async () => {
    await page.click('text="New page"');

    await page.click("textarea.gh-editor-title");
    await page.fill("textarea.gh-editor-title", "ALgoooo");

    await page.click("div.koenig-editor__editor-wrapper");
    await page.fill(
      "div.koenig-editor__editor.__mobiledoc-editor",
      "Contenido"
    );

    await page.waitForNavigation();
    const url = await page.url();

    const titleTextContent = await page.$eval(
      "textarea.gh-editor-title",
      (el) => el.value
    );
    expect(titleTextContent).toEqual("ALgoooo");
    expect(url.includes("/editor/page/")).toBeTruthy();

    await page.click("div.gh-publishmenu");
    await page.click(
      "button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view"
    );
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/1.png`,
    });
  });

  test("Scenario 4: Create a post with wrong title", async () => {
    await page.click('text="New page"');

    await page.click("textarea.gh-editor-title");
    await page.fill("textarea.gh-editor-title", "123456789");

    await page.click("div.koenig-editor__editor-wrapper");
    await page.fill(
      "div.koenig-editor__editor.__mobiledoc-editor",
      "Algo"
    );

    await page.waitForNavigation();
    const url = await page.url();

    const titleTextContent = await page.$eval(
      "textarea.gh-editor-title",
      (el) => el.value
    );
    expect(titleTextContent).toEqual("123456789");
    expect(url.includes("/editor/page/")).toBeTruthy();

    await page.click("div.gh-publishmenu");
    await page.click(
      "button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view"
    );
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s4/1.png`,
    });
  });
});
