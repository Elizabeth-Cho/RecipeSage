import * as recipes from '../consts/my_recipe_const';
import * as sidebar from '../consts/sidebar_const';
import * as create from '../consts/create_recipe_const';
import * as landing_login from '../consts/landing_login_const';
import * as shopping_list from '../consts/shopping_lists_consts';
import * as meal_plans from '../consts/meal_plans_consts';

describe('my recipes - single recipe',() => {
    before(() => {
        // login
        cy.visit('/')
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('jluo30@jhu.edu')
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('1234567')
        cy.get(landing_login.LOGIN_SUBMIT).click();
        // create the recipe that gets edited
        cy.get(create.CREATE_RECIPE_BUTTON).click();
        cy.get(create.TITLE_INPUT).type('garlic bread');
        cy.get(create.DESCRIPTION_INPUT).type('bread with garlic');
        cy.get(create.YIELD_INPUT).type('1 (for me)');
        cy.get(create.ACTIVE_TIME_INPUT).type('13 min');
        cy.get(create.TOTAL_TIME_INPUT).type('18 min');
        cy.get(create.SOURCE_INPUT).type('Simply Recipes');
        cy.get(create.SOURCE_URL_INPUT).type('https://www.simplyrecipes.com/recipes/garlic_bread/');
        cy.get(create.INGREDIENTS_INPUT).type('1 week old loaf of bread \n half cup of unsalted butter, softened \n 2 large cloves of garlic \n 1 heaping tbsp of chopped fresh parsley');
        cy.get(create.INSTRUCTIONS_INPUT).type('preheat oven to 350F \n cut loaf in half \n mix butter, garlic, and parsley in a small bowl and spread it on the bread halves \n heat in oven for 10 minutes \n slice');
        cy.get(create.NOTES_INPUT).type('mmmm garlic');
        cy.get(create.FOURTH_STAR_RATING).click();
        cy.get(create.SUBMIT).click();
        cy.wait(1000);
        cy.visit('/#/list/main');
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.LOGOUT).click();
        cy.wait(3000);
    })

    beforeEach(() => {
        cy.visit('/')
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('jluo30@jhu.edu')
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('1234567')
        cy.get(landing_login.LOGIN_SUBMIT).click();
        // give it time to load the recipes?
        // cy.wait(3000);
        // cy.visit('/#/messages');
        // cy.wait(5000);
        // cy.visit('/#/list/main');
        // logging in immediately leads to my recipes 
    })

    after(() => {
        cy.visit('/#/list/main');
        cy.get(create.DELETE_RECIPE).click({force: true});
        cy.wait(500);
        cy.get(create.DELETE_CONFIRM).click({force: true});
    })

    // if i add a recipe and edit it, the changes should be reflected -> updated
    it('should reflect any edits I make to a recipe I create', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.EDIT).click();
        cy.wait(500);
        cy.get(recipes.NOTES_EDIT).click({force: true});
        cy.get(recipes.NOTES_EDIT).clear();
        cy.get(recipes.NOTES_EDIT).type('mmmm extra garlic');
        cy.get(recipes.INSTRUCTIONS_EDIT).type('\n share (or not)');
        cy.get(recipes.INGREDIENTS_EDIT).type('\n parmesan cheese');
        cy.get(recipes.SAVE).click();
        cy.url().should('contain', '/recipe/');
        cy.get(create.NOTES).contains('mmmm extra garlic');
        cy.get(create.INSTRUCTIONS).contains('share (or not)');
        cy.get(create.INGREDIENTS).contains('parmesan cheese');
    })

    // if i add a recipe and add a label and go back to the recipe list page, the label should be visible -> updated
    it('should be able to see a label I add to the recipe', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.CREATE_SELECT_LABEL).type('dinner');
        cy.get(recipes.CREATE_DINNER).click();
        cy.get(recipes.DINNER_LABEL).contains('dinner');
        cy.get(recipes.DINNER_LABEL).click();
    })

    // scaling recipe - should be able to scale numbers -> updated
    it('should be able to scale measurements written as numbers', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.wait(500)
        cy.get(recipes.SCALE_BUTTON).click();
        cy.get(recipes.DOUBLE_SCALE).click();
        cy.get(recipes.SCALE_APPLY).click();
        cy.get(create.INGREDIENTS).contains('4 large cloves of garlic');
        cy.get(create.INGREDIENTS).contains('2 heaping tbsp of chopped fresh parsley');
    })

    // scaling recipe - should be able to scale measurements in words --> fails, updated
    it('should be able to scale measurements written as words instead of numbers', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.SCALE_BUTTON).click();
        cy.get(recipes.DOUBLE_SCALE).click();
        cy.get(recipes.SCALE_APPLY).click();
        cy.get(create.INGREDIENTS).contains('one cup of unsalted butter');
    })

    // scaling recipe - scaling any number? --> fails, updated
    it('should only scale numbers associated with measurements', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.SCALE_BUTTON).click();
        cy.get(recipes.DOUBLE_SCALE).click();
        cy.get(recipes.SCALE_APPLY).click();
        cy.wait(500);
        cy.get(create.INGREDIENTS).contains('1 week old loaf of bread');
    })

    // scaling recipe - scaling the values and then clicking out and then 
    // reopening the recipe should have the original measurements -> updated
    it('should reset the scaling after clicking off of the recipe', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.SCALE_BUTTON).click();
        cy.get(recipes.DOUBLE_SCALE).click();
        cy.get(recipes.SCALE_APPLY).click();
        cy.wait(500);
        cy.get(create.RECIPE_CARD_BACK).click();
        cy.wait(500);
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(create.INGREDIENTS).contains('2 large cloves of garlic');
        cy.get(create.INGREDIENTS).contains('1 heaping tbsp of chopped fresh parsley');
        cy.get(create.INGREDIENTS).contains('half cup of unsalted butter');
        cy.get(create.INGREDIENTS).contains('1 week old loaf of bread');
    })

    // add recipe to shopping list - clicking select/deselect all should toggle it for all of them -> updated
    it('should be able to select and deselect all ingredients when toggling select/deselect all', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.ADD_TO_SHOPPING_LIST).click();
        cy.get(recipes.SELECT_DESELECT_ALL).should('have.class', 'item-checkbox-checked');
        cy.get(recipes.BREAD_CHECK).should('have.class', 'item-checkbox-checked');
        cy.get(recipes.GARLIC_CHECK).should('have.class', 'item-checkbox-checked');
        cy.get(recipes.PARSLEY_CHECK).should('have.class', 'item-checkbox-checked');
        cy.get(recipes.PARMESAN_CHECK).should('have.class', 'item-checkbox-checked');
        cy.get(recipes.SELECT_DESELECT_ALL).click();
        cy.get(recipes.SELECT_DESELECT_ALL).should('not.have.class', 'item-checkbox-checked');
        cy.get(recipes.BREAD_CHECK).should('not.have.class', 'item-checkbox-checked');
        cy.get(recipes.GARLIC_CHECK).should('not.have.class', 'item-checkbox-checked');
        cy.get(recipes.PARSLEY_CHECK).should('not.have.class', 'item-checkbox-checked');
        cy.get(recipes.PARMESAN_CHECK).should('not.have.class', 'item-checkbox-checked');
    })

    // unchecking one should also uncheck the select/deselect all -> updated
    it('should uncheck the check/uncheck option if one item is unchecked', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.ADD_TO_SHOPPING_LIST).click();
        cy.get(recipes.BREAD_CHECK).click();
        // select/deselect all should be unchecked
        cy.get(recipes.SELECT_DESELECT_ALL).should('not.have.class', 'item-checkbox-checked');
    })

    // shopping list - adding the ingredients to the shopping list should add 
    // the ingredients - badge number reflected accordingly -> updated
    it('should add the ingredients to the shopping list', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.ADD_TO_SHOPPING_LIST).click();
        cy.get(recipes.ATSL_NEW_SHOPPING_LIST).click();
        cy.get(recipes.ATSL_NEW_SHOPPING_LIST_TITLE).type('garlic bread test');
        cy.get(recipes.ATSL_CREATE_LIST).click();
        cy.wait(1000);
        cy.get(recipes.ADD_TO_SHOPPING_LIST_SUBMIT).click();
        cy.visit('/#/shopping-lists');
        // cy.get(recipes.SHOPPING_LIST_BADGE).contains('5');
        cy.get(recipes.FOOD_RUN).click();
        cy.get(recipes.BREAD).contains('1 week old loaf of bread');
        cy.get(recipes.BUTTER).contains('half cup of unsalted butter, softened');
        cy.get(recipes.PARSLEY).contains('1 heaping tbsp of chopped fresh parsley');
        cy.get(recipes.GARLIC).contains('2 large cloves of garlic');
        cy.get(recipes.REMOVE_GARLIC_BREAD).click();
        // delete list
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click({force: true});
        cy.wait(500);
        cy.get(shopping_list.DELETE_SHOPPING_LIST).click({force: true});
        cy.wait(500);
        cy.get(shopping_list.DELETE_CONFIRM).click({force: true});
    })

    // shopping list - adding the scaled ingredients to the shopping list 
    // should add the scaled ingredients -> updated
    it('should add the scaled ingredients to the shopping list', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.ADD_TO_SHOPPING_LIST).click();
        cy.get(recipes.ATSL_NEW_SHOPPING_LIST).click();
        cy.get(recipes.ATSL_NEW_SHOPPING_LIST_TITLE).type('garlic bread test');
        cy.get(recipes.ATSL_CREATE_LIST).click();
        cy.wait(1000);
        cy.get(recipes.ADD_TO_SHOPPING_LIST_SCALE).click();
        cy.get(recipes.ATSL_DOUBLE_SCALE).click();
        cy.get(recipes.ATSL_SCALE_APPLY).click();
        cy.wait(1000);
        // yeah not the 'appropriate' value but trying to make sure the change happened
        cy.get(recipes.BREAD_CHECK).contains('2 week old loaf of bread'); 
        cy.get(recipes.ADD_TO_SHOPPING_LIST_SUBMIT).click();
        cy.visit('/#/shopping-lists');
        // cy.get(recipes.SHOPPING_LIST_BADGE).contains('5');
        cy.get(recipes.FOOD_RUN).click();
        cy.get(recipes.BREAD).contains('2 week old loaf of bread');
        cy.get(recipes.BUTTER).contains('half cup of unsalted butter, softened');
        cy.get(recipes.PARSLEY).contains('2 heaping tbsp of chopped fresh parsley');
        cy.get(recipes.GARLIC).contains('4 large cloves of garlic');
        cy.get(recipes.REMOVE_GARLIC_BREAD).click();
        // delete list
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click({force: true});
        cy.wait(500);
        cy.get(shopping_list.DELETE_SHOPPING_LIST).click({force: true});
        cy.wait(500);
        cy.get(shopping_list.DELETE_CONFIRM).click({force: true});
    }) 

    // add to meal plan - when there's no meal plan available, should not be able to submit -> updated
    it('should not be able to submit the add to meal plan form if there are no available meal plans (prompt to create a new one)', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.ADD_TO_MEAL_PLAN).click();
        cy.get(recipes.ATMP_SUBMIT).should('not.be.enabled');
    })

    // share - should be able to click all the tabs --> new tests start here -> updated
    it('should be able to click on all the tabs when sharing a recipe', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.SHARE_RECIPE).click();
        cy.get(recipes.SHARE_LINK).click();
        cy.get(recipes.SHARE_EMBED).click();
        cy.get(recipes.SHARE_RECIPESAGE).click();
    })

    // share - should not be able to send with empty email -> updated
    it('should not be able to share a recipe when no email is filled out', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.SHARE_RECIPE).click();
        cy.get(recipes.SHARE_EMAIL_INPUT).clear();
        cy.get(recipes.SHARE_EMAIL_SUBMIT).should('not.be.enabled');
    })

    // share - should not be able to send with invalid email account -> updated
    it('should not be able to share a recipe when an invalid email is filled out', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.SHARE_RECIPE).click();
        cy.get(recipes.SHARE_EMAIL_INPUT).type('no@no.no');
        cy.get(recipes.SHARE_EMAIL_STATUS).contains('No results');
        cy.get(recipes.SHARE_EMAIL_SUBMIT).should('not.be.enabled');
    })

    // share - should be able to send with valid email - gonna test sending in recipe inbox -> updated
    it('should be able to share a recipe when a valid email is filled out', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.SHARE_RECIPE).click();
        cy.get(recipes.SHARE_EMAIL_INPUT).type('18ElizabethCho@gmail.com');
        cy.get(recipes.SHARE_EMAIL_STATUS).contains('Click to select');
        cy.get(recipes.SHARE_EMAIL_SUBMIT).should('not.be.disabled');
        cy.get(recipes.SHARE_CLOSE).click();
    })

    // print - popup shows up -> updated
    it('should show the menu when attempting to print a recipe', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.PRINT_RECIPE).click();
        cy.get(recipes.PRINT_POPUP).should('be.visible');
    })

    // print - should not be able to click button if no layout selected -> updated
    it('should not be able to print without selecting a layout', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.PRINT_RECIPE).click();
        cy.get(recipes.PRINT_BUTTON).should('not.be.enabled');
    })

    // print - can click on each layout -> updated
    it('should be able to click on each layout', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.PRINT_RECIPE).click();
        cy.get(recipes.PRINT_PORTRAIT_PIC).click();
        cy.get(recipes.PRINT_PORTRAIT_PIC).should('have.class', 'selected');
        cy.get(recipes.PRINT_PORTRAIT_NO_PIC).click();
        cy.get(recipes.PRINT_PORTRAIT_NO_PIC).should('have.class', 'selected');
        cy.get(recipes.PRINT_LANDSCAPE_2_COL).click();
        cy.get(recipes.PRINT_LANDSCAPE_2_COL).should('have.class', 'selected');
        cy.get(recipes.PRINT_LANDSCAPE_1_COL).click();
        cy.get(recipes.PRINT_LANDSCAPE_1_COL).should('have.class', 'selected');
    })

    // print - clicking on a layout enables the button -> updated
    it('should enable the print button after selecting a layout', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.PRINT_RECIPE).click();
        cy.get(recipes.PRINT_PORTRAIT_PIC).click();
        cy.get(recipes.PRINT_BUTTON).should('not.be.disabled');
        cy.get(recipes.PRINT_CLOSE).click();
    })
})

