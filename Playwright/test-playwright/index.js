//Importar Playwright
const playwright = require('playwright');
const compareImages = require("resemblejs/compareImages")
const fs = require('fs');

const config = require("./config.json");

const { viewportHeight, viewportWidth, options } = config;

const mySite = "My site";
const userName = "Andrés Rodriguez";
const userEmail = "af.rodriguezm1@uniandes.edu.co";
const userPassword = "contrasenia";

const portv3_3 = "2369"
const urlv3_3 = `http://localhost:${portv3_3}/`;

const portv4_4 = "2368"
const urlv4_4 = `http://localhost:${portv4_4}/`;

let datetime = new Date().toISOString().replace(/:/g,".");

//Función flecha asíncrona
(async () => {

    //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log('-------------------------------------------' + browserType + '-------------------------------------------')
    console.log('------------------------------------------- Ghost V 4.4.0 -------------------------------------------')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Primer feature - escenarios

    var signup =[
        {site: "", name: "", email: "", password: "", error: "responses with error messages"},
        {site: "My site", name: "Admin", email: "a@com", password: "1234567890", error: "responses with \"Invalid email\""},
        {site: "My site", name: "Admin", email: "a@a.com", password: "1234", error: "responses with \"Invalid email\""}
    ]

    console.log("Feature 1: Create new ghost\n    As an new user I want to create a new acount and a new Ghost in order to start my blog.\n")
    for(var i=0; i < signup.length; i++){
        try{
            console.log(`  Scenario ${i+1}: Sign up failed with wrong inputs`)
            console.log("    Given I go to the ghost admin website")
            await page.goto(urlv4_4 + 'ghost');
            await page.waitForLoadState();
            
            console.log("      When I open the signup screen")
            await page.click('text=reate your account →');
            await page.waitForLoadState();
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature1/s${i+1}/1.png`})
    
            console.log(`      And I fill with '${signup[i].site}', '${signup[i].name}', '${signup[i].email}' and '${signup[i].password}'`)
            await page.fill('input[name="blog-title"]', signup[i].site)
            await page.fill('input[name="name"]', signup[i].name)
            await page.fill('input[name="email"]', signup[i].email)
            await page.fill('input[name="password"]', signup[i].password)
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature1/s${i+1}/2.png`})
    
            console.log("      And I try to login")
            await page.click('button[type="submit"]')
            
            console.log(`      Then I expect to see ${signup[i].error}`)
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature1/s${i+1}/3.png`})
    
            console.log("\n  --Scenario succesfully tested--\n")
        }
        catch(err){
            console.log(`\n  --Feature 1 - scenario ${i+1} failed: ${err} \n`)
        }
    }

    try{

        console.log(`  Scenario ${signup.length + 1}: Sign up succes with correct inputs`)
        console.log("    Given I go to the ghost admin website")
        await page.goto(urlv4_4 + 'ghost');
        await page.waitForLoadState();
        
        console.log("      When I open the signup screen")
        await page.click('text=reate your account →');
        await page.waitForLoadState();
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature1/s${signup.length + 1}/1.png`})

        console.log(`      And I fill with '${mySite}', '${userName}', '${userEmail}' and '${userPassword}'`)
        await page.fill('input[name="blog-title"]', mySite)
        await page.fill('input[name="name"]', userName)
        await page.fill('input[name="email"]', userEmail)
        await page.fill('input[name="password"]', userPassword)
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature1/s${signup.length + 1}/2.png`})

        console.log("      And I try to login")
        await page.click('button[type="submit"]')
        await new Promise(r => setTimeout(r, 7000));

        console.log("      And I try to skip")
        await page.click('.gh-flow-skip')
        await new Promise(r => setTimeout(r, 7000));
        
        console.log(`      Then I expect to see the dashboard page`)
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature1/s${signup.length + 1}/3.png`})
        if( await page.url() === urlv4_4+"ghost/#/dashboard"){console.log("\n  --Scenario succesfully tested--\n\n")}else{console.log(`\n  --Feature 1 - scenario ${signup.length + 1} failed: No fue dirigido al dashboard \n\n`)}

    }
    catch(err){
        console.log(`\n  --Feature 1 - scenario ${signup.length + 1} failed: ${err} \n\n`)
    } 


    /* await page.goto(urlv4_4 + 'ghost/#/signin');
    await new Promise(r => setTimeout(r, 5000));
    await page.fill('input[name="identification"]', userEmail);
    await page.fill('input[name="password"]', userPassword)
    await page.click('button[type="submit"]')
    await new Promise(r => setTimeout(r, 5000)); */

    //Segundo feature
    var members= [
        {name: "", labels: "", email: "", note: "", suscribed: true, error: "response - \"Please enter an email\""},
        {name: " ", labels: " ", email: " ", note: " ", suscribed: true, error: "response - \"Please enter an email\""},
        {name: "a", labels: "a", email: "a@a.com", note: "jkkbhkjhbkhbkhbkhbkhbkhbkhbkhbkhjbkbhjbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhkhjbbbjhbkjbhkjhbkjhbkbhkjhbkhbkhbhbhbkjhjkhbjkhbkhjbkjhb", suscribed: true, error: "response - \"Note is too long\""}
    ]

    console.log("Feature 2: Create new member\n    As an admin I want to add a new member.\n")

    for(var i=0; i < members.length; i++){

        try{
            console.log(`  Scenario ${i + 1}: Create member failed with wrong input`)
            console.log("    Given I go to the memebers on ghost admin site")
            await page.goto(urlv4_4 + 'ghost/#/members');
            await new Promise(r => setTimeout(r, 3000));
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${i+1}/1.png`})
        

            console.log(`      When I click "New member" `)
            await page.click("text=New member");
            await page.waitForLoadState();
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${i+1}/2.png`})
    
            console.log(`      And I fill with '${members[i].name}', '${members[i].labels}', '${members[i].email}', '${members[i].note}' and '${members[i].suscribed}'`)
            await page.fill('input[name="name"]', members[i].name)
            await page.fill('input[name="email"]', members[i].email)
            await page.fill('textarea[name="note"]', members[i].note)
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${i + 1}/3.png`})
    
            console.log("      And I try to save")
            await page.click('text=Save')
            await page.waitForLoadState();
            
            console.log(`      Then I expect to see ${members[i].error}`)
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${i + 1}/4.png`})

            await page.goto(urlv4_4 + 'ghost/#/members');
            await page.waitForLoadState();

            console.log("\n  --Scenario succesfully tested--\n")
        }
        catch(err){
            console.log(`\n  --Feature 2 - scenario ${i + 1} failed: ${err} \n\n`)
        }

    }

    try{
        console.log(`  Scenario ${members.length + 1}: Create member succes with correct input`)
        console.log("    Given I go to the memebers on ghost admin site")
        await page.goto(urlv4_4 + 'ghost/#/members');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${members.length+1}/1.png`})
    

        console.log(`      When I click "New member" `)
        await page.click("text=New member");
        await page.waitForLoadState();
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${members.length+1}/2.png`})

        console.log(`      And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`)
        await page.fill('input[name="name"]', "A")
        await page.fill('input[name="email"]', 'a@a.com')
        await page.fill('textarea[name="note"]', 'Notas')
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${members.length + 1}/3.png`})

        console.log("      And I try to save")
        await page.click('text=Save')
        await page.waitForLoadState();
        
        console.log(`      Then I expect to see member correctly saved`)
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${i + 1}/4.png`})

        await page.goto(urlv4_4 + 'ghost/#/members');
        await page.waitForLoadState();

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 2 - scenario ${members.length + 1} failed: ${err} \n\n`)
    }

    try{
        console.log(`  Scenario ${members.length + 2}: Create member failed with an already member email`)
        console.log("    Given I go to the memebers on ghost admin site")
        await page.goto(urlv4_4 + 'ghost/#/members');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${members.length + 2}/1.png`})
    

        console.log(`      When I click "New member" `)
        await page.click("text=New member");
        await page.waitForLoadState();
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${members.length + 2}/2.png`})

        console.log(`      And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`)
        await page.fill('input[name="name"]', "A")
        await page.fill('input[name="email"]', 'a@a.com')
        await page.fill('textarea[name="note"]', 'Notas')
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${members.length + 2}/3.png`})

        console.log("      And I try to save")
        await page.click('text=Save')
        await page.waitForLoadState();
        
        console.log(`      Then I expect to see "Validation error, cannot save member. Member already exists Attempting to add member with existing email address."`)
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature2/s${i + 2}/4.png`})

        await page.goto(urlv4_4 + 'ghost/#/members');
        await new Promise(r => setTimeout(r, 3000));

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 2 - scenario ${members.length + 2} failed: ${err} \n\n`)
    }

    // Tercer feature
    console.log("Feature 3: Create tag\n    As an admin I want to add a new tag.\n")

    var tags= [
        {name: "", color: "", slug: "", description: "", error: "response - \"You must specify a name for the tag.\""},
        {name: " ", color: " ", slug: " ", description: " ",  error: "response - \"You must specify a name for the tag.\""},
        {name: "Color", color: "verde", slug: "color", description: " ",  error: "response - \"The colour should be in a valid hex format.\""},
        {name: "prueba", color: "112233", slug:"prueba", description: "jkkbhkjhbkhbkhbkhbkhbkhbkhbkhbkhjbkbhjbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhkhjbbbjhbkjbhkjhbkjhbkbhkjhbkhbkhbhbhbkjhjkhbjkhbkhjbkjhb", suscribed: true, error: "response - \"Description cannot be longer than 500 characters.\""}
    ]

    for(var i=0; i < tags.length; i++){

        try{
            console.log(`  Scenario ${i + 1}: Create tag failed with wrong input`)
            console.log("    Given I go to the tags on ghost admin site")
            await page.goto(urlv4_4 + 'ghost/#/tags');
            await new Promise(r => setTimeout(r, 5000));
            await page.goto(urlv4_4 + 'ghost/#/tags');
            await new Promise(r => setTimeout(r, 5000));
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature3/s${i+1}/1.png`})
        

            console.log(`      When I click "New Tag" `)
            await page.click("text=New tag");
            await page.waitForLoadState();
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature3/s${i+1}/2.png`})
    
            console.log(`      And I fill with '${tags[i].name}', '${tags[i].color}', '${tags[i].slug}' and '${tags[i].description}'`)
            await page.fill('input[name="name"]', tags[i].name)
            await page.fill('input[name="accent-color"]', tags[i].color)
            await page.fill('input[name="slug"]', tags[i].slug)
            await page.fill('textarea[name="description"]', tags[i].description)
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature3/s${i + 1}/3.png`})
    
            console.log("      And I try to save")
            await page.click('text=Save')
            await page.waitForLoadState();
            
            console.log(`      Then I expect to see ${tags[i].error}`)
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature3/s${i + 1}/4.png`})

            await page.goto(urlv4_4 + 'ghost/#/tags');
            await page.waitForLoadState();

            console.log("\n  --Scenario succesfully tested--\n")
        }
        catch(err){
            console.log(`\n  --Feature 3 - scenario ${i + 1} failed: ${err} \n\n`)
        }

    }

    try{
        console.log(`  Scenario ${tags.length + 1}: Create tag succes with correct input`)
        console.log("    Given I go to the tags on ghost admin site")
        await page.goto(urlv4_4 + 'ghost/#/tags');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature3/s${tags.length + 1}/1.png`})
    

        console.log(`      When I click "New Tag" `)
        await page.click("text=New tag");
        await page.waitForLoadState();
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature3/s${tags.length+1}/2.png`})

        console.log(`      And I fill with 'Prueba', '111111', 'prueba' and 'Hola'`)
        await page.fill('input[name="name"]', "Prueba")
        await page.fill('input[name="accent-color"]', "111111")
        await page.fill('input[name="slug"]', "prueba")
        await page.fill('textarea[name="description"]', "Hola")
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature3/s${tags.length + 1}/3.png`})

        console.log("      And I try to save")
        await page.click('text=Save')
        await page.waitForLoadState();
        
        console.log(`      Then I expect to see a tag created correctly`)
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature3/s${tags.length + 1}/4.png`})

        await page.goto(urlv4_4 + 'ghost/#/tags');
        await new Promise(r => setTimeout(r, 3000));

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 3 - scenario ${tags.length + 1} failed: ${err} \n\n`)
    }

    //Cuarto feature
    console.log("Feature 4: Create new staff\n    As an admin I want to add a new staff member.\n")

    var staff = [
        {email: "", rol: "Author", error: "Please enter an email"},
        {email: " ", rol: "Editor", error: "Please enter an email"},
        {email: userEmail, rol: "Administrator", error: "A user with that email address already exists."}
    ]

    for(var i=0; i < staff.length; i++){
        
        try{
            console.log(`  Scenario ${i + 1}: Create staff failed with wrong email`)
            console.log("    Given I go to the staff on ghost admin site")
            await page.goto(urlv4_4 + 'ghost/#/staff');
            await new Promise(r => setTimeout(r, 4000));
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature4/s${i+1}/1.png`})
        

            console.log(`      When I click "Invite people" `)
            await page.click("text='Invite people'", {force: true});
            await page.waitForLoadState();
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature4/s${i+1}/2.png`})
    
            console.log(`      And I fill with '${staff[i].email}' and click on ${staff[i].rol}`)
            await page.fill('input[name="email"]', staff[i].email)
            await page.click(`text=${staff[i].rol}`, {force:true})
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature4/s${i + 1}/3.png`})
    
            console.log("      And I try to Send invitation now")
            await page.click('div[class="modal-footer"] > button')
            await page.waitForLoadState();
            
            console.log(`      Then I expect to see ${staff[i].error}`)
            await page.screenshot({path: `./screenshots/v4/${datetime}/feature4/s${i + 1}/4.png`})

            await page.goto(urlv4_4 + 'ghost/#/staff');
            await page.waitForLoadState();

            console.log("\n  --Scenario succesfully tested--\n")
        }
        catch(err){
            console.log(`\n  --Feature 4 - scenario ${i + 1} failed: ${err} \n\n`)
        }
    }

    try{
        console.log(`  Scenario ${staff.length + 1}: Create staff succes with correct email`)
        console.log("    Given I go to the staff on ghost admin site")
        await page.goto(urlv4_4 + 'ghost/#/staff');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature4/s${staff.length + 1}/1.png`})
    

        console.log(`      When I click "invite people" `)
        await page.click("text=Invite people");
        await page.waitForLoadState();
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature4/s${staff.length + 1}/2.png`})

        console.log(`      And I fill with 'prueba@prueba.com' and click on Editor`)
        await page.fill('input[name="email"]', 'prueba@prueba.com')
        await page.click(`text=Editor`, {force:true})
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature4/s${staff.length + 1}/3.png`})

        console.log("      And I try to Send invitation now")
        await page.click('div[class="modal-footer"] > button')
        await page.waitForLoadState();
        
        console.log(`      Then I expect to see "Error sending email! Error sending email: Failed to send email. No mail server found at a.com. Please check your email settings and resend the invitation."`)
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature4/s${staff.length + 1}/4.png`})

        await page.goto(urlv4_4 + 'ghost/#/staff');
        await page.waitForLoadState();

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 4 - scenario ${staff.length + 1} failed: ${err} \n\n`)
    }

    console.log("Feature 5: Themes\n    As an admin I want to add a new theme to the page.\n")

    try{
        console.log(`  Scenario 1: Install a new theme`)
        console.log("    Given I go to settings on ghost admin site")
        await page.goto(urlv4_4 + 'ghost/#/settings');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature5/s1/1.png`})
    

        console.log(`      When I click Theme`)
        await page.click("text=Theme");
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature5/s1/2.png`})

        console.log(`      And I click Install`)
        await page.click("text=Install", {force: true});
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature5/s1/3.png`})

        console.log(`      And I click Install`)
        await page.click('.gh-btn-icon', {force: true});
        await new Promise(r => setTimeout(r, 10000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature5/s1/4.png`})

        console.log(`      Then I expect to see a new theme in Installed themes`)
        await page.goto(urlv4_4 + 'ghost/#/settings/theme');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature5/s1/5.png`})       

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 5 - scenario 1 failed: ${err} \n\n`)
    }

    try{
        console.log(`  Scenario 2: Active a new theme`)
        console.log("    Given I go to settings on ghost admin site")
        await page.goto(urlv4_4 + 'ghost/#/settings');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature5/s2/1.png`})
    

        console.log(`      When I click Activate`)
        await page.click("text=ACTIVATE");
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature5/s2/2.png`})

        console.log(`      Then I expect to see the new theme activated`)
        await page.goto(urlv4_4 + 'ghost/#/settings');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v4/${datetime}/feature5/s2/3.png`})  

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 5 - scenario 2 failed: ${err} \n\n`)
    }


    //Finalizar la prueba
    await browser.close();
  }

  // ==================================================================================================================================================

  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log('-------------------------------------------' + browserType + '-------------------------------------------')
    console.log('------------------------------------------- Ghost V 3.3.0 -------------------------------------------')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Primer feature - escenarios

    var signup =[
        {site: "", name: "", email: "", password: "", error: "responses with error messages"},
        {site: "My site", name: "Admin", email: "a@com", password: "1234567890", error: "responses with \"Invalid email\""},
        {site: "My site", name: "Admin", email: "a@a.com", password: "1234", error: "responses with \"Invalid email\""}
    ]

    console.log("Feature 1: Create new ghost\n    As an new user I want to create a new acount and a new Ghost in order to start my blog.\n")
    for(var i=0; i < signup.length; i++){
        try{
            console.log(`  Scenario ${i+1}: Sign up failed with wrong inputs`)
            console.log("    Given I go to the ghost admin website")
            await page.goto(urlv3_3 + 'ghost');
            await page.waitForLoadState();
            
            console.log("      When I open the signup screen")
            await page.click('text=Create your account');
            await page.waitForLoadState();
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature1/s${i+1}/1.png`})
    
            console.log(`      And I fill with '${signup[i].site}', '${signup[i].name}', '${signup[i].email}' and '${signup[i].password}'`)
            await page.fill('input[name="blog-title"]', signup[i].site)
            await page.fill('input[name="name"]', signup[i].name)
            await page.fill('input[name="email"]', signup[i].email)
            await page.fill('input[name="password"]', signup[i].password)
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature1/s${i+1}/2.png`})
    
            console.log("      And I try to login")
            await page.click('button[type="submit"]')
            
            console.log(`      Then I expect to see ${signup[i].error}`)
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature1/s${i+1}/3.png`})
    
            console.log("\n  --Scenario succesfully tested--\n")
        }
        catch(err){
            console.log(`\n  --Feature 1 - scenario ${i+1} failed: ${err} \n`)
        }
    }

    try{

        console.log(`  Scenario ${signup.length + 1}: Sign up succes with correct inputs`)
        console.log("    Given I go to the ghost admin website")
        await page.goto(urlv3_3 + 'ghost');
        await page.waitForLoadState();
        
        console.log("      When I open the signup screen")
        await page.click('text=Create your account');
        await page.waitForLoadState();
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature1/s${signup.length + 1}/1.png`})

        console.log(`      And I fill with '${mySite}', '${userName}', '${userEmail}' and '${userPassword}'`)
        await page.fill('input[name="blog-title"]', mySite)
        await page.fill('input[name="name"]', userName)
        await page.fill('input[name="email"]', userEmail)
        await page.fill('input[name="password"]', userPassword)
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature1/s${signup.length + 1}/2.png`})

        console.log("      And I try to login")
        await page.click('button[type="submit"]')
        await new Promise(r => setTimeout(r, 7000));

        console.log("      And I try to skip")
        await page.click('.gh-flow-skip')
        await new Promise(r => setTimeout(r, 7000));
        
        console.log(`      Then I expect to see the dashboard page`)
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature1/s${signup.length + 1}/3.png`})
        if( await page.url() === urlv3_3+"ghost/#/site"){console.log("\n  --Scenario succesfully tested--\n\n")}else{console.log(`\n  --Feature 1 - scenario ${signup.length + 1} failed: No fue dirigido al dashboard \n\n`)}

    }
    catch(err){
        console.log(`\n  --Feature 1 - scenario ${signup.length + 1} failed: ${err} \n\n`)
    } 


    /* await page.goto(urlv3_3 + 'ghost/#/signin');
    await new Promise(r => setTimeout(r, 5000));
    await page.fill('input[name="identification"]', userEmail);
    await page.fill('input[name="password"]', userPassword)
    await page.click('button[type="submit"]')
    await new Promise(r => setTimeout(r, 5000)); */

    //Segundo feature
    var members= [
        {name: "", labels: "", email: "", note: "", suscribed: true, error: "response - \"Please enter an email\""},
        {name: " ", labels: " ", email: " ", note: " ", suscribed: true, error: "response - \"Please enter an email\""},
        {name: "a", labels: "a", email: "a@a.com", note: "jkkbhkjhbkhbkhbkhbkhbkhbkhbkhbkhjbkbhjbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhkhjbbbjhbkjbhkjhbkjhbkbhkjhbkhbkhbhbhbkjhjkhbjkhbkhjbkjhb", suscribed: true, error: "response - \"Note is too long\""}
    ]

    console.log("Feature 2: Create new member\n    As an admin I want to add a new member.\n")

    for(var i=0; i < members.length; i++){

        try{
            console.log(`  Scenario ${i + 1}: Create member failed with wrong input`)
            console.log("    Given I go to the memebers on ghost admin site")
            await page.goto(urlv3_3 + 'ghost/#/members');
            await new Promise(r => setTimeout(r, 3000));
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${i+1}/1.png`})
        

            console.log(`      When I click "New member" `)
            await page.click("text=New member");
            await page.waitForLoadState();
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${i+1}/2.png`})
    
            console.log(`      And I fill with '${members[i].name}', '${members[i].labels}', '${members[i].email}', '${members[i].note}' and '${members[i].suscribed}'`)
            await page.fill('input[name="name"]', members[i].name)
            await page.fill('input[name="email"]', members[i].email)
            await page.fill('textarea[name="note"]', members[i].note)
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${i + 1}/3.png`})
    
            console.log("      And I try to save")
            await page.click('text=Save')
            await page.waitForLoadState();
            
            console.log(`      Then I expect to see ${members[i].error}`)
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${i + 1}/4.png`})

            await page.goto(urlv3_3 + 'ghost/#/members');
            await page.waitForLoadState();

            console.log("\n  --Scenario succesfully tested--\n")
        }
        catch(err){
            console.log(`\n  --Feature 2 - scenario ${i + 1} failed: ${err} \n\n`)
        }

    }

    try{
        console.log(`  Scenario ${members.length + 1}: Create member succes with correct input`)
        console.log("    Given I go to the memebers on ghost admin site")
        await page.goto(urlv3_3 + 'ghost/#/members');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${members.length+1}/1.png`})
    

        console.log(`      When I click "New member" `)
        await page.click("text=New member");
        await page.waitForLoadState();
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${members.length+1}/2.png`})

        console.log(`      And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`)
        await page.fill('input[name="name"]', "A")
        await page.fill('input[name="email"]', 'a@a.com')
        await page.fill('textarea[name="note"]', 'Notas')
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${members.length + 1}/3.png`})

        console.log("      And I try to save")
        await page.click('text=Save')
        await page.waitForLoadState();
        
        console.log(`      Then I expect to see member correctly saved`)
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${i + 1}/4.png`})

        await page.goto(urlv3_3 + 'ghost/#/members');
        await page.waitForLoadState();

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 2 - scenario ${members.length + 1} failed: ${err} \n\n`)
    }

    try{
        console.log(`  Scenario ${members.length + 2}: Create member failed with an already member email`)
        console.log("    Given I go to the memebers on ghost admin site")
        await page.goto(urlv3_3 + 'ghost/#/members');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${members.length + 2}/1.png`})
    

        console.log(`      When I click "New member" `)
        await page.click("text=New member");
        await page.waitForLoadState();
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${members.length + 2}/2.png`})

        console.log(`      And I fill with 'A', 'A', 'a@a.com', 'Notas' and 'false'`)
        await page.fill('input[name="name"]', "A")
        await page.fill('input[name="email"]', 'a@a.com')
        await page.fill('textarea[name="note"]', 'Notas')
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${members.length + 2}/3.png`})

        console.log("      And I try to save")
        await page.click('text=Save')
        await page.waitForLoadState();
        
        console.log(`      Then I expect to see "Validation error, cannot save member. Member already exists Attempting to add member with existing email address."`)
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature2/s${i + 2}/4.png`})

        await page.goto(urlv3_3 + 'ghost/#/members');
        await new Promise(r => setTimeout(r, 3000));

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 2 - scenario ${members.length + 2} failed: ${err} \n\n`)
    }

    // Tercer feature
    console.log("Feature 3: Create tag\n    As an admin I want to add a new tag.\n")

    var tags= [
        {name: "", color: "", slug: "", description: "", error: "response - \"You must specify a name for the tag.\""},
        {name: " ", color: " ", slug: " ", description: " ",  error: "response - \"You must specify a name for the tag.\""},
        {name: "Color", color: "verde", slug: "color", description: " ",  error: "response - \"The colour should be in a valid hex format.\""},
        {name: "prueba", color: "112233", slug:"prueba", description: "jkkbhkjhbkhbkhbkhbkhbkhbkhbkhbkhjbkbhjbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhkhjbbbjhbkjbhkjhbkjhbkbhkjhbkhbkhbhbhbkjhjkhbjkhbkhjbkjhb", suscribed: true, error: "response - \"Description cannot be longer than 500 characters.\""}
    ]

    for(var i=0; i < tags.length; i++){

        try{
            console.log(`  Scenario ${i + 1}: Create tag failed with wrong input`)
            console.log("    Given I go to the tags on ghost admin site")
            await page.goto(urlv3_3 + 'ghost/#/tags');
            await new Promise(r => setTimeout(r, 5000));
            await page.goto(urlv3_3 + 'ghost/#/tags');
            await new Promise(r => setTimeout(r, 5000));
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature3/s${i+1}/1.png`})
        

            console.log(`      When I click "New Tag" `)
            await page.click("text=New tag");
            await page.waitForLoadState();
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature3/s${i+1}/2.png`})
    
            console.log(`      And I fill with '${tags[i].name}', '${tags[i].color}', '${tags[i].slug}' and '${tags[i].description}'`)
            await page.fill('input[name="name"]', tags[i].name)
            await page.fill('input[name="slug"]', tags[i].slug)
            await page.fill('textarea[name="description"]', tags[i].description)
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature3/s${i + 1}/3.png`})
    
            console.log("      And I try to save")
            await page.click('text=Save')
            await page.waitForLoadState();
            
            console.log(`      Then I expect to see ${tags[i].error}`)
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature3/s${i + 1}/4.png`})

            await page.goto(urlv3_3 + 'ghost/#/tags');
            await page.waitForLoadState();

            console.log("\n  --Scenario succesfully tested--\n")
        }
        catch(err){
            console.log(`\n  --Feature 3 - scenario ${i + 1} failed: ${err} \n\n`)
        }

    }

    try{
        console.log(`  Scenario ${tags.length + 1}: Create tag succes with correct input`)
        console.log("    Given I go to the tags on ghost admin site")
        await page.goto(urlv3_3 + 'ghost/#/tags');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature3/s${tags.length + 1}/1.png`})
    

        console.log(`      When I click "New Tag" `)
        await page.click("text=New tag");
        await page.waitForLoadState();
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature3/s${tags.length+1}/2.png`})

        console.log(`      And I fill with 'Prueba', '111111', 'prueba' and 'Hola'`)
        await page.fill('input[name="name"]', "Prueba")
        await page.fill('input[name="slug"]', "prueba")
        await page.fill('textarea[name="description"]', "Hola")
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature3/s${tags.length + 1}/3.png`})

        console.log("      And I try to save")
        await page.click('text=Save')
        await page.waitForLoadState();
        
        console.log(`      Then I expect to see a tag created correctly`)
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature3/s${tags.length + 1}/4.png`})

        await page.goto(urlv3_3 + 'ghost/#/tags');
        await new Promise(r => setTimeout(r, 3000));

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 3 - scenario ${tags.length + 1} failed: ${err} \n\n`)
    }

    //Cuarto feature
    console.log("Feature 4: Create new staff\n    As an admin I want to add a new staff member.\n")

    var staff = [
        {email: "", rol: "Author", error: "Please enter an email"},
        {email: " ", rol: "Editor", error: "Please enter an email"},
        {email: userEmail, rol: "Administrator", error: "A user with that email address already exists."}
    ]

    for(var i=0; i < staff.length; i++){
        
        try{
            console.log(`  Scenario ${i + 1}: Create staff failed with wrong email`)
            console.log("    Given I go to the staff on ghost admin site")
            await page.goto(urlv3_3 + 'ghost/#/staff');
            await new Promise(r => setTimeout(r, 4000));
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature4/s${i+1}/1.png`})
        

            console.log(`      When I click "Invite people" `)
            await page.click("text='Invite people'", {force: true});
            await page.waitForLoadState();
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature4/s${i+1}/2.png`})
    
            console.log(`      And I fill with '${staff[i].email}' and click on ${staff[i].rol}`)
            await page.fill('input[name="email"]', staff[i].email)
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature4/s${i + 1}/3.png`})
    
            console.log("      And I try to Send invitation now")
            await page.click('text=Send invitation now')
            await page.waitForLoadState();
            
            console.log(`      Then I expect to see ${staff[i].error}`)
            await page.screenshot({path: `./screenshots/v3/${datetime}/feature4/s${i + 1}/4.png`})

            await page.goto(urlv3_3 + 'ghost/#/staff');
            await page.waitForLoadState();

            console.log("\n  --Scenario succesfully tested--\n")
        }
        catch(err){
            console.log(`\n  --Feature 4 - scenario ${i + 1} failed: ${err} \n\n`)
        }
    }

    try{
        console.log(`  Scenario ${staff.length + 1}: Create staff succes with correct email`)
        console.log("    Given I go to the staff on ghost admin site")
        await page.goto(urlv3_3 + 'ghost/#/staff');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature4/s${staff.length + 1}/1.png`})
    

        console.log(`      When I click "invite people" `)
        await page.click("text=Invite people");
        await page.waitForLoadState();
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature4/s${staff.length + 1}/2.png`})

        console.log(`      And I fill with 'prueba@prueba.com' and click on Editor`)
        await page.fill('input[name="email"]', 'prueba@prueba.com')
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature4/s${staff.length + 1}/3.png`})

        console.log("      And I try to Send invitation now")
        await page.click('div[class="modal-footer"] > button')
        await page.waitForLoadState();
        
        console.log(`      Then I expect to see "Error sending email! Error sending email: Failed to send email. No mail server found at a.com. Please check your email settings and resend the invitation."`)
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature4/s${staff.length + 1}/4.png`})

        await page.goto(urlv3_3 + 'ghost/#/staff');
        await page.waitForLoadState();

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 4 - scenario ${staff.length + 1} failed: ${err} \n\n`)
    }

    console.log("Feature 5: Themes\n    As an admin I want to add a new theme to the page.\n")

    try{
        console.log(`  Scenario 1: Install a new theme`)
        console.log("    Given I go to settings on ghost admin site")
        await page.goto(urlv3_3 + 'ghost/#/settings/design');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature5/s1/1.png`})
    

        console.log(`      When I click Theme`)
        await page.click("text=Theme");
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature5/s1/2.png`})

        console.log(`      And I click Install`)
        await page.click("text=Install", {force: true});
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature5/s1/3.png`})

        console.log(`      And I click Install`)
        await page.click('.gh-btn-icon', {force: true});
        await new Promise(r => setTimeout(r, 10000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature5/s1/4.png`})

        console.log(`      Then I expect to see a new theme in Installed themes`)
        await page.goto(urlv3_3 + 'ghost/#/settings/theme');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature5/s1/5.png`})       

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 5 - scenario 1 failed: ${err} \n\n`)
    }

    try{
        console.log(`  Scenario 2: Active a new theme`)
        console.log("    Given I go to settings on ghost admin site")
        await page.goto(urlv3_3 + 'ghost/#/settings');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature5/s2/1.png`})
    

        console.log(`      When I click Activate`)
        await page.click("text=ACTIVATE");
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature5/s2/2.png`})

        console.log(`      Then I expect to see the new theme activated`)
        await page.goto(urlv3_3 + 'ghost/#/settings');
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: `./screenshots/v3/${datetime}/feature5/s2/3.png`})  

        console.log("\n  --Scenario succesfully tested--\n")
    }
    catch(err){
        console.log(`\n  --Feature 5 - scenario 2 failed: ${err} \n\n`)
    }


    //Finalizar la prueba
    await browser.close();
  }
  fs.writeFileSync(`./results/${datetime}/report.html`, createReport());
    fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);
  return;
})();//Llamado propio de la función

