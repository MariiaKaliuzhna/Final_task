const { pages } = require("./../../po");
const fs = require("fs");
const logger = require("./../../utils/logger");
const negativeTestData = JSON.parse(fs.readFileSync("src/test/data/testData.json", "utf-8"));

describe ("Negative tests", () => {
    beforeEach (async() => {
        await pages("login").open();
    });

    negativeTestData.forEach(data => {
        it(`${data.id} : ${data.name} `, async() => {
            logger.info(`Input for username: ${data.username} and for password: ${data.password} - (${data.id})`);
            const loginInput = pages("login").loginInput;
            await Promise.all([
                loginInput.input("username").setValue(data.username),
                loginInput.input("password").setValue(data.password)
            ]);

            if (data.id === "UC-1") {
                logger.info("Clearing both input fields");
                await loginInput.clearField(loginInput.input("username"));
                await loginInput.clearField(loginInput.input("password"));
            } else if (data.id === "UC-2") {
                logger.info("Clearing only password input field")
                await loginInput.clearField(loginInput.input("password"));
            }

            await pages("login").loginInput.loginBtn.click();
            logger.info("Clicked login button")

            await pages("login").errorMessage.errorText.waitForDisplayed();
            await expect(pages("login").errorMessage.errorText).toHaveText(data.expectedResult);
            logger.info(`Logging failed with message: ${data.expectedResult}`);
        });
    });
});

describe("Positive test", async() => {
    beforeEach(async () => {
        await pages("login").open();
    });

    it("UC-3 : Log in with valid username and password", async() => {
        logger.info("Starting positive test (UC-3)");
        const loginInput = pages("login").loginInput;

        await Promise.all([
            loginInput.input("username").setValue("standard_user"),
            loginInput.input("password").setValue("secret_sauce")
        ]);

        await loginInput.loginBtn.click();
        logger.info("Clicked login button");

        await expect(pages("catalogue").catalogueTitle.textTitle).toHaveText("Swag Labs");
        logger.info("Successfully logged in");
    });
});