describe('my recipes - single recipe + meal plan', () => {
    before(() => {
        // login
        cy.visit('/')
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('jluo30@jhu.edu')
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('1234567')
        cy.get(landing_login.LOGIN_SUBMIT).click();
        // create the recipe that gets edited
        cy.get(create.CREATE_RECIPE_BUTTON).click();
        cy.get(create.TITLE_INPUT).type('garlic bread');
        cy.get(create.DESCRIPTION_INPUT).type('bread with garlic');
        cy.get(create.YIELD_INPUT).type('1 (for me)');
        cy.get(create.ACTIVE_TIME_INPUT).type('13 min');
        cy.get(create.TOTAL_TIME_INPUT).type('18 min');
        cy.get(create.SOURCE_INPUT).type('Simply Recipes');
        cy.get(create.SOURCE_URL_INPUT).type('https://www.simplyrecipes.com/recipes/garlic_bread/');
        cy.get(create.INGREDIENTS_INPUT).type('1 week old loaf of bread \n half cup of unsalted butter, softened \n 2 large cloves of garlic \n 1 heaping tbsp of chopped fresh parsley');
        cy.get(create.INSTRUCTIONS_INPUT).type('preheat oven to 350F \n cut loaf in half \n mix butter, garlic, and parsley in a small bowl and spread it on the bread halves \n heat in oven for 10 minutes \n slice');
        cy.get(create.NOTES_INPUT).type('mmmm garlic');
        cy.get(create.FOURTH_STAR_RATING).click();
        cy.get(create.SUBMIT).click();
        cy.wait(1000);
        cy.visit('/#/list/main');
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.LOGOUT).click();
        cy.wait(3000);
    })

    beforeEach(() => {
        cy.visit('/')
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('jluo30@jhu.edu')
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('1234567')
        cy.get(landing_login.LOGIN_SUBMIT).click();
        // give it time to load the recipes?
        // cy.wait(3000);
        // cy.visit('/#/messages');
        // cy.wait(5000);
        // cy.visit('/#/list/main');
        // logging in immediately leads to my recipes 
    })

    afterEach(() => {
        // delete the meal plan
        cy.visit('/#/meal-planners');
        cy.wait(1000);
        cy.get(recipes.FIRST_MEAL_PLAN_IN_LIST).click({force: true});
        cy.wait(500);
        cy.get(meal_plans.OPTIONS).click();
        cy.get(meal_plans.DELETE_MEAL_PLAN).click();
        cy.get(meal_plans.DELETE_PLAN_CONFIRM).click();
    })

    after(() => {
        cy.visit('/#/list/main');
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force: true});
        cy.get(create.DELETE_RECIPE).click({force: true});
        cy.wait(500);
        cy.get(create.DELETE_CONFIRM).click({force: true});
    })

    // add to meal plan - clicking cancel should leave it "blank" and the 
    // "select a meal" button should be disabled -> updated
    it('should leave the values as default when no option is selected when adding to a meal plan', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.ADD_TO_MEAL_PLAN).click();
        // create a new meal plan
        cy.get(recipes.ATMP_CREATE_MP).click();
        cy.get(recipes.ATMP_CREATE_MP_INPUT).type('test meal plan');
        cy.get(recipes.ATMP_CREATE_MP_SUBMIT).click();
        // select
        cy.get(recipes.ATMP_SELECT_MEAL).click();
        cy.get(recipes.ATMP_SELECT_MEAL_CANCEL).click();
        cy.get(recipes.ATMP_SUBMIT).should('not.be.enabled');
        cy.get(recipes.ATMP_CLOSE).click();
    })

    // add to meal plan - after selecting a meal, button should be enabled -> updated
    it('should have the submit button enabled after the meal is selected', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.ADD_TO_MEAL_PLAN).click();
        // create a new meal plan
        cy.get(recipes.ATMP_CREATE_MP).click();
        cy.get(recipes.ATMP_CREATE_MP_INPUT).type('test meal plan');
        cy.get(recipes.ATMP_CREATE_MP_SUBMIT).click();
        // select
        cy.get(recipes.ATMP_SELECT_MEAL).click();
        cy.wait(500);
        cy.get(recipes.ATMP_DINNER).click();
        cy.get(recipes.ATMP_SELECT_MEAL_OK).click();
        cy.get(recipes.ATMP_SUBMIT).should('not.be.disabled');
        cy.get(recipes.ATMP_CLOSE).click();
    })

    // add to meal plan - after adding the meal, it should be visible on the other page - 
    // badge says 1 -> updated
    it('should update the meal plan page after a recipe is added to a meal plan', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.ADD_TO_MEAL_PLAN).click();
        // create a new meal plan
        cy.get(recipes.ATMP_CREATE_MP).click();
        cy.get(recipes.ATMP_CREATE_MP_INPUT).type('test meal plan');
        cy.get(recipes.ATMP_CREATE_MP_SUBMIT).click();
        // select
        cy.get(recipes.ATMP_SELECT_MEAL).click();
        cy.wait(500);
        cy.get(recipes.ATMP_DINNER).click();
        cy.get(recipes.ATMP_SELECT_MEAL_OK).click();
        // select date
        cy.get(recipes.ATMP_DATE).click();
        cy.get(recipes.ATMP_SUBMIT).click();
        cy.visit('/#/meal-planners');
        cy.get(recipes.ATMP_TEST_MEAL_PLAN).click();
        cy.get(recipes.ATMP_CALENDAR_CARD).contains("garlic bread", {matchCase: false});
    })
})

