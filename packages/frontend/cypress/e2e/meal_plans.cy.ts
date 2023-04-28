import * as sidebar from '../consts/sidebar_const';
import * as meal_plan from '../consts/meal_plans_const';

describe('meal plans', () => {
    before(() => {
        cy.visit('https://recipesage.com/')
        cy.get('.title > .button-small').click();
        cy.get(':nth-child(8) > .ng-untouched').type('echo30@jhu.edu')
        cy.get(':nth-child(11) > .ng-untouched').type('123456')
        cy.get('.ion-padding > .md').click();
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.MEAL_PLANS).click();
    })

    // should be able to create a meal plan from the meal plan page
    it('should be ', () => {

    })

    
    // should be able to add items directly to a meal plan - manual entry

    // should be able to add items directly to a meal plan - add a recipe
    
    // should be able to add recipes to a meal plan via the meal plan page

    // should be able to edit an item - date
    
    // should be able to edit an item - meal

    // should be able to edit an item - recipe/title

    // pin a single item open

    // pin multiple items on a day

    // moving a single item

    // move all items on a day

    // copy a single item

    // copy all items on a day

    // delete single item

    // delete all items on a day

    // add to other calendar programs???
})