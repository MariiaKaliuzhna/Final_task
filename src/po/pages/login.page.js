const BasePage = require("./base.page");
const { ErrorMessageComponent, LoginComponent } = require("./../components");

class LoginPage extends BasePage{
    constructor() {
        super("/");
        this.errorMessage = new ErrorMessageComponent();
        this.loginInput = new LoginComponent();
    }
}

module.exports = LoginPage;