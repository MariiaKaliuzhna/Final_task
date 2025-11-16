const BaseComponent = require("./base.component");

class LoginComponent extends BaseComponent {
    constructor() {
        super(".login_wrapper-inner");
    }

    input(param) {
        const selectors = {
            username: "#user-name",
            password: "#password"
        }
        return this.rootEl.$(selectors[param.toLowerCase()]);
    }

    get loginBtn() {
        return this.rootEl.$(".submit-button");
    }

    async clearField(input) {
        await input.click();
        const value = await input.getValue();
        for (let i = 0; i < value.length; i++) {
            await browser.keys('Backspace');
        }
    }
}

module.exports = LoginComponent;