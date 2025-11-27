const { pages } = require("./../../po");
const fs = require("fs");
const logger = require("./../../utils/logger");
const testData = JSON.parse(fs.readFileSync("src/test/data/testData.json", "utf-8"));

describe ("Login", () => {
    beforeEach (async() => {
        await pages("login").open();
    });

    testData.forEach(data => {
        it(`${data.id} : ${data.name} `, async() => {
            logger.info(`Input for username: ${data.username} and for password: ${data.password} - (${data.id})`);
            const loginInput = pages("login").loginInput;
            await Promise.all([
                loginInput.input("username").setValue(data.username),
                loginInput.input("password").setValue(data.password)
            ]);

            if (!data.isPositiveTesting){
                if (data.expectedResult === "Epic sadface: Username is required"){
                    await loginInput.clearField(loginInput.input("username"));
                    await loginInput.clearField(loginInput.input("password"));
                    logger.info("Cleared both input fields");
                } else {
                    await loginInput.clearField(loginInput.input("password"));
                    logger.info("Cleared only password input field")
                }
            }

            await pages("login").loginInput.loginBtn.click();
            logger.info("Clicked login button")

            if (!data.isPositiveTesting){
                await pages("login").errorMessage.errorText.waitForDisplayed();
                await expect(pages("login").errorMessage.errorText).toHaveText(data.expectedResult);
                logger.info(`Logging failed with message: ${data.expectedResult}`);
            } else {
                await expect(pages("catalogue").catalogueTitle.textTitle).toHaveText("Swag Labs");
                logger.info("Successfully logged in");
            }
        });
    });
});