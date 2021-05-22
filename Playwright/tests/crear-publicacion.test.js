const { url: URL, screenshotFolder } = require("../config.json");
const { iniciarSesion } = require("./user_mock");
const FEATURE_FOLDER = "feature7";

describe(`${FEATURE_FOLDER}: Creacion de publicaciones`, () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await iniciarSesion(page, URL);
  });

  beforeEach(async () => {
    await page.goto(`${URL}/ghost/#/site`);
  });

  test("Scenario 1: Create an empty post", async () => {
    await page.click('a[title="New post"]');
    await page.click("textarea.gh-editor-title");
    await page.click("div.koenig-editor__editor-wrapper");

    await page.waitForNavigation();

    const url = await page.url();
    expect(url.includes("/editor/post/")).toBeTruthy();

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

  test("Scenario 2: Create a post with title and empty body", async () => {
    const POST_TITLE = "Primer post";
    await page.click('a[title="New post"]');
    await page.click("textarea.gh-editor-title");
    await page.fill("textarea.gh-editor-title", POST_TITLE);
    await page.click("div.koenig-editor__editor-wrapper");
    await page.waitForNavigation();
    const url = await page.url();
    const titleTextContent = await page.$eval(
      "textarea.gh-editor-title",
      (el) => el.value
    );
    expect(titleTextContent).toEqual(POST_TITLE);
    expect(url.includes("/editor/post/")).toBeTruthy();
    await page.click("div.gh-publishmenu");
    await page.click(
      "button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view"
    );
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/1.png`,
    });
  });

  test("Scenario 3: Create a post with title and body", async () => {
    const POST_TITLE = "Primer post";
    await page.click('a[title="New post"]');

    await page.click("textarea.gh-editor-title");
    await page.fill("textarea.gh-editor-title", POST_TITLE);

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
    expect(titleTextContent).toEqual(POST_TITLE);
    expect(url.includes("/editor/post/")).toBeTruthy();

    await page.click("div.gh-publishmenu");
    await page.click(
      "button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view"
    );
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/1.png`,
    });
  });
});
