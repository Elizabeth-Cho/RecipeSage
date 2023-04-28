describe('messages page', { testIsolation: false }, () => {
    before(() => {
        cy.visit('https://recipesage.com/')
        cy.get('.title > .button-small').click();
        cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
        cy.get(':nth-child(11) > .ng-untouched').type('1234567')
        cy.get('.ion-padding > .md').click();
        cy.get('.buttons-first-slot > .md').click();
        cy.get(':nth-child(4) > .item-has-start-slot > .sc-ion-label-md-h').click();
    })

    // If the user does not enable notifications, then there should be a warning
    // it('user does not enable notifications', () => {
    //     cy.get('#ion-overlay-1 > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button:nth-child(1)').click();
    //     cy.get('#main-content > page-messages > ion-content > ion-footer > b').should('have.text', "Warning:");
    // })

    // if the user does not exist, there should be a popup stating that there were no results found
    it('user does not exist, no results found', () => {
        // cy.get('#ion-overlay-1 > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md > div.alert-button-group.sc-ion-alert-md > button:nth-child(2)').click();
        // enable notifications
        // cy.stub(win.Notification, 'requestPermission').resolves('granted').as('permission');
        // new message button
        cy.get('#main-content > page-messages > ion-content > ion-fab > ion-fab-button > ion-icon').click();
        // click the user search bar
        cy.get('#userInputField > div > input').click();
        // type invalid username
        cy.get('#userInputField > div > input').type(":flushedemoji:");
        // check error message
        cy.get('#ion-overlay-1 > page-new-message-modal > ion-content > select-user > div > div > div > button > ion-item > ion-label').contains("No results for \":flushedemoji:\"");
    })

    // if the user does not exist, the send button should not be clickable
    it('user does not exist, send not clickable', () => {
        // send not clickable
        cy.get('#ion-overlay-1 > page-new-message-modal > ion-footer > ion-button').should('not.be.enabled');
    })

    // if the user exists and a message is written, the send button should be clickable
    it('user exists, send clickable', () => {
        // clear input
        cy.get('#userInputField > div > input').click();
        cy.get('#userInputField > div > input').clear();
        cy.get('#userInputField > div > input').type('18ElizabethCho@gmail.com');
        // cy.get('#ion-overlay-1 > page-new-message-modal > ion-content > select-user > div > div > div > button > ion-item > ion-label').click({force: true});
        cy.get('#ion-overlay-1 > page-new-message-modal > ion-content > select-user > div > div > div > button > ion-item > ion-label > p', {timeout: 10000}).contains('Click to select');
        cy.get('#ion-overlay-1 > page-new-message-modal > ion-content > select-user > div > div > div > button > ion-item > ion-label', {timeout: 10000}).click({force: true});
        // cy.get('#ion-overlay-1 > page-new-message-modal > ion-content > select-user > div > div > div > button > ion-item > ion-label').click({force: true});
        // cy.get('button > ion-ripple-effect').should('be.enabled');
        cy.get('#ion-overlay-1 > page-new-message-modal > ion-footer > ion-button').should('not.be.disabled');

        
    })

    // if the user exists and a message is sent, there should be a confirmation that the message was sent
    it('user exists, message history should be at the top', () => {

    })

    // if the user exists and a message is sent, the recipient should have the message in their inbox

    // if the user exists and no message is written, the default message should be sent

    // after running the tests, log out to reset
    after(() => {
        cy.get('.buttons-first-slot > .md').click();
        cy.get('body > app-root > ion-app > ion-split-pane > ion-menu > ion-content > ion-list > ion-menu-toggle:nth-child(13) > ion-item').click();
    })
})