describe('my recipes - creating copies', () => {
    before(() => {
        // login
        cy.visit('/')
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('jluo30@jhu.edu')
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('1234567')
        cy.get(landing_login.LOGIN_SUBMIT).click();
        // create the recipe that gets edited
        cy.get(create.CREATE_RECIPE_BUTTON).click();
        cy.get(create.TITLE_INPUT).type('garlic bread');
        cy.get(create.DESCRIPTION_INPUT).type('bread with garlic');
        cy.get(create.YIELD_INPUT).type('1 (for me)');
        cy.get(create.ACTIVE_TIME_INPUT).type('13 min');
        cy.get(create.TOTAL_TIME_INPUT).type('18 min');
        cy.get(create.SOURCE_INPUT).type('Simply Recipes');
        cy.get(create.SOURCE_URL_INPUT).type('https://www.simplyrecipes.com/recipes/garlic_bread/');
        cy.get(create.INGREDIENTS_INPUT).type('1 week old loaf of bread \n half cup of unsalted butter, softened \n 2 large cloves of garlic \n 1 heaping tbsp of chopped fresh parsley');
        cy.get(create.INSTRUCTIONS_INPUT).type('preheat oven to 350F \n cut loaf in half \n mix butter, garlic, and parsley in a small bowl and spread it on the bread halves \n heat in oven for 10 minutes \n slice');
        cy.get(create.NOTES_INPUT).type('mmmm garlic');
        cy.get(create.FOURTH_STAR_RATING).click();
        cy.get(create.SUBMIT).click();
        cy.wait(1000);
        cy.visit('/#/list/main');
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.LOGOUT).click();
        cy.wait(3000);
    })

    beforeEach(() => {
        cy.visit('/')
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('jluo30@jhu.edu')
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('1234567')
        cy.get(landing_login.LOGIN_SUBMIT).click();
        cy.wait(1000);
        // give it time to load the recipes?
        // cy.wait(3000);
        // cy.visit('/#/messages');
        // cy.wait(5000);
        // cy.visit('/#/list/main');
        // logging in immediately leads to my recipes 
    })

    after(() => {
        cy.visit('/#/list/main');
        cy.wait(1000);
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div').click({force: true});
        cy.get(create.DELETE_RECIPE).click({force: true});
        cy.wait(500);
        cy.get(create.DELETE_CONFIRM).click({force: true});
    })

    // make a copy - copy is visible in the recipe page -> updated
    it('should have the copied recipe on the recipe page', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.COPY_RECIPE).click();
        cy.get(create.TITLE).contains('(2)');
        cy.visit('/#/list/main');
        cy.get(recipes.EXTRA_BREAD, {timeout: 5000}).should('exist');
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(2)').click({force: true});
        cy.get(create.DELETE_RECIPE).click({force: true});
        cy.wait(500);
        cy.get(create.DELETE_CONFIRM).click({force: true});
        // cy.get(create.RECIPE_CARD_BACK).click();
        // cy.get(create.RECIPE_CARD_BACK).click();
    })

    // make a copy - redirect to main page and copy has (2) after it -> updated
    it('should switch to the copied recipe after making a copy', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.COPY_RECIPE).click();
        cy.wait(1000);
        cy.get(create.TITLE).contains('(2)');
        cy.visit('/#/list/main');
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(2)').click({force: true});
        cy.get(create.DELETE_RECIPE).click({force: true});
        cy.wait(500);
        cy.get(create.DELETE_CONFIRM).click({force: true});
    })

    // making a copy of a copy should increment the count --> fails, updated
    it('should increment the count badge after making a copy of a copy', () => {
        cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click({force:true});
        cy.get(recipes.COPY_RECIPE).click();
        cy.wait(1000);
        cy.get(create.TITLE).contains('(2)');
        cy.get(recipes.COPY_RECIPE).eq(1).click();
        cy.get(create.TITLE).contains('(2)');
        // delete copies
        cy.get(create.DELETE_RECIPE).eq(2).click({force: true});
        cy.wait(500);
        cy.get(create.DELETE_CONFIRM).click({force: true});
        cy.wait(500);
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(2)').click({force: true});
        cy.get(create.DELETE_RECIPE).click({force: true});
        cy.wait(500);
        cy.get(create.DELETE_CONFIRM).click({force: true});
    })
})

