const { url: URL, screenshotFolder } = require("../../config.json");
const { iniciarSesion, VALID_USER } = require("../user_mock");
const FEATURE_FOLDER = "feature4";

const staff = [
  { email: "", rol: "Author", error: "Please enter an email", scenario: 1 },
  { email: " ", rol: "Editor", error: "Please enter an email", scenario: 2 },
  {
    email: VALID_USER.userEmail,
    rol: "Administrator",
    error: "A user with that email address already exists.",
    scenario: 3,
  },
];

describe(`${FEATURE_FOLDER}: Create new staff\n\tAs an admin I want to add a new staff member.`, () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await iniciarSesion(page, URL);
  });

  beforeEach(async () => {
    await page.goto(`${URL}/ghost/#/staff`);
    await page.goto(`${URL}/ghost/#/staff`);
  });

  test.each(staff)(
    "Scenario %#: Create staff failed with wrong email",
    async (member) => {
      // Given I go to the staff on ghost admin site")
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${member.scenario}/1.png`,
      });

      // When I click "Invite people"
      await page.click("text='Invite people'", { force: true });
      await page.waitForLoadState();
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${member.scenario}/2.png`,
      });

      // And I fill with '${staff[i].email}' and click on ${staff[i].rol}
      await page.fill('input[name="email"]', member.email);
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${member.scenario}/3.png`,
      });

      // And I try to Send invitation now
      await page.click("text=Send invitation now");
      await page.waitForLoadState();

      // Then I expect to see ${staff[i].error}
      await page.screenshot({
        path: `${screenshotFolder}/${FEATURE_FOLDER}/s${member.scenario}/4.png`,
      });
    }
  );

  test(`Scenario ${
    staff.length + 1
  }: Create staff succes with correct email`, async () => {
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${staff.length + 1}/1.png`,
    });

    // When I click "invite people"
    await page.click("text=Invite people");
    await page.waitForLoadState();
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${staff.length + 1}/2.png`,
    });

    // And I fill with 'prueba@prueba.com' and click on Editor`
    await page.fill('input[name="email"]', "prueba@prueba.com");
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${staff.length + 1}/3.png`,
    });

    // And I try to Send invitation now
    await page.click('div[class="modal-footer"] > button');
    await page.waitForLoadState();

    // Then I expect to see "Error sending email! Error sending email: Failed to send email.
    // No mail server found at a.com. Please check your email settings and resend the invitation."
    await page.screenshot({
      path: `${screenshotFolder}/${FEATURE_FOLDER}/s${staff.length + 1}/4.png`,
    });
  });
});
