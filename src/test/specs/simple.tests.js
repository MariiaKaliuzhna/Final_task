const { pages } = require("./../../po");

describe ("Website", async() => {
    beforeEach (async() => {
        await browser.url("/");
    });

    it ("Open web page", async() => {
        await expect(browser).toHaveTitle("Swag Labs");
        await browser.pause(1000);
    });
});

describe ("Login", async() => {
    beforeEach (async() => {
        await browser.url("/");
    });

    it ("Login without username", async() => {
        const loginInput = await pages("login").loginInput;
        await loginInput.input("username").setValue("test");
        await loginInput.input("password").setValue("test");

        await loginInput.clearField(loginInput.input("username"));
        await loginInput.clearField(loginInput.input("password"));

        await pages("login").loginInput.loginBtn.click();

        await pages("login").errorMessage.errorText.waitForDisplayed();
        await expect(pages("login").errorMessage.errorText).toHaveText("Epic sadface: Username is required");
    });
});