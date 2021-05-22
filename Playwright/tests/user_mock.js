const VALID_USER = {
  userName: "Andrés Rodriguez",
  userEmail: "af.rodriguezm1@uniandes.edu.co",
  userPassword: "contrasenia",
};

async function iniciarSesion(page, url) {
  await page.goto(`${url}/ghost/#/signin`);
  await page.fill("#ember8", VALID_USER.userEmail);
  await page.fill("#ember10", VALID_USER.userPassword);
  await page.click("#ember12");
  await page.waitForNavigation();
}

module.exports = {
  VALID_USER,
  iniciarSesion,
};
