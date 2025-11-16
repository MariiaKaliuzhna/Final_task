const BaseComponent = require("./base.component");

class ErrorMessageComponent extends BaseComponent {
    constructor() {
        super(".error-message-container.error");
    }

    get errorText() {
        return this.rootEl.$("h3");
    }
}

module.exports = ErrorMessageComponent;