Final task for Automated Testing in JS
Mariia Kaliuzhna
Task:
Launch URL: https://www.saucedemo.com/

UC-1 Test Login form with empty credentials:
Type any credentials into "Username" and "Password" fields.
Clear the inputs.
Hit the "Login" button.
Check the error messages: "Username is required".

UC-2 Test Login form with credentials by passing Username:
Type any credentials in username.
Enter password.
Clear the "Password" input.
Hit the "Login" button.
Check the error messages: "Password is required".

UC-3 Test Login form with credentials by passing Username & Password:
Type credentials in username which are under Accepted username are sections.
Enter password as secret sauce.
Click on Login and validate the title “Swag Labs” in the dashboard.

Provide parallel execution, add logging for tests and use Data Provider to parametrize tests. Make sure that all tasks are supported by these 3 conditions: UC-1; UC-2; UC-3.

To perform the task use the various of additional options:
Test Automation tool: WebDriverIO;
Browsers: 1) Edge; 2) Firefox;
Locators: XPath;
Patterns: Page Object;
Assertions: Use from the selected framework;
[Optional] Loggers: Use from the selected framework.

Project structure:

po:
  index.js (re-export);
  
  pages:
    base.page.js (base),
    catalogue.page.js (second page where we need to validate title after successfully logging in),
    index.js (re-export of pages),
    login.page (first page where we try to log in);
    
  components:
    base.component.js (base),
    catalogue-title.component.js (title we need to validate in UC-3 after successfully logging in),
    error-message.component.js (error message we check in UC-1 and UC-2),
    index.js (re-export of components),
    login.component.js (form with input we need to fill with data in UC-1 and UC-2);
    
config:
  wdio.config.js (WDIO configuration file);
  
test:

  data:
    testData.json (data for parametrize tests);
    
  specs:
    simple.tests.js (main testing file);

To run tests use command: npm test
