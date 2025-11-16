const LoginPage = require("./login.page");
const CataloguePage = require("./catalogue.page");

function pages(name) {
    const items = {
        login: new LoginPage(),
        catalogue: new CataloguePage()
    }
    return items[name.toLowerCase()];
}

module.exports = {
    LoginPage,
    CataloguePage,
    pages
}