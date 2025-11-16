const BaseComponent = require("./base.component");

class ErrorMessageComponent extends BaseComponent {
    constructor() {
        super("//*[@id='login_button_container']/div/form/div[3]");
    }

    get errorText() {
        return this.rootEl.$("//h3");
    }
}

module.exports = ErrorMessageComponent;