const { url: URL, screenshotFolder } = require("../config.json");
const { iniciarSesion } = require("./user_mock");
const FEATURE_FOLDER = "feature2";

const faker = require('faker')

describe(`${FEATURE_FOLDER}: Create new member\n\tAs an admin I want to add a new member.`, () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await iniciarSesion(page, URL);
  });

  beforeEach(async () => {
    await page.goto(`${URL}/ghost/#/members`);
  });
  
  test(`Scenario 1: Create member with invalid input`, async () => {
    await page.goto(`${URL}/ghost/#/members`);

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/1.png`,
    });

    // When I click "New member"
    await page.click("text=New member");
    //await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/2.png`,
    });

    // And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`
    await page.fill('input[name="name"]', "");
    await page.fill('input[name="email"]', "");
    await page.fill('textarea[name="note"]', "");
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    //await page.waitForLoadState();

    // Then I expect to see member correctly saved
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s1/4.png`,
    });
  });

  test(`Scenario 2: Create member with blank input`, async () => {
    await page.goto(`${URL}/ghost/#/members`);

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/1.png`,
    });

    // When I click "New member"
    await page.click("text=New member");
    //await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/2.png`,
    });

    // And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`
    await page.fill('input[name="name"]', " ");
    await page.fill('input[name="email"]', " ");
    await page.fill('textarea[name="note"]', " ");
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    //await page.waitForLoadState();

    // Then I expect to see member correctly saved
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s2/4.png`,
    });
  });

  test(`Scenario 3: Create member with worng input`, async () => {
    await page.goto(`${URL}/ghost/#/members`);

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/1.png`,
    });

    // When I click "New member"
    await page.click("text=New member");
    //await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/2.png`,
    });

    // And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`
    await page.fill('input[name="name"]', faker.lorem.sentence(200));
    await page.fill('input[name="email"]', "");
    await page.fill('textarea[name="note"]', "");
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    //await page.waitForLoadState();

    // Then I expect to see member correctly saved
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s3/4.png`,
    });
  });

  test(`Scenario 4: Create member with worng input`, async () => {
    await page.goto(`${URL}/ghost/#/members`);

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s4/1.png`,
    });

    // When I click "New member"
    await page.click("text=New member");
    //await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s4/2.png`,
    });

    // And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`
    await page.fill('input[name="name"]', faker.name.firstName());
    await page.fill('input[name="email"]', faker.lorem.sentence(200));
    await page.fill('textarea[name="note"]', "");
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s4/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    //await page.waitForLoadState();

    // Then I expect to see member correctly saved
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s4/4.png`,
    });
  });

  test(`Scenario 5: Create member with worng note input`, async () => {
    await page.goto(`${URL}/ghost/#/members`);

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s5/1.png`,
    });

    // When I click "New member"
    await page.click("text=New member");
    //await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s5/2.png`,
    });

    // And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`
    await page.fill('input[name="name"]', faker.name.firstName());
    await page.fill('input[name="email"]', faker.internet.email());
    await page.fill('textarea[name="note"]', faker.lorem.sentence(300));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s5/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    //await page.waitForLoadState();

    // Then I expect to see member correctly saved
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s5/4.png`,
    });
  });

  const emailIgual = faker.internet.email()

  test(`Scenario 6: Create member succes with correct input`, async () => {
    await page.goto(`${URL}/ghost/#/members`);

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s6/1.png`,
    });

    // When I click "New member"
    await page.click("text=New member");
    //await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s6/2.png`,
    });

    // And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`
    await page.fill('input[name="name"]', faker.name.firstName());
    await page.fill('input[name="email"]', emailIgual);
    await page.fill('textarea[name="note"]', faker.lorem.sentence(5));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s6/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    //await page.waitForLoadState();

    // Then I expect to see member correctly saved
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s6/4.png`,
    });
  });

  test(`Scenario 7: Create member failed with an already member email`, async () => {
    // Given I go to the memebers on ghost admin site
    await page.goto(`${URL}/ghost/#/members`);

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s7/1.png`,
    });

    // When I click "New member"
    await page.click("text=New member");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s7/2.png`,
    });

    // And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`
    await page.fill('input[name="name"]', faker.name.firstName());
    await page.fill('input[name="email"]', emailIgual);
    await page.fill('textarea[name="note"]', faker.lorem.sentence(2));
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s7/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    await page.waitForLoadState();

    // Then I expect to see "Validation error, cannot save member.
    // Member already exists Attempting to add member with existing email address.
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s7/4.png`,
    });
  });
});
