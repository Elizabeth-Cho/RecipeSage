import * as sidebar from '../consts/sidebar_const';
import * as meal_plan from '../consts/meal_plans_consts';
import { PIN_TOOLBAR } from 'cypress/consts/my_recipe_const';

describe('meal plans - create a meal plan', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('.title > .button-small').click();
        cy.get(':nth-child(8) > .ng-untouched').type('echo30.dev@gmail.com')
        cy.get(':nth-child(11) > .ng-untouched').type('password')
        cy.get('.ion-padding > .md').click();
        // cy.get(sidebar.OPEN_SIDEBAR).click();
        // cy.get(sidebar.MEAL_PLANS).click();
        cy.wait(1000);
        cy.visit('/#/meal-planners');
    })

    // should be able to create a meal plan from the meal plan page
    it('should be able to create a meal plan from the meal plan page', () => {
        cy.get(meal_plan.NEW_MEAL_PLAN).click();
        cy.get(meal_plan.NEW_MEAL_PLAN_MODAL).should('be.visible');
        cy.get(meal_plan.NEW_MEAL_PLAN_TITLE_INPUT).type('test plan');
        cy.get(meal_plan.CREATE_NEW_MEAL_PLAN).click();
        cy.get(meal_plan.MEAL_PLAN_TITLE).contains('test plan');
        // reset
        cy.get(meal_plan.OPTIONS).click();
        cy.wait(500);
        cy.get(meal_plan.DELETE_MEAL_PLAN).click();
        cy.get(meal_plan.DELETE_PLAN_CONFIRM).click();
    })

    it('should not be able to create a new meal plan without a title', () => {
        cy.get(meal_plan.NEW_MEAL_PLAN).click();
        cy.get(meal_plan.CREATE_NEW_MEAL_PLAN).should('not.be.enabled');
        cy.get(meal_plan.CLOSE_NEW_MEAL_PLAN_MODAL).click();
    })
})

