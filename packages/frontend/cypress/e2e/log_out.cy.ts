describe('log out', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.title > .button-small').click();
    cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
    cy.get(':nth-child(11) > .ng-untouched').type('1234567')
    cy.get('.ion-padding > .md').click();
    cy.get('.buttons-first-slot > .md').click();
    cy.get(':nth-child(13) > .item-has-start-slot > .sc-ion-label-md-h').click();
  })

  it('log out url, pop up log in page', () => {
    cy.url().should('contain', '/#/welcome')
    cy.get('#ion-overlay-1 > .ion-page > .header-md > .toolbar-title-default > .title-default').should('have.text', 'Log In')
    cy.get('.welcome > span').should('have.text', 'Please login with your account details below.')
    cy.get('h2').should('have.text', 'Welcome back!')
  })

  it('log in again', () => {

    cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
    cy.get(':nth-child(11) > .ng-untouched').type('1234567')
    cy.get('.ion-padding > .md').click();
    cy.url().should('contain', '/#/welcome')
  })

  // fault
  it.only('when click, the pop-up window should disappear', () => {
    cy.get('#ion-overlay-1').click();
    cy.get('.welcome > span').should('not.exist')
  })



})