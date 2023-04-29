import * as sidebar from 'cypress/consts/sidebar_const';
import * as messages from '../consts/messages_const';
import * as people_profile from '../consts/people_and_profile_const';

describe('messages page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('.title > .button-small').click();
        cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
        cy.get(':nth-child(11) > .ng-untouched').type('1234567')
        cy.get('.ion-padding > .md').click();
        // cy.get('.buttons-first-slot > .md').click();
        // cy.get(':nth-child(4) > .item-has-start-slot > .sc-ion-label-md-h').click();
        cy.wait(1000);
        cy.visit('/#/messages/');
    })

    // // If the user does not enable notifications, then there should be a warning
    // it('user does not enable notifications', () => {
    //     cy.get(messages.ENABLE_NOTIFICATION_CANCEL).click();
    //     cy.get(messages.NOTIFICATION_WARNING).contains('Warning:');
    // })

    // if the user does not exist, there should be a popup stating that there were no results found
    it('user does not exist, no results found', () => {
        // cy.get('#ion-overlay-1 > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button:nth-child(2)').click();
        // enable notifications
        // cy.stub(win.Notification, 'requestPermission').resolves('granted').as('permission');
        // new message button
        // cy.get(messages.ENABLE_NOTIFICATION_CONTINUE).click();
        cy.get(messages.NEW_MESSAGE).click();
        // type invalid username
        cy.get(messages.USER_SEARCH).type(":flushedemoji:");
        // check error message
        cy.get(messages.NO_USER_MESSAGE).contains("No results for \":flushedemoji:\"");
    })

    // // if the user does not exist, the send button should not be clickable
    // it.only('user does not exist, send not clickable', () => {
    //     cy.get(messages.NEW_MESSAGE).click();
    //     cy.get(messages.USER_SEARCH).type(":flushedemoji:");
    //     cy.get(messages.SEND_MESSAGE).should('be.disabled');
    // })

    // if the user exists and a message is written, the send button should be clickable
    it('user exists, send clickable', () => {
        cy.get(messages.NEW_MESSAGE).click();
        cy.get(messages.USER_SEARCH).type('echo30@jhu.edu');
        cy.get(messages.USER_SEARCH_RESULT, {timeout: 10000}).contains('Elizabeth');
        cy.get(messages.USER_SEARCH_RESULT).click();
        cy.get(messages.SEND_MESSAGE).should('not.be.disabled');
    })
})

describe('messages - existing conversations', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('.title > .button-small').click();
        cy.get(':nth-child(8) > .ng-untouched').type('echo30@jhu.edu')
        cy.get(':nth-child(11) > .ng-untouched').type('123456')
        cy.get('.ion-padding > .md').click();
        // cy.get('.buttons-first-slot > .md').click();
        // cy.get(':nth-child(4) > .item-has-start-slot > .sc-ion-label-md-h').click();
        cy.wait(1000);
        cy.visit('/#/messages/');
    })
    // if the user exists and no message is written, the default message should be sent
    it('should send the default message if no message is written', () => {
        cy.get(messages.NEW_MESSAGE).click();
        cy.get(messages.USER_SEARCH).type('echo30.dev');
        cy.get(messages.USER_SEARCH_RESULT, {timeout: 10000}).contains('Click to select');
        cy.get(messages.USER_SEARCH_RESULT).click();
        cy.get(messages.SEND_MESSAGE).click();
        cy.get(messages.MESSAGES_TITLE).contains('echo');
        cy.get(messages.MESSAGES_BACK).click();
        cy.get(messages.MOST_RECENT_CONVO).contains('Hello! I\'d like to chat on RecipeSage');
    })

    // if the user exists and a message is sent, the conversation should be at the top
    it('should have the most recent conversation at the top', () => {
        cy.get(messages.NEW_MESSAGE).click();
        cy.get(messages.USER_SEARCH).type('ElizabethCho');
        cy.get(messages.USER_SEARCH_RESULT, {timeout: 10000}).contains('Click to select');
        cy.get(messages.USER_SEARCH_RESULT).click();
        cy.get(messages.SEND_MESSAGE).click();
        cy.get(messages.MESSAGES_TITLE).contains('Elizabeth');
        cy.get(messages.MESSAGES_BACK).click();
        // cy.get(messages.MOST_RECENT_CONVO).contains('Hello! I\'d like to chat on RecipeSage');
        cy.get(messages.MOST_RECENT_CONVO).contains('Elizabeth');
    })

    // if the user exists and a message is sent, the recipient should have the message in their inbox
    it('recipient should have the conversation in their inbox', () => {
        cy.get(messages.NEW_MESSAGE).click();
        cy.get(messages.USER_SEARCH).type('echo30.dev');
        cy.get(messages.USER_SEARCH_RESULT, {timeout: 10000}).contains('Click to select');
        cy.get(messages.USER_SEARCH_RESULT).click();
        cy.get(messages.INITIAL_MESSAGE_INPUT).type('hello there!');
        cy.get(messages.SEND_MESSAGE).click();
        cy.get(messages.CONVO_INPUT).type('do you want some garlic bread?');
        cy.get(messages.CONVO_SEND).click();
        cy.get(messages.CONVO_REFRESH).click();
        cy.get(messages.MESSAGES_TITLE).contains('echo');
        cy.get(messages.MESSAGES_BACK).click();
        cy.wait(500);
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.LOGOUT).click();
        cy.get(people_profile.RELOG_EMAIL).type('echo30.dev@gmail.com');
        cy.get(people_profile.RELOG_PWD).type('password');
        cy.get(people_profile.RELOG_SUBMIT).click();
        cy.visit('/#/messages');
        cy.get(messages.MOST_RECENT_CONVO).contains('garlic bread');
        cy.get(messages.MOST_RECENT_CONVO).click();
        cy.get(messages.CONVO_INPUT).type('sure!');
        cy.get(messages.CONVO_SEND).click();
    })
})
