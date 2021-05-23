const USERS = require("../mocks/users.json");

const USER_ADMIN = USERS[0];
const VALID_USERS = USERS.slice(1, USERS.length);

async function iniciarSesion(page, url) {
  await page.goto(`${url}/ghost/#/signin`);
  await page.fill("#ember8", USER_ADMIN.userEmail);
  await page.fill("#ember10", USER_ADMIN.userPassword);
  await page.click("#ember12");
  await page.waitForNavigation();
}

module.exports = {
  USER_ADMIN,
  VALID_USERS,
  iniciarSesion,
};
