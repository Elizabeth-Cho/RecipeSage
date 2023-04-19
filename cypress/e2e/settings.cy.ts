describe('download and install', () => {
  before(() => {
    cy.visit('https://recipesage.com/')
    cy.get('.title > .button-small').click();
    cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
    cy.get(':nth-child(11) > .ng-untouched').type('1234567')
    cy.get('.ion-padding > .md').click();
    cy.get('.buttons-first-slot > .md').click();
    cy.get(':nth-child(11) > .item-has-start-slot > .sc-ion-label-md-h').click();
  })

  it('import recipe data', () => {
    cy.get(':nth-child(2) > .sc-ion-label-md-h').should('have.text', ' Import Recipe Data ')
    cy.get(':nth-child(2) > .sc-ion-label-md-h').click({force: true});
    cy.url().should('eq', 'https://recipesage.com/#/settings/import')


    cy.get('.list-md > :nth-child(1) > .sc-ion-label-md-h').click({force: true});
    cy.url().should('eq', 'https://recipesage.com/#/settings/import/json-ld')
    cy.get('.ion-padding > .md').should('not.be.disabled')

    // go back to import
    cy.get('page-import-json-ld.ion-page > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click({force: true});
    cy.url().should('eq', 'https://recipesage.com/#/settings/import')

    // pepperplate
    cy.get('.can-go-back > .content-ltr > .list-md > :nth-child(2) > .sc-ion-label-md-h').click({force: true});
    cy.url().should('eq', 'https://recipesage.com/#/settings/import/pepperplate' )
    cy.get('.ion-padding > .md').should('not.be.disabled')

    cy.get('.slimPage > .list-md > :nth-child(5) > .md').click({force: true});
    cy.get('.slimPage > .list-md > :nth-child(6)').should('have.text', ' Please enter your pepperplate email/username. ')

    // go back to import
    cy.get('page-import-json-ld.ion-page > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click({force: true});
    // livingcookbook
    cy.get('.can-go-back > .content-ltr > .list-md > :nth-child(3) > .sc-ion-label-md-h').click({force: true});
    cy.url().should('eq', 'https://recipesage.com/#/settings/import/livingcookbook' )
    cy.get(':nth-child(2) > .ng-valid').click({multiple: true, force: true});
    cy.get(':nth-child(3) > .ng-valid').click({multiple: true, force: true});
    cy.get(':nth-child(4) > .ng-valid').click({multiple: true, force: true});
    cy.get('.ion-padding > .button').should('not.be.disabled')
  })

  it.only('export recipe data', () => {
    cy.get(':nth-child(3) > .sc-ion-label-md-h').should('have.text', ' Export Recipe Data ')
    cy.get(':nth-child(3) > .sc-ion-label-md-h').click({force: true});
    cy.url().should('eq', 'https://recipesage.com/#/settings/export')

    cy.get(':nth-child(1) > .sc-ion-label-md-h > :nth-child(1)')
  })

  // it('Application', () => {
  //   cy.get('.ion-padding > :nth-child(2) > :nth-child(1) > .sc-ion-label-md-h').click({force: true});
  //   cy.get('.instruction').should('have.text', ' To install RecipeSage on Android:1. Open the Chrome browser2. Open the browser menu via a button in your browser that looks like this: 3. Click "Add to Home Screen" This will install RecipeSage as a native application on your device. ')
  //   cy.get(':nth-child(3) > .sc-ion-label-md-h').click({force: true});
  //   cy.get(':nth-child(4) > .instruction').should('have.text', ' To install RecipeSage on Apple Mobile Devices (IOS):1. Open Safari2. Open the share menu via a button in the bottom bar that looks like this: 3. Click "Add to Home Screen" This will install RecipeSage as a native application on your device. ')
  //   cy.get(':nth-child(5) > .sc-ion-label-md-h').click({force: true});
  //   cy.get(':nth-child(6) > .instruction').should('have.text', ' To install RecipeSage on desktop or laptop devices:1. Open Google Chrome browser2. Open the browser menu via the button in the top right corner that looks like this: 3. Click "Install RecipeSage..." This will install RecipeSage as a native application on your device. ')
  // })

  // it('other softwares', () => {
  //   cy.get('[href="https://addons.mozilla.org/en-US/firefox/addon/recipesage/"]')
  //    .should('have.attr', 'href').and('include', 'https://addons.mozilla.org/en-US/firefox/addon/recipesage/')
  //   cy.get('[href="https://chrome.google.com/webstore/detail/oepplnnfceidfaaacjpdpobnjkcpgcpo"]')
  //   .should('have.attr', 'href').and('include', 'https://chrome.google.com/webstore/detail/oepplnnfceidfaaacjpdpobnjkcpgcpo')
  // })

})