describe('meal plans - edit an item', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('.title > .button-small').click();
        cy.get(':nth-child(8) > .ng-untouched').type('echo30.dev@gmail.com')
        cy.get(':nth-child(11) > .ng-untouched').type('password')
        cy.get('.ion-padding > .md').click();
        cy.wait(1000);
        cy.visit('/#/meal-planners');
        // cy.get(sidebar.OPEN_SIDEBAR).click();
        // cy.get(sidebar.MEAL_PLANS).click();
        // make a test plan
        cy.get(meal_plan.NEW_MEAL_PLAN).click();
        cy.get(meal_plan.NEW_MEAL_PLAN_TITLE_INPUT).type('test plan');
        cy.get(meal_plan.CREATE_NEW_MEAL_PLAN).click();
    })

    afterEach(() => {
        cy.get(meal_plan.OPTIONS).click({force: true});
        cy.wait(500);
        cy.get(meal_plan.DELETE_MEAL_PLAN).click({force: true});
        cy.get(meal_plan.DELETE_PLAN_CONFIRM).click({force: true});
    })

    // should be able to click through the meals
    it('should be able to click through the meals', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_LUNCH).click();
        cy.get(meal_plan.SELECT_DINNER).click();
        cy.get(meal_plan.SELECT_DINNER).click();
        cy.get(meal_plan.SELECT_OTHER).click();
        cy.get(meal_plan.SELECT_CANCEL).click();
        cy.wait(500);
        cy.get(meal_plan.CLOSE_ADD_MEAL_PLAN_ITEM_MODAL).click();
        // .click();
    })

    // should be able to add recipes to a meal plan via the meal plan page
    it('should be able to add recipes to a meal plan from the meal planner page', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.RECIPE_SEARCH).type('crepe');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).contains('Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).click();
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.get(meal_plan.CALENDAR_DATE).contains('Basic Crêpes Recipe (with Video)');
    })

    // should be able to manually add items via the meal plan page
    it('should be able to manually add an item to a meal plan from the meal planner page', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.MANUAL_ENTRY_TAB).click();
        cy.get(meal_plan.ITEM_TITLE).type('cereal');
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.get(meal_plan.CALENDAR_DATE).contains('cereal');
    })

    // should be able to edit an item - date
    // it.only('should be able to edit the date of an item', () => {
    //     cy.get(meal_plan.CALENDAR_DATE).click();
    //     cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
    //     cy.get(meal_plan.RECIPE_SEARCH).type('crepe');
    //     cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).contains('Basic Crêpes Recipe (with Video)');
    //     cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).click();
    //     cy.get(meal_plan.SELECT_MEAL).click();
    //     cy.get(meal_plan.SELECT_BREAKFAST).click();
    //     cy.get(meal_plan.SELECT_OK).click();  
    //     cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
    //     cy.wait(1000);
    //     cy.get(meal_plan.CALENDAR_DATE).click();
    //     cy.get(meal_plan.ITEM_EDIT).click();
    //     cy.get(meal_plan.CHANGE_DATE).click();
    //     cy.wait(500);
    //     cy.get(meal_plan.CHANGE_DATE).invoke('removeAttr', 'type').clear().type('04-28-2023');
    //     cy.wait(500);
    //     cy.get(meal_plan.SAVE_CHANGES);
    //     // cy.get(meal_plan.OTHER_CALENDAR_DATE).contains('Basic Crêpes Recipe (with Video)');
    // })
    
    // should be able to edit an item - meal
    it('should be able to edit the meal of an item', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.RECIPE_SEARCH).type('crepe');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).contains('Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).click();
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();  
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(1000);
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ITEM_EDIT).click();
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.wait(500);
        cy.get(meal_plan.SELECT_SNACK).click();
        cy.get(meal_plan.SELECT_OK).click();
        cy.wait(500);
        cy.get(meal_plan.SAVE_CHANGES).click();
    })

    // should be able to edit an item - recipe/title
    it('should be able to edit the recipe of an item', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.RECIPE_SEARCH).type('crepe');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).contains('Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).click();
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();  
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(1000);
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ITEM_EDIT).click();
        cy.get(meal_plan.CHANGE_RECIPE).click();
        cy.get(meal_plan.RECIPE_SEARCH).type('fruit');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).contains('Fruit Syrup');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).click();
        cy.get(meal_plan.SAVE_CHANGES).click();
        cy.get(meal_plan.CALENDAR_DATE).contains('Fruit Syrup');
    })

    // moving a single item
    // it('should be able to drag and drop a single item', () => {
    //     cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
    //     cy.get(meal_plan.MANUAL_ENTRY_TAB).click();
    //     cy.get(meal_plan.ITEM_TITLE).type('cereal');
    //     cy.get(meal_plan.SELECT_MEAL).click();
    //     cy.get(meal_plan.SELECT_BREAKFAST).click();
    //     cy.get(meal_plan.SELECT_OK).click();
    //     cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
    // })

    // move all items on a day
    it('should be able to move all items on a single day', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.RECIPE_SEARCH).type('crepe');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).contains('Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).click();
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();  
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(1000);
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.MANUAL_ENTRY_TAB).click();
        cy.get(meal_plan.ITEM_TITLE).type('cereal');
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(500);
        cy.get(meal_plan.OPTIONS).click({force: true});
        cy.wait(500);
        cy.get(meal_plan.MOVE_SELECTED_DAYS).click({force: true});
        cy.get(meal_plan.MOVE_ALL_TO_CONFIRM).click();
        cy.get(meal_plan.OTHER_CALENDAR_DATE).click();
        cy.get(meal_plan.MOVE_ALL_SELECT_CONFIRM).click();
        cy.get(meal_plan.OTHER_CALENDAR_DATE).contains('Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.OTHER_CALENDAR_DATE).contains('cereal');
    })


    // copy a single item
    it('should be able to copy a single item', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.MANUAL_ENTRY_TAB).click();
        cy.get(meal_plan.ITEM_TITLE).type('cereal');
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(500);
        cy.get(meal_plan.CEREAL_ITEM).click();
        cy.get(meal_plan.MANUAL_DUPLICATE).click();
        cy.get(meal_plan.ITEM_TITLE).type(' (2)');
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.get(meal_plan.CALENDAR_DATE).contains('cereal (2)');
    })

    // copy all items on a day
    it('should be able to copy all items on a day', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.RECIPE_SEARCH).type('crepe');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).contains('Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).click();
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();  
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(1000);
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.MANUAL_ENTRY_TAB).click();
        cy.get(meal_plan.ITEM_TITLE).type('cereal');
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(500);
        cy.get(meal_plan.OPTIONS).click({force: true});
        cy.get(meal_plan.COPY_SELECTED_DAYS).click();
        cy.get(meal_plan.COPY_ALL_CONFIRM).click();
        cy.get(meal_plan.OTHER_CALENDAR_DATE).click();
        cy.get(meal_plan.COPY_ALL_SELECT_CONFIRM).click();
        // check
        cy.get(meal_plan.OTHER_CALENDAR_DATE).contains('Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.OTHER_CALENDAR_DATE).contains('cereal');
        cy.get(meal_plan.CALENDAR_DATE).contains('Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.CALENDAR_DATE).contains('cereal');
    })

    // delete single item
    it('should be able to delete a single item - manual entry', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.MANUAL_ENTRY_TAB).click();
        cy.get(meal_plan.ITEM_TITLE).type('cereal');
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(1000);
        cy.get(meal_plan.CALENDAR_DATE).contains('cereal');
        cy.get(meal_plan.CEREAL_ITEM).click();
        cy.wait(500);
        cy.get(meal_plan.MANUAL_DELETE).click();
        cy.get(meal_plan.ITEM_DELETE_CONFIRM).click();
        cy.get(meal_plan.CALENDAR_DATE).should('not.contain', 'cereal');
    })

    it('should be able to delete a single item - recipe', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.RECIPE_SEARCH).type('crepe');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).contains('Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).click();
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();  
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(1000);
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ITEM_DELETE).click();
        cy.get(meal_plan.ITEM_DELETE_CONFIRM).click();
        cy.get(meal_plan.CALENDAR_DATE).should('not.contain', 'Basic Crêpes Recipe (with Video)');
        // cy.wait(1000);
    })

    // delete all items on a day
    it('should be able to delete all items on a day', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.RECIPE_SEARCH).type('crepe');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).contains('Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).click();
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();  
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(1000);
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.MANUAL_ENTRY_TAB).click();
        cy.get(meal_plan.ITEM_TITLE).type('cereal');
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(1000);
        cy.get(meal_plan.OPTIONS).click();
        cy.get(meal_plan.DELETE_SELECTED_DAYS).click();
        cy.get(meal_plan.DELETE_DAY_CONFIRM).click();
        cy.wait(500);
        cy.get(meal_plan.CALENDAR_DATE).should('not.contain', 'Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.CALENDAR_DATE).should('not.contain', 'cereal');

    })

    // pin a single item open
    it('should be able to pin a single recipe open', () => {
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ADD_MEAL_PLAN_ITEM).click();
        cy.get(meal_plan.RECIPE_SEARCH).type('crepe');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).contains('Basic Crêpes Recipe (with Video)');
        cy.get(meal_plan.RECIPE_SEARCH_FIRST_RESULT).click();
        cy.get(meal_plan.SELECT_MEAL).click();
        cy.get(meal_plan.SELECT_BREAKFAST).click();
        cy.get(meal_plan.SELECT_OK).click();  
        cy.get(meal_plan.ADD_TO_MEAL_PLAN).click();
        cy.wait(1000);
        cy.get(meal_plan.CALENDAR_DATE).click();
        cy.get(meal_plan.ITEM_PIN).click();
        // cy.wait(1000);
        cy.get(meal_plan.PIN_CONFIRM).click();
        cy.get(meal_plan.ITEM_CLOSE).click();
        cy.get(PIN_TOOLBAR).should('exist');
    })

    // pin multiple items on a day

    // add to other calendar programs???
})