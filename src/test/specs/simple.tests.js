const { pages } = require("./../../po");
const fs = require("fs");
const testData = JSON.parse(fs.readFileSync("src/test/data/testData.json", "utf-8"));

describe ("Login", () => {
    beforeEach (async() => {
        await browser.url("/");
    });

    testData.forEach(data => {
        it(`${data.id} : ${data.name} `, async() => {
            console.log(`Input for username: ${data.username} and for password: ${data.password} - (${data.id})`);
            const loginInput = pages("login").loginInput;
            await Promise.all([
                loginInput.input("username").setValue(data.username),
                loginInput.input("password").setValue(data.password)
            ]);

            if (!data.isPositiveTesting){
                if (data.expectedResult === "Epic sadface: Username is required"){
                    await loginInput.clearField(loginInput.input("username"));
                    await loginInput.clearField(loginInput.input("password"));
                    console.log("Cleared both input fields");
                } else {
                    await loginInput.clearField(loginInput.input("password"));
                    console.log("Cleared only password input field")
                }
            }

            await pages("login").loginInput.loginBtn.click();
            console.log("Clicked login button")

            if (!data.isPositiveTesting){
                await pages("login").errorMessage.errorText.waitForDisplayed();
                await expect(pages("login").errorMessage.errorText).toHaveText(data.expectedResult);
                console.log(`Logging failed with message: ${data.expectedResult}`);
            } else {
                await expect(pages("catalogue").catalogueTitle.textTitle).toHaveText("Swag Labs");
                console.log("Successfully logged in");
            }
        });
    });
});