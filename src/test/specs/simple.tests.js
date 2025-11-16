const { pages } = require("./../../po");
const fs = require("fs");
const path = require("path");

const testData = JSON.parse(fs.readFileSync("src/test/data/testData.json", "utf-8"));

describe ("Login", async() => {
    beforeEach (async() => {
        await browser.url("/");
    });

    testData.forEach(data => {
        it(`${data.id} : ${data.name} `, async() => {
            const loginInput = pages("login").loginInput;
            await Promise.all([
                loginInput.input("username").setValue(data.username),
                loginInput.input("password").setValue(data.password)
            ]);

            if (!data.isPositiveTesting){
                if (data.expectedResult === "Epic sadface: Username is required"){
                    await loginInput.clearField(loginInput.input("username"));
                    await loginInput.clearField(loginInput.input("password"));
                } else 
                    await loginInput.clearField(loginInput.input("password"));
            }

            await pages("login").loginInput.loginBtn.click();

            if (!data.isPositiveTesting){
                await pages("login").errorMessage.errorText.waitForDisplayed();
                await expect(pages("login").errorMessage.errorText).toHaveText(data.expectedResult);
            } else 
                await expect(pages("catalogue").catalogueTitle.textTitle).toHaveText("Swag Labs");
        });
    });
});