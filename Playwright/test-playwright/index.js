//Importar Playwright
const playwright = require("playwright");

const mySite = "My site";
const userName = "Andrés Rodriguez";
const userEmail = "af.rodriguezm1@uniandes.edu.co";
const userPassword = "contrasenia";
const port = "2368";
const url = `http://localhost:${port}/`;
const datetime = new Date().toISOString().replace(/:/g, ".");
//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ["chromium"]) {
    //, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType + "-------------------------------------------\n");

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    //Primer feature - escenarios

    var signup = [
      {
        site: "",
        name: "",
        email: "",
        password: "",
        error: "responses with error messages",
      },
      {
        site: "My site",
        name: "Admin",
        email: "a@com",
        password: "1234567890",
        error: 'responses with "Invalid email"',
      },
      {
        site: "My site",
        name: "Admin",
        email: "a@a.com",
        password: "1234",
        error: 'responses with "Invalid email"',
      },
    ];

    console.log(
      "Feature 1: Create new ghost\n    As an new user I want to create a new acount and a new Ghost in order to start my blog.\n"
    );
    for (var i = 0; i < signup.length; i++) {
      try {
        console.log(`  Scenario ${i + 1}: Sign up failed with wrong inputs`);
        console.log("    Given I go to the ghost admin website");
        await page.goto(url + "ghost");
        await page.waitForLoadState();

        console.log("      When I open the signup screen");
        await page.click("text=reate your account →");
        await page.waitForLoadState();
        await page.screenshot({
          path: `./screenshots/${datetime}/feature1/s${i + 1}/1.png`,
        });

        console.log(
          `      And I fill with '${signup[i].site}', '${signup[i].name}', '${signup[i].email}' and '${signup[i].password}'`
        );
        await page.fill('input[name="blog-title"]', signup[i].site);
        await page.fill('input[name="name"]', signup[i].name);
        await page.fill('input[name="email"]', signup[i].email);
        await page.fill('input[name="password"]', signup[i].password);
        await page.screenshot({
          path: `./screenshots/${datetime}/feature1/s${i + 1}/2.png`,
        });

        console.log("      And I try to login");
        await page.click('button[type="submit"]');

        console.log(`      Then I expect to see ${signup[i].error}`);
        await page.screenshot({
          path: `./screenshots/${datetime}/feature1/s${i + 1}/3.png`,
        });

        console.log("\n  --Scenario succesfully tested--\n");
      } catch (err) {
        console.log(`\n  --Feature 1 - scenario ${i + 1} failed: ${err} \n`);
      }
    }

    try {
      console.log(
        `  Scenario ${signup.length + 1}: Sign up succes with correct inputs`
      );
      console.log("    Given I go to the ghost admin website");
      await page.goto(url + "ghost");
      await page.waitForLoadState();

      console.log("      When I open the signup screen");
      await page.click("text=reate your account →");
      await page.waitForLoadState();
      await page.screenshot({
        path: `./screenshots/${datetime}/feature1/s${signup.length + 1}/1.png`,
      });

      console.log(
        `      And I fill with '${mySite}', '${userName}', '${userEmail}' and '${userPassword}'`
      );
      await page.fill('input[name="blog-title"]', mySite);
      await page.fill('input[name="name"]', userName);
      await page.fill('input[name="email"]', userEmail);
      await page.fill('input[name="password"]', userPassword);
      await page.screenshot({
        path: `./screenshots/${datetime}/feature1/s${signup.length + 1}/2.png`,
      });

      console.log("      And I try to login");
      await page.click('button[type="submit"]');
      await new Promise((r) => setTimeout(r, 7000));

      console.log("      And I try to skip");
      await page.click(".gh-flow-skip");
      await new Promise((r) => setTimeout(r, 7000));

      console.log(`      Then I expect to see the dashboard page`);
      await page.screenshot({
        path: `./screenshots/${datetime}/feature1/s${signup.length + 1}/3.png`,
      });
      if ((await page.url()) === url + "ghost/#/dashboard") {
        console.log("\n  --Scenario succesfully tested--\n\n");
      } else {
        console.log(
          `\n  --Feature 1 - scenario ${
            signup.length + 1
          } failed: No fue dirigido al dashboard \n\n`
        );
      }
    } catch (err) {
      console.log(
        `\n  --Feature 1 - scenario ${signup.length + 1} failed: ${err} \n\n`
      );
    }

    /* await page.goto(url + 'ghost/#/signin');
    await new Promise(r => setTimeout(r, 5000));
    await page.fill('input[name="identification"]', userEmail);
    await page.fill('input[name="password"]', userPassword)
    await page.click('button[type="submit"]')
    await new Promise(r => setTimeout(r, 5000)); */

    //Segundo feature
    var members = [
      {
        name: "",
        labels: "",
        email: "",
        note: "",
        suscribed: true,
        error: 'response - "Please enter an email"',
      },
      {
        name: " ",
        labels: " ",
        email: " ",
        note: " ",
        suscribed: true,
        error: 'response - "Please enter an email"',
      },
      {
        name: "a",
        labels: "a",
        email: "a@a.com",
        note: "jkkbhkjhbkhbkhbkhbkhbkhbkhbkhbkhjbkbhjbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhkhjbbbjhbkjbhkjhbkjhbkbhkjhbkhbkhbhbhbkjhjkhbjkhbkhjbkjhb",
        suscribed: true,
        error: 'response - "Note is too long"',
      },
    ];

    console.log(
      "Feature 2: Create new member\n    As an admin I want to add a new member.\n"
    );

    for (var i = 0; i < members.length; i++) {
      try {
        console.log(
          `  Scenario ${i + 1}: Create member failed with wrong input`
        );
        console.log("    Given I go to the memebers on ghost admin site");
        await page.goto(url + "ghost/#/members");
        await new Promise((r) => setTimeout(r, 3000));
        await page.screenshot({
          path: `./screenshots/${datetime}/feature2/s${i + 1}/1.png`,
        });

        console.log(`      When I click "New member" `);
        await page.click("text=New member");
        await page.waitForLoadState();
        await page.screenshot({
          path: `./screenshots/${datetime}/feature2/s${i + 1}/2.png`,
        });

        console.log(
          `      And I fill with '${members[i].name}', '${members[i].labels}', '${members[i].email}', '${members[i].note}' and '${members[i].suscribed}'`
        );
        await page.fill('input[name="name"]', members[i].name);
        await page.fill('input[name="email"]', members[i].email);
        await page.fill('textarea[name="note"]', members[i].note);
        await page.screenshot({
          path: `./screenshots/${datetime}/feature2/s${i + 1}/3.png`,
        });

        console.log("      And I try to save");
        await page.click("text=Save");
        await page.waitForLoadState();

        console.log(`      Then I expect to see ${members[i].error}`);
        await page.screenshot({
          path: `./screenshots/${datetime}/feature2/s${i + 1}/4.png`,
        });

        await page.goto(url + "ghost/#/members");
        await page.waitForLoadState();

        console.log("\n  --Scenario succesfully tested--\n");
      } catch (err) {
        console.log(`\n  --Feature 2 - scenario ${i + 1} failed: ${err} \n\n`);
      }
    }

    try {
      console.log(
        `  Scenario ${
          members.length + 1
        }: Create member succes with correct input`
      );
      console.log("    Given I go to the memebers on ghost admin site");
      await page.goto(url + "ghost/#/members");
      await new Promise((r) => setTimeout(r, 3000));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature2/s${members.length + 1}/1.png`,
      });

      console.log(`      When I click "New member" `);
      await page.click("text=New member");
      await page.waitForLoadState();
      await page.screenshot({
        path: `./screenshots/${datetime}/feature2/s${members.length + 1}/2.png`,
      });

      console.log(
        `      And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`
      );
      await page.fill('input[name="name"]', "A");
      await page.fill('input[name="email"]', "a@a.com");
      await page.fill('textarea[name="note"]', "Notas");
      await page.screenshot({
        path: `./screenshots/${datetime}/feature2/s${members.length + 1}/3.png`,
      });

      console.log("      And I try to save");
      await page.click("text=Save");
      await page.waitForLoadState();

      console.log(`      Then I expect to see member correctly saved`);
      await page.screenshot({
        path: `./screenshots/${datetime}/feature2/s${i + 1}/4.png`,
      });

      await page.goto(url + "ghost/#/members");
      await page.waitForLoadState();

      console.log("\n  --Scenario succesfully tested--\n");
    } catch (err) {
      console.log(
        `\n  --Feature 2 - scenario ${members.length + 1} failed: ${err} \n\n`
      );
    }

    try {
      console.log(
        `  Scenario ${
          members.length + 2
        }: Create member failed with an already member email`
      );
      console.log("    Given I go to the memebers on ghost admin site");
      await page.goto(url + "ghost/#/members");
      await new Promise((r) => setTimeout(r, 3000));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature2/s${members.length + 2}/1.png`,
      });

      console.log(`      When I click "New member" `);
      await page.click("text=New member");
      await page.waitForLoadState();
      await page.screenshot({
        path: `./screenshots/${datetime}/feature2/s${members.length + 2}/2.png`,
      });

      console.log(
        `      And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`
      );
      await page.fill('input[name="name"]', "A");
      await page.fill('input[name="email"]', "a@a.com");
      await page.fill('textarea[name="note"]', "Notas");
      await page.screenshot({
        path: `./screenshots/${datetime}/feature2/s${members.length + 2}/3.png`,
      });

      console.log("      And I try to save");
      await page.click("text=Save");
      await page.waitForLoadState();

      console.log(
        `      Then I expect to see "Validation error, cannot save member. Member already exists Attempting to add member with existing email address."`
      );
      await page.screenshot({
        path: `./screenshots/${datetime}/feature2/s${i + 2}/4.png`,
      });

      await page.goto(url + "ghost/#/members");
      await new Promise((r) => setTimeout(r, 3000));

      console.log("\n  --Scenario succesfully tested--\n");
    } catch (err) {
      console.log(
        `\n  --Feature 2 - scenario ${members.length + 2} failed: ${err} \n\n`
      );
    }

    // Tercer feature
    console.log(
      "Feature 3: Create tag\n    As an admin I want to add a new tag.\n"
    );

    var tags = [
      {
        name: "",
        color: "",
        slug: "",
        description: "",
        error: 'response - "You must specify a name for the tag."',
      },
      {
        name: " ",
        color: " ",
        slug: " ",
        description: " ",
        error: 'response - "You must specify a name for the tag."',
      },
      {
        name: "Color",
        color: "verde",
        slug: "color",
        description: " ",
        error: 'response - "The colour should be in a valid hex format."',
      },
      {
        name: "prueba",
        color: "112233",
        slug: "prueba",
        description:
          "jkkbhkjhbkhbkhbkhbkhbkhbkhbkhbkhjbkbhjbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhkhjbbbjhbkjbhkjhbkjhbkbhkjhbkhbkhbhbhbkjhjkhbjkhbkhjbkjhb",
        suscribed: true,
        error: 'response - "Description cannot be longer than 500 characters."',
      },
    ];

    for (var i = 0; i < tags.length; i++) {
      try {
        console.log(`  Scenario ${i + 1}: Create tag failed with wrong input`);
        console.log("    Given I go to the tags on ghost admin site");
        await page.goto(url + "ghost/#/tags");
        await new Promise((r) => setTimeout(r, 5000));
        await page.goto(url + "ghost/#/tags");
        await new Promise((r) => setTimeout(r, 5000));
        await page.screenshot({
          path: `./screenshots/${datetime}/feature3/s${i + 1}/1.png`,
        });

        console.log(`      When I click "New Tag" `);
        await page.click("text=New tag");
        await page.waitForLoadState();
        await page.screenshot({
          path: `./screenshots/${datetime}/feature3/s${i + 1}/2.png`,
        });

        console.log(
          `      And I fill with '${tags[i].name}', '${tags[i].color}', '${tags[i].slug}' and '${tags[i].description}'`
        );
        await page.fill('input[name="name"]', tags[i].name);
        await page.fill('input[name="accent-color"]', tags[i].color);
        await page.fill('input[name="slug"]', tags[i].slug);
        await page.fill('textarea[name="description"]', tags[i].description);
        await page.screenshot({
          path: `./screenshots/${datetime}/feature3/s${i + 1}/3.png`,
        });

        console.log("      And I try to save");
        await page.click("text=Save");
        await page.waitForLoadState();

        console.log(`      Then I expect to see ${tags[i].error}`);
        await page.screenshot({
          path: `./screenshots/${datetime}/feature3/s${i + 1}/4.png`,
        });

        await page.goto(url + "ghost/#/tags");
        await page.waitForLoadState();

        console.log("\n  --Scenario succesfully tested--\n");
      } catch (err) {
        console.log(`\n  --Feature 3 - scenario ${i + 1} failed: ${err} \n\n`);
      }
    }

    try {
      console.log(
        `  Scenario ${tags.length + 1}: Create tag succes with correct input`
      );
      console.log("    Given I go to the tags on ghost admin site");
      await page.goto(url + "ghost/#/tags");
      await new Promise((r) => setTimeout(r, 3000));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature3/s${tags.length + 1}/1.png`,
      });

      console.log(`      When I click "New Tag" `);
      await page.click("text=New tag");
      await page.waitForLoadState();
      await page.screenshot({
        path: `./screenshots/feature3/s${tags.length + 1}/2.png`,
      });

      console.log(
        `      And I fill with 'Prueba', '111111', 'prueba' and 'Hola'`
      );
      await page.fill('input[name="name"]', "Prueba");
      await page.fill('input[name="accent-color"]', "111111");
      await page.fill('input[name="slug"]', "prueba");
      await page.fill('textarea[name="description"]', "Hola");
      await page.screenshot({
        path: `./screenshots/${datetime}/feature3/s${tags.length + 1}/3.png`,
      });

      console.log("      And I try to save");
      await page.click("text=Save");
      await page.waitForLoadState();

      console.log(`      Then I expect to see a tag created correctly`);
      await page.screenshot({
        path: `./screenshots/${datetime}/feature3/s${tags.length + 1}/4.png`,
      });

      await page.goto(url + "ghost/#/tags");
      await new Promise((r) => setTimeout(r, 3000));

      console.log("\n  --Scenario succesfully tested--\n");
    } catch (err) {
      console.log(
        `\n  --Feature 3 - scenario ${tags.length + 1} failed: ${err} \n\n`
      );
    }

    //Cuarto feature
    console.log(
      "Feature 4: Create new staff\n    As an admin I want to add a new staff member.\n"
    );

    var staff = [
      { email: "", rol: "Author", error: "Please enter an email" },
      { email: " ", rol: "Editor", error: "Please enter an email" },
      {
        email: userEmail,
        rol: "Administrator",
        error: "A user with that email address already exists.",
      },
    ];

    for (var i = 0; i < staff.length; i++) {
      try {
        console.log(
          `  Scenario ${i + 1}: Create staff failed with wrong email`
        );
        console.log("    Given I go to the staff on ghost admin site");
        await page.goto(url + "ghost/#/staff");
        await new Promise((r) => setTimeout(r, 4000));
        await page.screenshot({
          path: `./screenshots/${datetime}/feature4/s${i + 1}/1.png`,
        });

        console.log(`      When I click "Invite people" `);
        await page.click("text='Invite people'", { force: true });
        await page.waitForLoadState();
        await page.screenshot({
          path: `./screenshots/${datetime}/feature4/s${i + 1}/2.png`,
        });

        console.log(
          `      And I fill with '${staff[i].email}' and click on ${staff[i].rol}`
        );
        await page.fill('input[name="email"]', staff[i].email);
        await page.click(`text=${staff[i].rol}`, { force: true });
        await page.screenshot({
          path: `./screenshots/${datetime}/feature4/s${i + 1}/3.png`,
        });

        console.log("      And I try to Send invitation now");
        await page.click('div[class="modal-footer"] > button');
        await page.waitForLoadState();

        console.log(`      Then I expect to see ${staff[i].error}`);
        await page.screenshot({
          path: `./screenshots/${datetime}/feature4/s${i + 1}/4.png`,
        });

        await page.goto(url + "ghost/#/staff");
        await page.waitForLoadState();

        console.log("\n  --Scenario succesfully tested--\n");
      } catch (err) {
        console.log(`\n  --Feature 4 - scenario ${i + 1} failed: ${err} \n\n`);
      }
    }

    try {
      console.log(
        `  Scenario ${staff.length + 1}: Create staff succes with correct email`
      );
      console.log("    Given I go to the staff on ghost admin site");
      await page.goto(url + "ghost/#/staff");
      await new Promise((r) => setTimeout(r, 3000));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature4/s${staff.length + 1}/1.png`,
      });

      console.log(`      When I click "invite people" `);
      await page.click("text=Invite people");
      await page.waitForLoadState();
      await page.screenshot({
        path: `./screenshots/${datetime}/feature4/s${staff.length + 1}/2.png`,
      });

      console.log(
        `      And I fill with 'prueba@prueba.com' and click on Editor`
      );
      await page.fill('input[name="email"]', "prueba@prueba.com");
      await page.click(`text=Editor`, { force: true });
      await page.screenshot({
        path: `./screenshots/${datetime}/feature4/s${staff.length + 1}/3.png`,
      });

      console.log("      And I try to Send invitation now");
      await page.click('div[class="modal-footer"] > button');
      await page.waitForLoadState();

      console.log(
        `      Then I expect to see "Error sending email! Error sending email: Failed to send email. No mail server found at a.com. Please check your email settings and resend the invitation."`
      );
      await page.screenshot({
        path: `./screenshots/${datetime}/feature4/s${staff.length + 1}/4.png`,
      });

      await page.goto(url + "ghost/#/staff");
      await page.waitForLoadState();

      console.log("\n  --Scenario succesfully tested--\n");
    } catch (err) {
      console.log(
        `\n  --Feature 4 - scenario ${staff.length + 1} failed: ${err} \n\n`
      );
    }

    console.log(
      "Feature 5: Themes\n    As an admin I want to add a new theme to the page.\n"
    );

    try {
      console.log(`  Scenario 1: Install a new theme`);
      console.log("    Given I go to settings on ghost admin site");
      await page.goto(url + "ghost/#/settings");
      await new Promise((r) => setTimeout(r, 3000));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature5/s1/1.png`,
      });

      console.log(`      When I click Theme`);
      await page.click("text=Theme");
      await new Promise((r) => setTimeout(r, 3000));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature5/s1/2.png`,
      });

      console.log(`      And I click Install`);
      await page.click("text=Install", { force: true });
      await new Promise((r) => setTimeout(r, 3000));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature5/s1/3.png`,
      });

      console.log(`      And I click Install`);
      await page.click(".gh-btn-icon", { force: true });
      await new Promise((r) => setTimeout(r, 10000));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature5/s1/4.png`,
      });

      console.log(`      Then I expect to see a new theme in Installed themes`);
      await page.goto(url + "ghost/#/settings/theme");
      await new Promise((r) => setTimeout(r, 3000));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature5/s1/5.png`,
      });

      console.log("\n  --Scenario succesfully tested--\n");
    } catch (err) {
      console.log(`\n  --Feature 5 - scenario 1 failed: ${err} \n\n`);
    }

    try {
      console.log(`  Scenario 2: Active a new theme`);
      console.log("    Given I go to settings on ghost admin site");
      await page.goto(url + "ghost/#/settings");
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature5/s2/1.png`,
      });

      console.log(`      When I click Activate`);
      await page.click("text=ACTIVATE");
      await new Promise((r) => setTimeout(r, 3000));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature5/s2/2.png`,
      });

      console.log(`      Then I expect to see the new theme activated`);
      await page.goto(url + "ghost/#/settings");
      await new Promise((r) => setTimeout(r, 3000));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature5/s2/3.png`,
      });

      console.log("\n  --Scenario succesfully tested--\n");
    } catch (err) {
      console.log(`\n  --Feature 5 - scenario 2 failed: ${err} \n\n`);
    }

    // Feature Inicio de sesion
    try {
      console.log(`  Scenario 1: Failed LogIn empty inputs`);
      await page.goto(url + "ghost/#/signin");
      await new Promise((r) => setTimeout(r, 500));
      await page.click("#ember12");
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature6/s1/1.png`,
      });
    } catch (err) {
      console.log(`\n  --Feature 6  - scenario 1 failed: ${err} \n\n`);
    }

    try {
      console.log(`  Scenario 2: Success LogIn`);
      await page.goto(url + "ghost/#/signin");
      await new Promise((r) => setTimeout(r, 500));
      await page.fill("#ember8", "nf.ortiz@uniandes.edu.co");
      await page.fill("#ember10", "#t1awO$K^7Vw^nIJr7B1nMuMrEA$4^HFXE79aV");
      await page.click("#ember12");
      await new Promise((r) => setTimeout(r, 500));
      const url = await page.url();
      expect(url.includes("site")).toBeTruthy();
      await page.screenshot({
        path: `./screenshots/${datetime}/feature6/s2/1.png`,
      });
    } catch (err) {
      console.log(`\n  --Feature 6  - scenario 2 failed: ${err} \n\n`);
    }

    try {
      console.log(`  Scenario 3: Failed LogIn wrong password`);
      await page.goto(url + "ghost/#/signin");
      await new Promise((r) => setTimeout(r, 500));
      await page.fill("#ember8", "nf.ortiz@uniandes.edu.co");
      await page.fill("#ember10", "#t1awO$K^7Vw^nIJr7B1nMuMrEA$4^HFXE79aV");
      await page.click("#ember12");
      await new Promise((r) => setTimeout(r, 500));
      expect(url.includes("signin")).toBeTruthy();
      await page.screenshot({
        path: `./screenshots/${datetime}/feature6/s2/1.png`,
      });
    } catch (err) {
      console.log(`\n  --Feature 6  - scenario 3 failed: ${err} \n\n`);
    }

    // feature 7 Create a post
    try {
      console.log(`  Scenario 1: Create an empty post`);
      await page.goto(url + "ghost/#/dashboard");
      await new Promise((r) => setTimeout(r, 500));
      await page.click('a[title="New post"]');
      await page.click("textarea.gh-editor-title");
      await page.click("div.koenig-editor__editor-wrapper");
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature6/s2/1.png`,
      });
      const url = await page.url();
      expect(url.includes("/editor/post/")).toBeTruthy();
      await page.click("div.gh-publishmenu");
      await page.click("button#ember96");
    } catch (err) {
      console.log(`\n  --Feature 7  - scenario 1 failed: ${err} \n\n`);
    }

    try {
      console.log(`  Scenario 2: Create a post with title and empty body`);
      await page.goto(url + "ghost/#/dashboard");
      await new Promise((r) => setTimeout(r, 500));
      await page.click('a[title="New post"]');
      await page.click("textarea.gh-editor-title");
      await page.fill("textarea.gh-editor-title", "Primer post");
      await page.click("div.koenig-editor__editor-wrapper");
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature6/s2/1.png`,
      });
      const url = await page.url();
      expect(url.includes("/editor/post/")).toBeTruthy();
      await page.click("div.gh-publishmenu");
      await page.click("button#ember96");
    } catch (err) {
      console.log(`\n  --Feature 7  - scenario 2 failed: ${err} \n\n`);
    }

    try {
      console.log(`  Scenario 3: Create a post with title and body`);
      await page.goto(url + "ghost/#/dashboard");
      await new Promise((r) => setTimeout(r, 500));
      await page.click('a[title="New post"]');

      await page.click("textarea.gh-editor-title");
      await page.fill("textarea.gh-editor-title", "Primer post");

      await page.click("div.koenig-editor__editor-wrapper");
      await page.fill("div.koenig-editor__editor-wrapper", "Contenido");

      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({
        path: `./screenshots/${datetime}/feature6/s2/1.png`,
      });
      const url = await page.url();
      expect(url.includes("/editor/post/")).toBeTruthy();
      await page.click("div.gh-publishmenu");
      await page.click("button#ember96");
    } catch (err) {
      console.log(`\n  --Feature 7  - scenario 3 failed: ${err} \n\n`);
    }
    //Finalizar la prueba
    await browser.close();
  }
  return;
})(); //Llamado propio de la función
