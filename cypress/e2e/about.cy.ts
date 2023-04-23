describe('about', () => {
  before(() => {
    cy.visit('https://recipesage.com/')
    cy.get('.title > .button-small').click();
    cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
    cy.get(':nth-child(11) > .ng-untouched').type('1234567')
    cy.get('.ion-padding > .md').click();
    cy.get('.buttons-first-slot > .md').click();
    cy.get(':nth-child(12) > .item-has-start-slot > .sc-ion-label-md-h').click();
  })

  it('title', () => {
    cy.get('.ion-page > .header-md > .toolbar-title-default > .title-default').should('have.text', ' About & Support ')

  })

})