async function comparePhotos(feature, scenario, photo){
    
    if (!fs.existsSync(`./results/${datetime}`)){
        fs.mkdirSync(`./results/${datetime}`, { recursive: true });}
    let resultInfo 
    const data = await compareImages(
        fs.readFileSync(`./screenshots/v3/${datetime}/feature${feature}/s${scenario}/${photo}.png`),
        fs.readFileSync(`./screenshots/v4/${datetime}/feature${feature}/s${scenario}/${photo}.png`),
        options
    );
    resultInfo = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
    }
    fs.writeFileSync(`./results/${datetime}/compare-feat-${feature}-scen-${scenario}-photo-${photo}.png`, data.getBuffer());
    return resultInfo;
}

function createReport(){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${urlv3_3}"> ${urlv3_3}</a> vs <a href="${urlv4_4}"> ${urlv4_4}</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                
                ${featuresScenario.map(f =>  {
                    return `
                    <div class=" browser" id="test0">
                    <div class=" btitle">
                        <h2>Browser: ${f.featureName}</h2>
                        <h3>Browser: ${f.scenarioName}</h>
                        ${f.photos.map( p => {
                            var resp = comparePhotos(f.feature, f.scenario, p)
                            return `
                                <p>Data: ${JSON.stringify(resp)}</p>
                                </div>
                                <div class="imgline">
                                <div class="imgcontainer">
                                    <span class="imgname">v3.3.0</span>
                                    <img class="img2" src="../screenshots/v3/${datetime}/feature${f.feature}/s${f.scenario}/${p}.png" id="refImage" label="Reference">
                                </div>
                                <div class="imgcontainer">
                                    <span class="imgname">v4.4.0</span>
                                    <img class="img2" src="../screenshots/v4/${datetime}/feature${f.feature}/s${f.scenario}/${p}.png" id="testImage" label="Test">
                                </div>
                                </div>
                                <div class="imgline">
                                <div class="imgcontainer">
                                    <span class="imgname">Diff</span>
                                    <img class="imgfull" src="./compare-feat-${f.feature}-scen-${f.scenario}-photo-${p}.png" id="diffImage" label="Diff">
                                </div>
                                </div>
                            `
                        })}
                        
                  </div>
                    `
                })}

            </div>
        </body>
    </html>
    `
}

var featuresScenario = [
    {feature: 1, scenario: 1, featureName: "Create new ghost", scenarioName: "Sign up failed with wrong inputs", photos: [3]},
    {feature: 1, scenario: 2, featureName: "Create new ghost", scenarioName: "Sign up failed with wrong inputs", photos: [3]},
    {feature: 1, scenario: 3, featureName: "Create new ghost", scenarioName: "Sign up failed with wrong inputs", photos: [3]},
    {feature: 1, scenario: 4, featureName: "Create new ghost", scenarioName: "Sign up succes with correct inputs", photos: [3]},
    {feature: 2, scenario: 1, featureName: "Create new member", scenarioName: "Create member failed with wrong input", photos: [4]},
    {feature: 2, scenario: 2, featureName: "Create new member", scenarioName: "Create member failed with wrong input", photos: [4]},
    {feature: 2, scenario: 3, featureName: "Create new member", scenarioName: "Create member failed with wrong input", photos: [4]},
    {feature: 2, scenario: 4, featureName: "Create new member", scenarioName: "Create member failed with wrong input", photos: [4]},
    {feature: 2, scenario: 5, featureName: "Create new member", scenarioName: "Create member succes correct input", photos: [4]},
    {feature: 3, scenario: 1, featureName: "Create new tag", scenarioName: "Create tag failed with wrong input", photos: [4]},
    {feature: 3, scenario: 2, featureName: "Create new tag", scenarioName: "Create tag failed with wrong input", photos: [4]},
    {feature: 3, scenario: 3, featureName: "Create new tag", scenarioName: "Create tag failed with wrong input", photos: [4]},
    {feature: 3, scenario: 4, featureName: "Create new tag", scenarioName: "Create tag failed with wrong input", photos: [4]},
    {feature: 3, scenario: 5, featureName: "Create new tag", scenarioName: "Create tag succes with correct input", photos: [4]},
    {feature: 4, scenario: 1, featureName: "Invite staff", scenarioName: "Invite staff failed with wrong input", photos: [4]},
    {feature: 4, scenario: 2, featureName: "Invite staff", scenarioName: "Invite staff failed with wrong input", photos: [4]},
    {feature: 4, scenario: 3, featureName: "Invite staff", scenarioName: "Invite staff failed with wrong input", photos: [4]},
    {feature: 4, scenario: 4, featureName: "Invite staff", scenarioName: "Invite staff succed with correct input", photos: [4]},
    {feature: 5, scenario: 1, featureName: "Add theme", scenarioName: "", photos: [5]},
    {feature: 5, scenario: 2, featureName: "Add theme", scenarioName: "", photos: [5]},
]