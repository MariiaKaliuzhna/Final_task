const BasePage = require("./base.page");
const { CatalogueTitleComponent } = require("./../components");

class CataloguePage extends BasePage{
    constructor() {
        super("/inventory.html");
        this.catalogueTitle = new CatalogueTitleComponent();
    }
}

module.exports = CataloguePage;