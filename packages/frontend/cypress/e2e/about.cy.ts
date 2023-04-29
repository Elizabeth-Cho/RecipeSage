describe('about', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('.title > .button-small').click();
      cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
      cy.get(':nth-child(11) > .ng-untouched').type('1234567')
      cy.get('.ion-padding > .md').click();
      // cy.get('.buttons-first-slot > .md').click();
      // cy.get(':nth-child(12) > .item-has-start-slot > .sc-ion-label-md-h').click();
      cy.wait(500);
      cy.visit('/#/about');
    })
  
    it('titles displayed correctly', () => {
      cy.get('.ion-page > .header-md > .toolbar-title-default > .title-default').should('have.text', 'About & Support')
      cy.get('.ion-padding > .list-md > :nth-child(1)').should('have.text', ' About Me & RecipeSage ')
      cy.get('.ion-padding > .list-md > :nth-child(2)').should('have.text', ' User Guide (Tutorials) ')
      cy.get('.ion-padding > .list-md > :nth-child(3)').should('have.text', ' Contact ')
      cy.get('.ion-padding > .list-md > :nth-child(4)').should('have.text', ' Contribute! ')
      cy.get('.ion-padding > .list-md > :nth-child(5)').should('have.text', ' Release Notes ')
      cy.get('.ion-padding > .list-md > :nth-child(6)').should('have.text', ' Legal, agreements and disclaimers ')
    })
  
    it('details displayed correctly', () => {
      cy.get('.ion-padding > .list-md > :nth-child(1)').click({force: true});
      cy.url().should('contain', '/about/details')
      cy.get(':nth-child(1) > b').should('have.text', 'A little about me')
  
      cy.get(':nth-child(4) > b').should('have.text', 'Why create RecipeSage?')
  
      cy.get(':nth-child(8) > b').should('have.text', 'Links')
  
      cy.get(':nth-child(12) > b').should('have.text', 'Social Media')
  
      cy.get(':nth-child(7) > a').click({force: true});
      cy.url().should('contain', '/contribute')
    })
  
  })
  
  describe('contact', () => {
    before(() => {
      
      cy.visit('/')
      cy.get('.title > .button-small').click();
      cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
      cy.get(':nth-child(11) > .ng-untouched').type('1234567')
      cy.get('.ion-padding > .md').click();
      // cy.get('.buttons-first-slot > .md').click();
      // cy.get(':nth-child(12) > .item-has-start-slot > .sc-ion-label-md-h').click();
      cy.wait(500);
      cy.visit('/#/about');
    })
    
    it('correct url and title', () => {
      cy.get('.ion-padding > .list-md > :nth-child(3)').click({force: true});
      cy.url().should('contain', '/about/contact')
      cy.get('.can-go-back > .header-md > .toolbar-title-default > .title-default').contains('Contact Me')
  
      cy.get(':nth-child(1) > b').should('have.text', 'Contact Info')
  
      cy.get('.can-go-back > .ion-padding > :nth-child(2)').should('have.text', ' For any questions, please refer to the user guide before emailing: https://docs.recipesage.com')
  
      cy.get('.can-go-back > .ion-padding > :nth-child(3)').contains('For any issues, bugs, or feature suggestions, you can email me at julian@recipesage.com')
      
    })
  
  })
  
  
  describe('Legal, agreements and disclaimers', () => {
    beforeEach(() => {
      
      cy.visit('/')
      cy.get('.title > .button-small').click();
      cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
      cy.get(':nth-child(11) > .ng-untouched').type('1234567')
      cy.get('.ion-padding > .md').click();
      // cy.get('.buttons-first-slot > .md').click();
      // cy.get(':nth-child(12) > .item-has-start-slot > .sc-ion-label-md-h').click();
      cy.wait(500);
      cy.visit('/#/about');
    })
    
    it('correct url and title', () => {
      cy.get('.ion-padding > .list-md > :nth-child(6)').click({force: true});
      cy.url().should('contain', '/legal')
      cy.get('.can-go-back > .header-md > .toolbar-title-default > .title-default').contains('Legal, agreements and disclaimers');
  
      cy.get('.can-go-back > .ion-padding > :nth-child(3)').contains('RecipeSage Terms of Service');
      
    })
  
    it('return back to about', () => {
      cy.get('.ion-padding > .list-md > :nth-child(6)').click({force: true});
      cy.get('.can-go-back > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click({force: true});
      cy.url().should('contain', 'about')
    })
  
  })
  
  
  describe('social media', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('.title > .button-small').click();
      cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
      cy.get(':nth-child(11) > .ng-untouched').type('1234567')
      cy.get('.ion-padding > .md').click();
      // cy.get('.buttons-first-slot > .md').click();
      // cy.get(':nth-child(12) > .item-has-start-slot > .sc-ion-label-md-h').click();
      cy.wait(500);
      cy.visit('/#/about');
    })
  
    it('Facebook', () => {
      cy.get('[lines="none"][href="https://facebook.com/recipesageofficial"] > .sc-ion-label-md-h > p > a').should('have.text', 'Facebook')
      cy.get('[lines="none"][href="https://facebook.com/recipesageofficial"] > .sc-ion-label-md-h > p > a').should('have.attr', 'href').and('include', 'https://facebook.com/recipesageofficial')
    })
  
    it('Insta', () => {
      cy.get('[lines="none"][href="https://instagram.com/recipesageofficial"] > .sc-ion-label-md-h > p > a').should('have.text', 'Instagram')
      cy.get('[lines="none"][href="https://instagram.com/recipesageofficial"] > .sc-ion-label-md-h > p > a').should('have.attr', 'href').and('include', 'https://instagram.com/recipesageofficial')
    })
  
    it('Discord', () => {
      cy.get('[lines="none"][href="https://discord.gg/yCfzBft"] > .sc-ion-label-md-h > p > a').should('have.text', 'Discord')
      cy.get('[lines="none"][href="https://discord.gg/yCfzBft"] > .sc-ion-label-md-h > p > a').should('have.attr', 'href').and('include', 'https://discord.gg/yCfzBft')
    })
  
  
  })
  