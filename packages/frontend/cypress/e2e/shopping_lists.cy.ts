import * as sidebar from '../consts/sidebar_const';
import * as landing_login from '../consts/landing_login_const';
import * as shopping_list from '../consts/shopping_lists_consts';

describe('shopping lists - empty form verification', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(':nth-child(8) > .ng-untouched').type('echo30@jhu.edu');
        cy.get(':nth-child(11) > .ng-untouched').type('123456');
        cy.get('.ion-padding > .md').click();
        cy.wait(1000);
        cy.visit('/#/shopping-lists/');
        // cy.get(sidebar.OPEN_SIDEBAR).click();
        // cy.get(sidebar.SHOPPING_LISTS).click();
    })

    // should not be able to create a new shopping list without a name
    it('should not be able to create a new shopping list without a name', () => {
        cy.get(shopping_list.NEW_SHOPPING_LIST).click();
        cy.get(shopping_list.NEW_LIST_CREATE).should('not.be.enabled');
    })

    // need to have a name for the shopping list
    it('should be able to create a new shopping list with just a name', () => {
        cy.get(shopping_list.NEW_SHOPPING_LIST).click();
        cy.get(shopping_list.NEW_LIST_TITLE_INPUT).type('test shopping list');
        cy.get(shopping_list.NEW_LIST_CREATE).should('not.be.disabled');
        cy.get(shopping_list.NEW_LIST_CREATE).click();
        cy.get(shopping_list.NEW_LIST_BACK).click();
        cy.get(shopping_list.NEW_LIST_TITLE_SECOND).contains('test shopping list');
        // delete the shopping list to reset
        cy.get(shopping_list.SECOND_IN_LIST).click();
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.DELETE_SHOPPING_LIST).click();
        cy.get(shopping_list.DELETE_CONFIRM).click();
    })

    it('should not be able to click on add to list when there are no items added', () => {
        cy.get(shopping_list.NEW_SHOPPING_LIST).click();
        cy.get(shopping_list.NEW_LIST_TITLE_INPUT).type('test shopping list');
        cy.get(shopping_list.NEW_LIST_CREATE).click();
        // no items added
        cy.get(shopping_list.ADD_ITEMS_BOTTOM_CORNER).click();
        cy.get(shopping_list.ADD_ITEMS_ADD_TO_LIST).should('not.be.enabled');
        cy.get(shopping_list.ADD_ITEMS_CLOSE).click();
        // reset
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.DELETE_SHOPPING_LIST).click();
        cy.get(shopping_list.DELETE_CONFIRM).click();
    })

    // delete list
    it('should be able to delete a list', () => {
        cy.get(shopping_list.NEW_SHOPPING_LIST).click();
        cy.get(shopping_list.NEW_LIST_TITLE_INPUT).type('0. delete shopping list');
        cy.get(shopping_list.NEW_LIST_CREATE).click();
        cy.get(shopping_list.NEW_LIST_BACK).click();
        cy.get(shopping_list.FIRST_IN_LIST).should('exist');
        cy.get(shopping_list.FIRST_IN_LIST).contains('0. delete shopping list');  
        cy.get(shopping_list.FIRST_IN_LIST).click();
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.DELETE_SHOPPING_LIST).click();
        cy.get(shopping_list.DELETE_CONFIRM).click();
        cy.get(shopping_list.FIRST_IN_LIST).should('not.contain', '0. delete shopping list');  
    })
})

