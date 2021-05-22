const { url: URL, screenshotFolder } = require("../config.json");
const { iniciarSesion } = require("./user_mock");
const FEATURE_FOLDER = "feature3";

const tags = [
  {
    name: "",
    color: "",
    slug: "",
    description: "",
    error: 'response - "You must specify a name for the tag."',
    scenario: 1,
  },
  {
    name: " ",
    color: " ",
    slug: " ",
    description: " ",
    error: 'response - "You must specify a name for the tag."',
    scenario: 2,
  },
  {
    name: "Color",
    color: "verde",
    slug: "color",
    description: " ",
    error: 'response - "The colour should be in a valid hex format."',
    scenario: 3,
  },
  {
    name: "prueba",
    color: "112233",
    slug: "prueba",
    description:
      "hbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbjhbkjbhkjhbkjhbkbhkjhbkhbkhbhbhbkjhjkhbjkhbkhjbkjhb",
    suscribed: true,
    error: 'response - "Description cannot be longer than 500 characters."',
    scenario: 4,
  },
];

describe(`${FEATURE_FOLDER}: Create tag\n\tAs an admin I want to add a new tag.`, () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await iniciarSesion(page, URL);
  });

  beforeEach(async () => {
    await page.goto(`${URL}/ghost/#/tags`);
    await page.goto(`${URL}/ghost/#/tags`);
  });

  test.each(tags)(
    "Scenario %#: Create tag failed with wrong input",
    async (tag) => {
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${tag.scenario}/1.png`,
      });

      //  When I click "New Tag"
      await page.click("text=New tag");
      await page.waitForLoadState();
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${tag.scenario}/2.png`,
      });

      // And I fill with '${tags[i].name}', '${tags[i].color}', '${tags[i].slug}' and '${tags[i].description}
      await page.fill('input[name="name"]', tag.name);
      await page.fill('input[name="slug"]', tag.slug);
      await page.fill('textarea[name="description"]', tag.description);
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${tag.scenario}/3.png`,
      });

      // And I try to save
      await page.click("text=Save");
      await page.waitForLoadState();

      // Then I expect to see ${tags[i].error}
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${tag.scenario}/4.png`,
      });
    }
  );

  test(`Scenario ${
    tags.length + 1
  }: Create tag succes with correct input`, async () => {
    // Given I go to the tags on ghost admin site
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${tags.length + 1}/1.png`,
    });

    // When I click "New Tag"
    await page.click("text=New tag");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${tags.length + 1}/2.png`,
    });

    // And I fill with 'Prueba', '111111', 'prueba' and 'Hola'
    await page.fill('input[name="name"]', "Prueba");
    await page.fill('input[name="slug"]', "prueba");
    await page.fill('textarea[name="description"]', "Hola");
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${tags.length + 1}/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    await page.waitForLoadState();

    // Then I expect to see a tag created correctly`)
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${tags.length + 1}/4.png`,
    });
  });
});
