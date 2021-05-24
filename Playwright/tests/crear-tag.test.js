const { url: URL, screenshotFolder } = require("../config.json");
const { iniciarSesion } = require("./user_mock");
const FEATURE_FOLDER = "feature3";

const faker = require('faker')

const iteration = 10

var iter = []

function generateIteration() {
  for(var i = 0; i < iteration; i++){
    iter.push({index: (i + 1), option: Math.random * (4 - 1) + 1})
  }
}

describe(`${FEATURE_FOLDER}: Create tag\n\tAs an admin I want to add a new tag.`, () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await iniciarSesion(page, URL);
  });

  beforeEach(async () => {
    await page.goto(`${URL}/ghost/#/tags`);
    await page.goto(`${URL}/ghost/#/tags`);
  });

  test(`Scenario 1: Create tag failed with wrong input`, async () => {
    // Given I go to the tags on ghost admin site
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/1.png`,
    });

    // When I click "New Tag"
    await page.click("text=New tag");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/2.png`,
    });

    // And I fill with 'Prueba', '111111', 'prueba' and 'Hola'
    await page.fill('input[name="name"]', "");
    await page.fill('input[name="slug"]', "");
    await page.fill('input[name="accent-color"]', "");
    await page.fill('textarea[name="description"]', "");
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    await page.waitForLoadState();

    // Then I expect to see a tag created correctly`)
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/4.png`,
    });
  });

  test(`Scenario 2: Create tag failed with blank input`, async () => {
    // Given I go to the tags on ghost admin site
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/1.png`,
    });

    // When I click "New Tag"
    await page.click("text=New tag");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/2.png`,
    });

    // And I fill with 'Prueba', '111111', 'prueba' and 'Hola'
    await page.fill('input[name="name"]', " ");
    await page.fill('input[name="slug"]', " ");
    await page.fill('input[name="accent-color"]', " ");
    await page.fill('textarea[name="description"]', " ");
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    await page.waitForLoadState();

    // Then I expect to see a tag created correctly`)
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/4.png`,
    });
  });

  test(`Scenario 3: Create tag failed with invalid color input`, async () => {
    // Given I go to the tags on ghost admin site
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/1.png`,
    });

    // When I click "New Tag"
    await page.click("text=New tag");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/2.png`,
    });

    // And I fill with 'Prueba', '111111', 'prueba' and 'Hola'
    await page.fill('input[name="name"]', faker.name.firstName());
    await page.fill('input[name="slug"]', faker.name.firstName());
    await page.fill('input[name="accent-color"]', faker.name.firstName());
    await page.fill('textarea[name="description"]', faker.name.firstName());
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    await page.waitForLoadState();

    // Then I expect to see a tag created correctly`)
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/4.png`,
    });
  });

  test(`Scenario 4: Create tag failed with invalid description input`, async () => {
    // Given I go to the tags on ghost admin site
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s4/1.png`,
    });

    // When I click "New Tag"
    await page.click("text=New tag");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s4/2.png`,
    });

    // And I fill with 'Prueba', '111111', 'prueba' and 'Hola'
    await page.fill('input[name="name"]', faker.name.firstName());
    await page.fill('input[name="slug"]', faker.name.firstName());
    await page.fill('input[name="accent-color"]', "ffffff");
    await page.fill('textarea[name="description"]', faker.lorem.sentence(150));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s4/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    await page.waitForLoadState();

    // Then I expect to see a tag created correctly`)
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s4/4.png`,
    });
  });

  test(`Scenario 5: Create tag failed with invalid name input`, async () => {
    // Given I go to the tags on ghost admin site
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s5/1.png`,
    });

    // When I click "New Tag"
    await page.click("text=New tag");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s5/2.png`,
    });

    // And I fill with 'Prueba', '111111', 'prueba' and 'Hola'
    await page.fill('input[name="name"]', faker.lorem.sentence(150));
    await page.fill('input[name="slug"]', faker.name.firstName());
    await page.fill('input[name="accent-color"]', "ffffff");
    await page.fill('textarea[name="description"]', faker.lorem.sentence(1));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s5/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    await page.waitForLoadState();

    // Then I expect to see a tag created correctly`)
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s5/4.png`,
    });
  });

  test(`Scenario 6: Create tag failed with invalid slug input`, async () => {
    // Given I go to the tags on ghost admin site
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s6/1.png`,
    });

    // When I click "New Tag"
    await page.click("text=New tag");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s6/2.png`,
    });

    // And I fill with 'Prueba', '111111', 'prueba' and 'Hola'
    await page.fill('input[name="name"]', faker.name.firstName());
    await page.fill('input[name="slug"]', faker.lorem.sentence(150));
    await page.fill('input[name="accent-color"]', "ffffff");
    await page.fill('textarea[name="description"]', faker.lorem.sentence(1));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s6/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    await page.waitForLoadState();

    // Then I expect to see a tag created correctly`)
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s6/4.png`,
    });
  });


  test(`Scenario 7: Create tag succes with correct input`, async () => {
    // Given I go to the tags on ghost admin site
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s7/1.png`,
    });

    // When I click "New Tag"
    await page.click("text=New tag");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s7/2.png`,
    });

    // And I fill with 'Prueba', '111111', 'prueba' and 'Hola'
    await page.fill('input[name="name"]', faker.name.firstName());
    await page.fill('input[name="slug"]', faker.name.firstName());
    await page.fill('input[name="accent-color"]', "ffffff");
    await page.fill('textarea[name="description"]', faker.lorem.sentence(2));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s7/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    await page.waitForLoadState();

    // Then I expect to see a tag created correctly`)
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s7/4.png`,
    });
  });
});
