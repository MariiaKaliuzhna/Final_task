const BaseComponent = require("./base.component");

class CatalogueTitleComponent extends BaseComponent{
    constructor() {
        super("//*[@class='app_logo']");
    }

    get textTitle() {
        return this.rootEl;
    }

}

module.exports = CatalogueTitleComponent;