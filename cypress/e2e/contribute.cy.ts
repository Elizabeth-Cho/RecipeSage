describe('contribute', () => {
  beforeEach(() => {
    cy.visit('https://recipesage.com/')
    cy.get('.title > .button-small').click();
    cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
    cy.get(':nth-child(11) > .ng-untouched').type('1234567')
    cy.get('.ion-padding > .md').click();
    cy.get('.buttons-first-slot > .md').click();
    cy.get(':nth-child(10) > .item-has-start-slot > .sc-ion-label-md-h').click();
  })

  it('title', () => {
    cy.get('.ion-page > .header-md > .toolbar-title-default > .title-default').should('have.text', 'Contribute')
    cy.get('.headline').should('have.text', 'Contribute to RecipeSage')
  })

  it('monthly button', () => {
    cy.get(':nth-child(1) > span').should('have.text', ' Monthly ')
    cy.get(':nth-child(1) > span').click({force: true});
    
    cy.get('.amount-row > :nth-child(1)').click({force: true});
    cy.get('.amount-row > :nth-child(1)').should('have.text', ' $1.00 ')
    cy.get('.submit-row > .button').should('not.be.disabled')


    cy.get('.amount-row > :nth-child(2)').click({force: true});
    cy.get('.amount-row > :nth-child(2)').should('have.text', ' $5.00 ')
    cy.get('.submit-row > .button').should('not.be.disabled')

    cy.get('.amount-row > :nth-child(3)').click({force: true});
    cy.get('.amount-row > :nth-child(3)').should('have.text', ' $10.00 ')
    cy.get('.submit-row > .button').should('not.be.disabled')
  })

  it('One-Time button', () => {
    cy.get(':nth-child(2) > span').should('have.text', ' One-Time ')
    cy.get(':nth-child(2) > span').click({force: true});
    
    cy.get('.amount-row > :nth-child(1)').click({force: true});
    cy.get('.amount-row > :nth-child(1)').should('have.text', ' $10.00 ')
    cy.get('.submit-row > .button').should('not.be.disabled')


    cy.get('.amount-row > :nth-child(2)').click({force: true});
    cy.get('.amount-row > :nth-child(2)').should('have.text', ' $25.00 ')
    cy.get('.submit-row > .button').should('not.be.disabled')

    cy.get('.amount-row > :nth-child(3)').click({force: true});
    cy.get('.amount-row > :nth-child(3)').should('have.text', ' $50.00 ')
    cy.get('.submit-row > .button').should('not.be.disabled')
  })

  it('terms of service link', () => {
    cy.get(':nth-child(1) > span').should('have.text', ' Monthly ')
    cy.get(':nth-child(1) > span').click({force: true});
    cy.get('i > a').should('have.attr', 'href').and('include', '#/legal')
  })

  it('opening lines displayed correctly', () => {
    cy.get('.card > :nth-child(2)').should('have.text', ' My goal is to keep RecipeSage open to anyone, without burdening the experience with ads. ')
    cy.get('.card > :nth-child(3)').should('have.text', ' However, as RecipeSage grows, hosting costs for servers and images begin to add up. ')
  })

})