describe('shopping lists - creating and editing', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(':nth-child(8) > .ng-untouched').type('echo30@jhu.edu');
        cy.get(':nth-child(11) > .ng-untouched').type('123456');
        cy.get('.ion-padding > .md').click();
        // cy.get(sidebar.OPEN_SIDEBAR).click();
        // cy.get(sidebar.SHOPPING_LISTS).click();
        cy.wait(1000);
        cy.visit('/#/shopping-lists/');
        // new list
        cy.get(shopping_list.NEW_SHOPPING_LIST).click();
        cy.get(shopping_list.NEW_LIST_TITLE_INPUT).type('test shopping list');
        cy.get(shopping_list.NEW_LIST_CREATE).click();
    })

    afterEach(() => {
        // delete the shopping list to reset
        // cy.get(shopping_list.SECOND_IN_LIST).click();
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click({force: true});
        cy.wait(500);
        cy.get(shopping_list.DELETE_SHOPPING_LIST).click({force: true});
        cy.wait(500);
        cy.get(shopping_list.DELETE_CONFIRM).click({force: true});
    })

    // add items directly to a shopping list with the bottom corner button - single
    it('should be able to add items directly to a shopping list using the bottom corner button', () => {
        // add a single item
        cy.get(shopping_list.ADD_ITEMS_BOTTOM_CORNER).click();
        cy.get(shopping_list.ADD_ITEMS_MODAL).should('be.visible');
        cy.get(shopping_list.ITEM_TITLE_INPUT).type('strawberries');
        cy.get(shopping_list.ADD_ITEMS_ADD_TO_LIST).click();
        cy.get(shopping_list.ADDED_STRAWBERRIES).should('exist');
        cy.get(shopping_list.ADDED_STRAWBERRIES).contains('strawberries');
    })

    // add items directly to a shopping list with the center button - multiple
    it('should be able to add items directly to a shopping list using the center button', () => {
        cy.get(shopping_list.ADD_ITEMS_CENTER).click();
        cy.get(shopping_list.ADD_ITEMS_MODAL).should('be.visible');
        cy.get(shopping_list.ITEM_TITLE_INPUT).type('strawberries');
        cy.get(shopping_list.SECOND_ITEM_TITLE_INPUT).type('blueberries');
        cy.get(shopping_list.ADD_ITEMS_ADD_TO_LIST).click();
        cy.get(shopping_list.ADDED_STRAWBERRIES_MULTIPLE).should('exist');  
        cy.get(shopping_list.ADDED_STRAWBERRIES_MULTIPLE).contains('strawberries');
        cy.get(shopping_list.ADDED_BLUEBERRIES_MULTIPLE).should('exist');
        cy.get(shopping_list.ADDED_BLUEBERRIES_MULTIPLE).contains('blueberries');
    })
    
    // add a recipe to the shopping list from the shopping list page (from the recipe page covered already)
    it('should be able to add recipe ingredients to the shopping list', () => {
        cy.get(shopping_list.ADD_ITEMS_BOTTOM_CORNER).click();
        cy.get(shopping_list.ADD_ITEMS_RECIPE_TAB).click();
        cy.get(shopping_list.RECIPE_INPUT);
        cy.get(shopping_list.RECIPE_INPUT).type('fruit smoothie');
        cy.get(shopping_list.FRUIT_SMOOTHIE_RESULT).contains('Fruit Smoothie');
        cy.get(shopping_list.RECIPE_FIRST_RESULT).click();
        cy.get(shopping_list.ADD_ITEMS_ADD_TO_LIST).click();
        // check
        cy.get(shopping_list.ADDED_DAIRY).should('exist');
        cy.get(shopping_list.ADDED_DAIRY).contains('Dairy');
        cy.get(shopping_list.ADDED_FROZEN).should('exist');
        cy.get(shopping_list.ADDED_FROZEN).contains('Frozen');
        cy.get(shopping_list.ADDED_GROCERY).should('exist');
        cy.get(shopping_list.ADDED_GROCERY).contains('Grocery Items');
        cy.get(shopping_list.SMOOTHIE_RECIPE_TAG).should('exist');
        cy.get(shopping_list.SMOOTHIE_RECIPE_TAG).contains('Frozen Fruit Smoothies');
    })  
    
    // remove an item from the shopping list
    it('should be able to remove an item from the shopping list', () => {
        cy.get(shopping_list.ADD_ITEMS_BOTTOM_CORNER).click();
        cy.get(shopping_list.ITEM_TITLE_INPUT).type('strawberries');
        cy.get(shopping_list.ADD_ITEMS_ADD_TO_LIST).click();
        cy.wait(1000);
        cy.get(shopping_list.ADDED_STRAWBERRIES).click();
        cy.get(shopping_list.REMOVE_SELECTED_ITEM).click();
        cy.get(shopping_list.REMOVE_ITEM_CONFIRM).click();
        // Removed 1 item
        cy.get(shopping_list.ADDED_STRAWBERRIES).should('not.exist');
        cy.get('ion-toast').should('exist').shadow().contains('Removed 1 item');
    })

    // did they handle shampoo = meat - spoiler alert: no
    // it('should not put shampoo as meat', () => {
    //     cy.wait(1000);
    //     cy.get(shopping_list.ADD_ITEMS_BOTTOM_CORNER).click();
    //     cy.wait(500);
    //     cy.get(shopping_list.ITEM_TITLE_INPUT).type('shampoo');
    //     cy.wait(500);
    //     cy.get(shopping_list.ADD_ITEMS_ADD_TO_LIST).click();
    //     cy.get(shopping_list.SHAMPOO_MEAT).should('not.contain', 'Meats');
    //     cy.wait(1000);
    // })

    // remove all items
    it('should be able to clear an entire list', () => {
        cy.get(shopping_list.ADD_ITEMS_CENTER).click();
        cy.get(shopping_list.ITEM_TITLE_INPUT).type('strawberries');
        cy.get(shopping_list.SECOND_ITEM_TITLE_INPUT).type('blueberries');
        cy.get(shopping_list.ADD_ITEMS_ADD_TO_LIST).click();
        cy.wait(1000);
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.REMOVE_ALL_ITEMS).click();
        cy.wait(1000);
        cy.get(shopping_list.DELETE_ALL_CONFIRM).click();
        cy.get(shopping_list.ADDED_STRAWBERRIES_MULTIPLE).should('not.exist');  
        cy.get(shopping_list.ADDED_BLUEBERRIES_MULTIPLE).should('not.exist');
        cy.wait(1000);
    })

    // group similar items (1 cup sugar, 1 tbsp sugar)
    it('should be able to group similar items', () => {
        cy.get(shopping_list.ADD_ITEMS_BOTTOM_CORNER).click();
        cy.get(shopping_list.ITEM_TITLE_INPUT).type('1 cup sugar');
        cy.get(shopping_list.SECOND_ITEM_TITLE_INPUT).type('1 tbsp sugar');
        cy.get(shopping_list.ADD_ITEMS_ADD_TO_LIST).click();
        cy.wait(1000);
        cy.get(shopping_list.COMBINED_SUGAR).contains('1 cup, 1 tablespoon sugar');
        cy.get(shopping_list.COMBINED_SUGAR_DROPDOWN).click();
        cy.wait(500);
        cy.get(shopping_list.CUP_SUGAR).contains('1 cup sugar');
        cy.get(shopping_list.TBSP_SUGAR).contains('1 tbsp sugar');
    })

    // group similar items - typo edition
    it('should not group similar items when one has a typo', () => {
        cy.get(shopping_list.ADD_ITEMS_BOTTOM_CORNER).click();
        cy.get(shopping_list.ITEM_TITLE_INPUT).type('1 cup sugr');
        cy.get(shopping_list.SECOND_ITEM_TITLE_INPUT).type('1 tbsp sugar');
        cy.get(shopping_list.ADD_ITEMS_ADD_TO_LIST).click();
        cy.get(shopping_list.TYPO_GROCERY).should('exist');
        cy.get(shopping_list.TYPO_GROCERY).contains('1 tbsp sugar');
        cy.get(shopping_list.TYPO_UNCATEGORIZED).should('exist');
        cy.get(shopping_list.TYPO_UNCATEGORIZED).contains('1 cup sugr');
    })

    // delete item immediately
    it('should be able to delete items immediately', () => {
        cy.get(shopping_list.ADD_ITEMS_BOTTOM_CORNER).click();
        cy.get(shopping_list.ITEM_TITLE_INPUT).type('strawberries');
        cy.get(shopping_list.ADD_ITEMS_ADD_TO_LIST).click();
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.DELETE_UPON_COMPLETION_TOGGLE).click();
        cy.get(shopping_list.ADDED_STRAWBERRIES).click();
        cy.get('ion-toast').should('exist').shadow().contains('Removed 1 item');
        cy.get(shopping_list.ADDED_STRAWBERRIES).should('not.exist');
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.DELETE_UPON_COMPLETION_TOGGLE).click();
        cy.wait(1000);
    })
})

