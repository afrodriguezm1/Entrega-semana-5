const faker = require("faker");
const { url: URL, screenshotFolder } = require("../config.json");
const { iniciarSesion } = require("./user_mock");
const FEATURE_FOLDER = "feature7";

const content = [{title: "Titulo post", content: "contenido, contenido, contenido", longTitle: "HJBkjhbkjhbkjhbkjhbkjhbkjhbkjhbkjhbkjhbkjhbkjhbkhbkjhbkjhbkjhbkjhbkjhbkjhbkhbkjhb"}, {
  title: "Titulo del post", content: "Contenido del post" ,longTitle: "HJBkjhbkjhbkjhbkjhbkjhbkjhbkjhbkjhbkjhbkjhbkjhbkhbkjhbkjhbkjhbkjhbkjhbkjhbkhbkjhb"
}]
// content = require('../mocks/publications.json')


describe(`${FEATURE_FOLDER}: Creacion de publicaciones`, () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await iniciarSesion(page, URL);
  });
  
  beforeEach(async () => {
    await page.goto(`${URL}/ghost/#/posts`);
  });

  test("Scenario 1: Create an empty post", async () => {

    await page.click('text="New post"');
    await page.click("textarea.gh-editor-title");
    await page.click("div.koenig-editor__editor-wrapper");

      await page.click("textarea.gh-editor-title");
      await page.fill("textarea.gh-editor-title", post.title);

      await page.click("div.koenig-editor__editor-wrapper");
      await page.fill(
        "div.koenig-editor__editor.__mobiledoc-editor",
        post.body
      );

    expect(titleTextContent).toEqual("(Untitled)");

      const titleTextContent = await page.$eval(
        "textarea.gh-editor-title",
        (el) => el.value
      );
      expect(titleTextContent).toEqual(
        post.title === "" ? "(Untitled)" : post.title
      );
      expect(url.includes("/editor/post/")).toBeTruthy();

  test("Scenario 2: Create an empty post", async () => {
    await page.click('text="New post"');
    await page.click("textarea.gh-editor-title");
    await page.click("div.koenig-editor__editor-wrapper");

    await page.waitForNavigation();

    const url = await page.url();
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
    await page.click('text="New post"');

    await page.click("textarea.gh-editor-title");
    await page.fill("textarea.gh-editor-title", content[1].title);

    await page.click("div.koenig-editor__editor-wrapper");
    await page.fill(
      "div.koenig-editor__editor.__mobiledoc-editor",
      aux[2].content
    );

    await page.waitForNavigation();
    const url = await page.url();

    const titleTextContent = await page.$eval(
      "textarea.gh-editor-title",
      (el) => el.value
    );
    expect(titleTextContent).toEqual(content[0].title);
    expect(url.includes("/editor/post/")).toBeTruthy();

    await page.click("div.gh-publishmenu");
    await page.click(
      "button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view"
    );
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/1.png`,
    });
  });

  test("Scenario 4: Create a post with title and body", async () => {
    await page.click('text="New post"');

    await page.click("textarea.gh-editor-title");
    await page.fill("textarea.gh-editor-title", content[0].LongTitle);

    await page.click("div.koenig-editor__editor-wrapper");
    await page.fill(
      "div.koenig-editor__editor.__mobiledoc-editor",
      content[0].content
    );

    const url = await page.url();

    const titleTextContent = await page.$eval(
      "textarea.gh-editor-title",
      (el) => el.value
    );
    expect(titleTextContent).toEqual(POST_TITLE);
    expect(url.includes("/editor/post")).toBeTruthy();

    const publishButton = await page.$$("div.gh-publishmenu");
    expect(publishButton).toEqual([]);

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s4/1.png`,
    });
  });

  test.each(content)(
    `Scenario: Create a post with tittle and body`, async (data)=> {

      await page.click('text="New post"');
  
      await page.click("textarea.gh-editor-title");
      await page.fill("textarea.gh-editor-title", data.title);
  
      await page.click("div.koenig-editor__editor-wrapper");
      await page.fill(
        "div.koenig-editor__editor.__mobiledoc-editor",
        data.content
      );
  
      await page.waitForNavigation();
      const url = await page.url();
  
      const titleTextContent = await page.$eval(
        "textarea.gh-editor-title",
        (el) => el.value
      );
      expect(titleTextContent).toEqual(data.title);
      expect(url.includes("/editor/post/")).toBeTruthy();
  
      await page.click("div.gh-publishmenu");
      await page.click(
        "button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view"
      );
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/sa/1.png`,
      });
    }
  )
  });

});