describe('my recipes - multiple recipes', () => {
    before(() => {
        // login
        cy.visit('/')
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('jluo30@jhu.edu')
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('1234567')
        cy.get(landing_login.LOGIN_SUBMIT).click();
        // create the recipe that gets edited
        cy.get(create.CREATE_RECIPE_BUTTON).click();
        cy.get(create.TITLE_INPUT).type('garlic bread');
        cy.get(create.DESCRIPTION_INPUT).type('bread with garlic');
        cy.get(create.YIELD_INPUT).type('1 (for me)');
        cy.get(create.ACTIVE_TIME_INPUT).type('13 min');
        cy.get(create.TOTAL_TIME_INPUT).type('18 min');
        cy.get(create.SOURCE_INPUT).type('Simply Recipes');
        cy.get(create.SOURCE_URL_INPUT).type('https://www.simplyrecipes.com/recipes/garlic_bread/');
        cy.get(create.INGREDIENTS_INPUT).type('1 week old loaf of bread \n half cup of unsalted butter, softened \n 2 large cloves of garlic \n 1 heaping tbsp of chopped fresh parsley');
        cy.get(create.INSTRUCTIONS_INPUT).type('preheat oven to 350F \n cut loaf in half \n mix butter, garlic, and parsley in a small bowl and spread it on the bread halves \n heat in oven for 10 minutes \n slice');
        cy.get(create.NOTES_INPUT).type('mmmm garlic');
        cy.get(create.FOURTH_STAR_RATING).click();
        cy.get(create.SUBMIT).click();
        cy.wait(1000);
        // autofill
        cy.visit('/#/edit-recipe/new/');
        cy.get(create.AUTOFILL_FROM_LINK).click();
        cy.get(create.AUTOFILL_URL).type('https://www.allrecipes.com/recipe/16383/basic-crepes/');
        cy.get(create.AUTOFILL_SUBMIT).click();
        cy.wait(1000);
        cy.get(create.LOADING_OVERLAY, {timeout: 30000}).should('not.be.visible');
        cy.get(create.SUBMIT).click();
        cy.wait(1000);
        cy.visit('/#/list/main');
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.LOGOUT).click();
        cy.wait(3000);
    })

    beforeEach(() => {
        cy.visit('/')
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('jluo30@jhu.edu')
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('1234567')
        cy.get(landing_login.LOGIN_SUBMIT).click();
        // give it time to load the recipes?
        // cy.wait(3000);
        // cy.visit('/#/messages');
        // cy.wait(5000);
        // cy.visit('/#/list/main');
        // logging in immediately leads to my recipes 
    })

    after(() => {
        cy.visit('/#/list/main');
        cy.wait(500);
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(1)').click({force: true});
        // cy.get(recipes.FIRST_RECIPE).click();
        cy.wait(500);
        cy.get(create.DELETE_RECIPE).click({force: true});
        cy.wait(500);
        cy.get(create.DELETE_CONFIRM).click({force: true});
        cy.wait(500);
        cy.visit('/#/list/main');
        cy.wait(1000);
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div').click({force: true});
        // cy.get(recipes.GARLIC_BREAD_SINGLE_CARD).click();
        cy.wait(500);
        cy.get(create.DELETE_RECIPE).click({force: true});
        cy.wait(500);
        cy.get(create.DELETE_CONFIRM).click({force: true});
    })
    
    // pin recipe open should pin it
    it('should pin the recipe open on the main page when pinning', () => {
        cy.get(recipes.FIRST_RECIPE).click({force:true});
        cy.get(recipes.PIN_RECIPE).click();
        cy.get(recipes.PIN_CONFIRM).click();
        cy.get(recipes.PIN_TOOLBAR).should('be.visible');
        cy.get(recipes.BREAD_PIN).should('be.visible');
    })

    // pinning another recipe open should also have the other recipe pinned open
    it('should be able to pin multiple recipes', () => {
        // cy.get(recipes.FIRST_RECIPE).click({force:true});
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(1)').click({force: true});
        cy.get(recipes.PIN_RECIPE).click();
        cy.get(recipes.PIN_CONFIRM).click();
        cy.visit('/#/list/main');
        cy.wait(1000);
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(2)').click({force: true});
        // cy.get(recipes.SECOND_RECIPE).click();
        cy.get(recipes.PIN_RECIPE).click();
        cy.get(recipes.COOKIES_PIN).should('be.visible');
    })

    // switching between pinned recipes
    it('should be able to click between pinned recipes', () => {
        // cy.get(recipes.FIRST_RECIPE).click({force:true});
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(1)').click({force: true});
        cy.get(recipes.PIN_RECIPE).click();
        cy.get(recipes.PIN_CONFIRM).click();
        cy.visit('/#/list/main');
        cy.wait(1000);
        // cy.get(recipes.SECOND_RECIPE).click();
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(2)').click({force: true});
        cy.get(recipes.PIN_RECIPE).click();
        cy.get(recipes.BREAD_PIN).click();
        // cy.get(create.TITLE).contains('garlic bread', {matchCase: false});
        cy.get(recipes.COOKIES_PIN).click();
        // cy.get(create.TITLE).contains('Cookie', {matchCase: false});
    })

    // unpin a recipe
    it('should unpin a recipe when I click unpin recipe', () => {
        // cy.get(recipes.FIRST_RECIPE).click({force:true});
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(1)').click({force: true});
        cy.get(recipes.PIN_RECIPE).click();
        cy.get(recipes.PIN_CONFIRM).click();
        cy.visit('/#/list/main');
        cy.wait(1000);
        // cy.get(recipes.SECOND_RECIPE).click();
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(2)').click({force: true});
        cy.get(recipes.PIN_RECIPE).click();
        cy.get(recipes.PIN_RECIPE).eq(0).click({force: true});
        cy.get(recipes.COOKIES_PIN).should('not.exist');
    })

    // closing the pin toolbar
    it('should not have any pins when the toolbar is closed', () => {
        // cy.get(recipes.FIRST_RECIPE).click({force:true});
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(1)').click({force: true});
        cy.get(recipes.PIN_RECIPE).click();
        cy.get(recipes.PIN_CONFIRM).click();
        cy.visit('/#/list/main');
        cy.wait(1000);
        // cy.get(recipes.SECOND_RECIPE).click();
        cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(2)').click({force: true});
        cy.get(recipes.PIN_RECIPE).click();
        cy.get(recipes.CLOSE_PIN_TOOLBAR).click();
        cy.get(recipes.CLEAR_PIN_TOOLBAR_CONRFIRM).click();
        cy.get(recipes.PIN_TOOLBAR).should('not.exist');
    })

})