describe('shopping list - nondestructive options', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(':nth-child(8) > .ng-untouched').type('echo30.dev@gmail.com');
        cy.get(':nth-child(11) > .ng-untouched').type('password');
        cy.get('.ion-padding > .md').click();
        // cy.get(sidebar.OPEN_SIDEBAR).click();
        // cy.get(sidebar.SHOPPING_LISTS).click();
        cy.wait(1000);
        cy.visit('/#/shopping-lists/');
        cy.get(shopping_list.FIRST_IN_LIST, {timeout: 10000}).click();
    })

    // printing a shopping list
    it('should be able to print a recipe', () => {
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.PRINT_RECIPE).should('not.be.disabled');
        cy.wait(1000);
    })

    // mark item as completed
    it('should be able to mark/unmark an item as completed', () => {
        cy.get(shopping_list.HALF_CUP_MILK).click();
        cy.get(shopping_list.COMPLETED_ITEMS_LIST).should('exist');
        cy.get(shopping_list.HALF_CUP_MILK).should('not.contain', '1/2 cup milk');
        cy.wait(1000);
        cy.get(shopping_list.RESTORE_COMPLETED).click();
        cy.get(shopping_list.COMPLETED_ITEMS_LIST).should('not.exist');
        cy.get(shopping_list.ADDED_DAIRY).should('contain', '1/2 cup milk');
    })

    // sort by title
    it('should be able to sort by title', () => {
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.SORT_BY).click();
        cy.get(shopping_list.SORT_BY_POPUP).should('exist');
        cy.get(shopping_list.SORT_BY_TITLE).click();
        cy.get(shopping_list.SORT_BY_OK).click();
    })

    // sort by newest
    it('should be able to sort by newest', () => {
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.SORT_BY).click();
        cy.get(shopping_list.SORT_BY_POPUP).should('exist');
        cy.get(shopping_list.CREATED_NEWEST).click();
        cy.get(shopping_list.SORT_BY_OK).click();
    })

    // sort by oldest
    it('should be able to sort by oldest', () => {
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.SORT_BY).click();
        cy.get(shopping_list.SORT_BY_POPUP).should('exist');
        cy.get(shopping_list.CREATED_OLDEST).click();
        cy.get(shopping_list.SORT_BY_OK).click();
    })

    // group items by category toggle
    it('should be able to toggle group items by category', () => {
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.GROUP_ITEMS_BY_CATEGORY_TOGGLE).click();
        cy.get(shopping_list.DAIRY_HEADER).should('not.exist');
        cy.get(shopping_list.GROCERY_HEADER).should('not.exist');
        cy.get(shopping_list.PRODUCE_HEADER).should('not.exist');
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.GROUP_ITEMS_BY_CATEGORY_TOGGLE).click();
        cy.get(shopping_list.DAIRY_HEADER).should('exist');
        cy.get(shopping_list.GROCERY_HEADER).should('exist');
        cy.get(shopping_list.PRODUCE_HEADER).should('exist');
    })

    // group similar items toggle
    it('should be able to toggle group similar items', () => {
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.GROUP_SIMILAR_ITEMS_TOGGLE).click();
        cy.get(shopping_list.GROUP_OPTION_CUP_SUGAR).contains('1 cup sugar');
        cy.get(shopping_list.GROUP_OPTION_TBSP_SUGAR).contains('1 tbsp sugar');
        cy.wait(1000);
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.GROUP_SIMILAR_ITEMS_TOGGLE).click();
        cy.get(shopping_list.SUGAR_GROUPED).contains('1 cup, 1 tablespoon sugar');
    })

    // show added on toggle
    it('should be able to show/hide when items were added', () => {
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.SHOW_ADDED_ON_TOGGLE).click();
        cy.get(shopping_list.ADDED_ON_LABEL).contains('Added ');
        cy.wait(1000);
        cy.get(shopping_list.OPTIONS_NO_MULTISELECT).click();
        cy.get(shopping_list.SHOW_ADDED_ON_TOGGLE).click();
        cy.get(shopping_list.ADDED_ON_LABEL).should('not.contain', 'Added ');
    })

})