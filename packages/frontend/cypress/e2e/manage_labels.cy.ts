import * as landing_login from '../consts/landing_login_const';
import * as labels from '../consts/manage_labels_const';
import * as create from '../consts/create_recipe_const';
import * as sidebar from '../consts/sidebar_const';

describe('manage labels', () => {
    before(() => {
        // create the labels used for testing
        cy.visit('/');
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(':nth-child(8) > .ng-untouched').type('echo30@jhu.edu');
        cy.get(':nth-child(11) > .ng-untouched').type('123456');
        cy.get('.ion-padding > .md').click();

        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.CREATE_RECIPE).click();
        cy.get(create.TITLE_INPUT).type('label test');
        cy.get(create.SUBMIT).click();
        cy.get(labels.NEW_LABEL_INPUT).type('rename me');
        cy.get(labels.NEW_LABEL_CLICK).click();
        cy.get(labels.NEW_LABEL_INPUT).type('merge me');
        cy.get(labels.NEW_LABEL_CLICK).click();
        cy.get(labels.NEW_LABEL_INPUT).type('delete just this');
        cy.get(labels.NEW_LABEL_CLICK).click();
        cy.get(labels.NEW_LABEL_INPUT).type('delete with recipes');
        cy.get(labels.NEW_LABEL_CLICK).click();
        cy.visit('/#/list/main');
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.LOGOUT).click();
    })
    beforeEach(() => {
        cy.visit('/');
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(':nth-child(8) > .ng-untouched').type('echo30@jhu.edu');
        cy.get(':nth-child(11) > .ng-untouched').type('123456');
        cy.get('.ion-padding > .md').click();
        // cy.get('.buttons-first-slot > .md').click();
        // cy.get(sidebar.MANAGE_LABELS).click();
        cy.wait(1000);
        cy.visit('/#/labels');
    })

    // click on a label --> view all recipes
    it('should be able to show all the recipes I have under a given label', () => {
        cy.get(labels.DESSERT_SELECT).click();
        cy.get(labels.VIEW_ALL_RECIPES).click();
        cy.url().should('include', '/#/list/main?labels=desserts');
        cy.get(labels.CREPES).should('exist');
        cy.get(labels.FRUIT_TART).should('exist');
        cy.get(labels.FRUIT_SYRUP).should('exist');
        cy.get(labels.COOKIES).should('exist');
    })

    // click on a label --> rename
    it('should be able to rename a label', () => {
        cy.get(labels.RENAME_LABEL).click();
        cy.get(labels.RENAME).click();
        cy.get(labels.RENAME_INPUT).click();
        cy.get(labels.RENAME_INPUT).clear();
        cy.get(labels.RENAME_INPUT).type('renamed');
        cy.get(labels.RENAME_CONFIRM).click();
        cy.get(labels.LABEL_TITLE).contains('renamed', {matchCase: false});
    })

    // click on a label --> merge w/ something that doesn't exist
    it('should not merge the label if the label does not exist', () => {
        cy.get(labels.MERGE_LABEL).click();
        cy.get(labels.MERGE).click();
        // cy.get(labels.MERGE_INPUT).type('does not exist');
        cy.wait(1000);
        cy.get(labels.MERGE_INPUT).type('asdf');
        cy.get(labels.MERGE_CONFIRM).click();
        cy.get(labels.LABEL_DOES_NOT_EXIST).contains('label not found', {matchCase: false});
        cy.get(labels.ERROR_OKAY).eq(0).click();
        cy.get(labels.MANAGE_LABEL_CLOSE).click();
        cy.get(labels.LABEL_COUNT).contains('8');
    })

    // click on a label --> merge with another label
    it('should be able to merge one label with another', () => {
        cy.get(labels.MERGE_LABEL).click();
        cy.get(labels.MERGE).click();
        cy.get(labels.MERGE_INPUT).type('renamed');
        cy.get(labels.MERGE_CONFIRM).click();
        cy.get(labels.COMPLETE_OKAY).eq(0).click();
        cy.get(labels.MANAGE_LABEL_CLOSE).click();
        cy.get(labels.LABEL_COUNT).contains('7');
    })

    // click on a label --> delete
    it('should be able to delete a label', () => {
        cy.get(labels.DELETE_ONLY_LABEL).click();
        cy.get(labels.DELETE_LABEL).click();
        // cy.get(labels.DELETE_LABEL).click();
        cy.get(labels.DELETE_ONLY_LABEL_CONFIRM).click();
        cy.get(labels.LABEL_COUNT).contains('6');
    })

    // click on a label --> delete including recipes
    it('should be able to delete a label, including recipes', () => {
        cy.get(labels.DELETE_WITH_RECIPE_LABEL).click();
        cy.get(labels.DELETE_WITH_RECIPE).click();
        // cy.get(labels.DELETE_WITH_RECIPE).click();
        cy.get(labels.DELETE_WITH_RECIPE_CONFIRM).click();
        cy.get(labels.LABEL_COUNT).contains('4');
    })

    // options - show created at
    it('should be able to hide the created at date', () => {
        cy.get(labels.DESSERTS_DATE).should('exist');
        cy.get(labels.OPTIONS_BUTTON).click();
        cy.get(labels.CREATED_AT_TOGGLE).click();
        cy.get(labels.DESSERTS_DATE).should('not.exist');
        cy.get(labels.OPTIONS_BUTTON).click();
        cy.get(labels.CREATED_AT_TOGGLE).click();
        cy.get(labels.DESSERTS_DATE).should('exist');
    })

    // options - select multiple
    it('should be able to select multiple labels', () => {
        cy.get(labels.OPTIONS_BUTTON).click();
        cy.get(labels.SELECT_MULTIPLE).click();
        cy.get(labels.SELECT_MULTIPLE_CONFIRM).click();
        cy.wait(1000);
        cy.get(labels.DESSERT_LABEL).click();
        cy.get(labels.DINNER_LABEL).click();
        cy.get(labels.DESSERT_SELECTED_BADGE).should('exist');
        cy.get(labels.DINNER_SELECTED_BADGE).should('exist');
    })

    // options - deselect all
    it('should be able to deselect all labels', () => {
        cy.get(labels.OPTIONS_BUTTON).click();
        cy.get(labels.SELECT_MULTIPLE).click();
        cy.get(labels.SELECT_MULTIPLE_CONFIRM).click();
        cy.wait(1000);
        cy.get(labels.DESSERT_LABEL).click();
        cy.get(labels.DINNER_LABEL).click();
        cy.get(labels.DESSERT_SELECTED_BADGE).should('exist');
        cy.get(labels.DINNER_SELECTED_BADGE).should('exist');
        cy.get(labels.OPTIONS_SELECT_MULTIPLE).eq(0).click();
        cy.get(labels.SELECT_MULTIPLE).click();
        cy.get(labels.DESSERT_SELECTED_BADGE).should('not.exist');
        cy.get(labels.DINNER_SELECTED_BADGE).should('not.exist');
    })
})