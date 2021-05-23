const { url: URL, screenshotFolder } = require("../config.json");
const { iniciarSesion } = require("./user_mock");
const FEATURE_FOLDER = "feature2";

const members = [
  [
    {
      name: "",
      labels: "",
      email: "",
      note: "",
      suscribed: true,
      error: 'response - "Please enter an email"',
      scenario: 1,
    },
  ],

  [
    {
      name: "",
      labels: " ",
      email: " ",
      note: " ",
      suscribed: true,
      error: 'response - "Please enter an email"',
      scenario: 2,
    },
  ],

  [
    {
      name: "a",
      labels: "a",
      email: "a@a.com",
      note: "jkkbhkjhbkhbkhbkhbkhbkhbkhbkhbkhjbkbhjbhbhbhbhbhbhbhbhbhbhbhbhbh bkhbkhjbkbhjbhbhbbkhbkhjbkbhjbhbhbjbkbhjbhbhb",
      suscribed: true,
      error: 'response - "Note is too long"',
      scenario: 3,
    },
  ],
];

describe(`${FEATURE_FOLDER}: Create new member\n\tAs an admin I want to add a new member.`, () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await iniciarSesion(page, URL);
  });

  beforeEach(async () => {
    await page.goto(`${URL}/ghost/#/members`);
  });

  test.each(members)(
    "Scenario %#: Create member failed with wrong input",
    async function (member) {
      // Given I go to the memebers on ghost admin site
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${member.scenario}/1.png`,
      });

      // When I click "New member"
      await page.click("text=New member");
      await page.waitForLoadState();

      //expect(true).toEqual(false);

      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${member.scenario}/2.png`,
      });

      // And I fill with '${members[i].name}', '${members[i].labels}',
      //'${members[i].email}', '${members[i].note}' and '${members[i].suscribed}'`
      await page.fill('input[name="name"]', member.name);
      await page.fill('input[name="email"]', member.email);
      await page.fill('textarea[name="note"]', member.note);
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${member.scenario}/3.png`,
      });

      // And I try to save
      await page.click("text=Save");
      //await page.waitForLoadState();

      // Then I expect to see ${members[i].error}
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${member.scenario}/4.png`,
      });
    }
  );

  test(`Scenario ${
    members.length + 1
  }: Create member succes with correct input`, async () => {
    await page.goto(`${URL}/ghost/#/members`);

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        members.length + 1
      }/1.png`,
    });

    // When I click "New member"
    await page.click("text=New member");
    //await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        members.length + 1
      }/2.png`,
    });

    // And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`
    await page.fill('input[name="name"]', "A");
    await page.fill('input[name="email"]', "a@a.com");
    await page.fill('textarea[name="note"]', "Notas");
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        members.length + 1
      }/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    //await page.waitForLoadState();

    // Then I expect to see member correctly saved
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        members.length + 1
      }/4.png`,
    });
  });

  test(`Scenario ${
    members.length + 2
  }: Create member failed with an already member email`, async () => {
    // Given I go to the memebers on ghost admin site
    await page.goto(`${URL}/ghost/#/members`);

    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        members.length + 2
      }/1.png`,
    });

    // When I click "New member"
    await page.click("text=New member");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        members.length + 2
      }/2.png`,
    });

    // And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`
    await page.fill('input[name="name"]', "A");
    await page.fill('input[name="email"]', "a@a.com");
    await page.fill('textarea[name="note"]', "Notas");
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        members.length + 2
      }/3.png`,
    });

    // And I try to save
    await page.click("text=Save");
    await page.waitForLoadState();

    // Then I expect to see "Validation error, cannot save member.
    // Member already exists Attempting to add member with existing email address.
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${
        members.length + 2
      }/4.png`,
    });
  });
});
