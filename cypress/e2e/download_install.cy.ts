describe('download and install', () => {
  before(() => {
    cy.visit('https://recipesage.com/')
    cy.get('.title > .button-small').click();
    cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
    cy.get(':nth-child(11) > .ng-untouched').type('1234567')
    cy.get('.ion-padding > .md').click();
    cy.get('.buttons-first-slot > .md').click();
    cy.get(':nth-child(9) > .item-has-start-slot > .sc-ion-label-md-h').click();
  })

  it.only('title', () => {
    cy.get('.ion-page > .header-md > .toolbar-title-default > .title-default').should('have.text', 'Download & Install')
    cy.get('.ion-padding > :nth-child(1)').should('have.text', 'RecipeSage Application')
    cy.get('.ion-padding > :nth-child(5)').should('have.text', 'Other RecipeSage Software')
  })

  it('Application', () => {
    cy.get('.ion-padding > :nth-child(2) > :nth-child(1) > .sc-ion-label-md-h').click({force: true});
    cy.get('.instruction').should('have.text', ' To install RecipeSage on Android:1. Open the Chrome browser2. Open the browser menu via a button in your browser that looks like this: 3. Click "Add to Home Screen" This will install RecipeSage as a native application on your device. ')
    cy.get(':nth-child(3) > .sc-ion-label-md-h').click({force: true});
    cy.get(':nth-child(4) > .instruction').should('have.text', ' To install RecipeSage on Apple Mobile Devices (IOS):1. Open Safari2. Open the share menu via a button in the bottom bar that looks like this: 3. Click "Add to Home Screen" This will install RecipeSage as a native application on your device. ')
    cy.get(':nth-child(5) > .sc-ion-label-md-h').click({force: true});
    cy.get(':nth-child(6) > .instruction').should('have.text', ' To install RecipeSage on desktop or laptop devices:1. Open Google Chrome browser2. Open the browser menu via the button in the top right corner that looks like this: 3. Click "Install RecipeSage..." This will install RecipeSage as a native application on your device. ')
  })

  it('other softwares', () => {
    cy.get('[href="https://addons.mozilla.org/en-US/firefox/addon/recipesage/"]')
     .should('have.attr', 'href').and('include', 'https://addons.mozilla.org/en-US/firefox/addon/recipesage/')
    cy.get('[href="https://chrome.google.com/webstore/detail/oepplnnfceidfaaacjpdpobnjkcpgcpo"]')
    .should('have.attr', 'href').and('include', 'https://chrome.google.com/webstore/detail/oepplnnfceidfaaacjpdpobnjkcpgcpo')
  })

})