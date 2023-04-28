describe('settings', () => {
  beforeEach(() => {
    cy.visit('/')
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
    cy.url().should('contain', '/settings/import')


    cy.get('.list-md > :nth-child(1) > .sc-ion-label-md-h').click({force: true});
    cy.url().should('contain', '/settings/import/json-ld')
    cy.get('.ion-padding > .md').should('not.be.disabled')

    // go back to import
    cy.get('page-import-json-ld.ion-page > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click({force: true});
    cy.url().should('contain', '/settings/import')

    // pepperplate
    cy.get('.can-go-back > .content-ltr > .list-md > :nth-child(2) > .sc-ion-label-md-h').click({force: true});
    cy.url().should('contain', '/settings/import/pepperplate' )
    cy.get('.ion-padding > .md').should('not.be.disabled')

    cy.get('.slimPage > .list-md > :nth-child(5) > .md').click({force: true});
    cy.get('.slimPage > .list-md > :nth-child(6)').should('have.text', ' Please enter your pepperplate email/username. ')

    // go back to import
    cy.get('page-import-json-ld.ion-page > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click({force: true});
    // livingcookbook
    cy.get('.can-go-back > .content-ltr > .list-md > :nth-child(3) > .sc-ion-label-md-h').click({force: true});
    cy.url().should('contain', '/settings/import/livingcookbook' )
    cy.get(':nth-child(2) > .ng-valid').click({multiple: true, force: true});
    cy.get(':nth-child(3) > .ng-valid').click({multiple: true, force: true});
    cy.get(':nth-child(4) > .ng-valid').click({multiple: true, force: true});
    cy.get('.ion-padding > .button').should('not.be.disabled')
  })

  it('export recipe data', () => {
    cy.get(':nth-child(3) > .sc-ion-label-md-h').should('have.text', ' Export Recipe Data ')
    cy.get(':nth-child(3) > .sc-ion-label-md-h').click({force: true});
    cy.url().should('contain', '/settings/export')

    // download in various form should not be disabled
    cy.get('.content-ltr > .ion-padding > :nth-child(1)').should('not.be.disabled')
    cy.get('.content-ltr > .ion-padding > :nth-child(3)').should('not.be.disabled')
    cy.get('.content-ltr > .ion-padding > :nth-child(5)').should('not.be.disabled')
  })

  it('Account Settings & Stats', () => {
    cy.get(':nth-child(4) > .sc-ion-label-md-h').should('have.text', ' Account Settings & Stats ')
    cy.get(':nth-child(4) > .sc-ion-label-md-h').click({force: true});
    cy.url().should('contain', '/settings/account')
    cy.get('.can-go-back > .header-md > .toolbar-title-default > .title-default').should('have.text', ' Account & Credentials ')

    cy.get('.content-ltr > :nth-child(5)').should('have.text', ' Name/Nickname ')
    // enable edit name
    cy.get(':nth-child(5) > .ng-untouched > .native-input').click({force: true});
    cy.get(':nth-child(5) > .ion-align-self-center').should('not.be.disabled')

    // should be able to see email and password
    cy.get('.content-ltr > :nth-child(6)').should('have.text', ' Email ')
    cy.get('.content-ltr > :nth-child(7)').should('have.text', ' Password ')
    cy.get('.content-ltr > :nth-child(7)').should('not.have.text', ' 1234567 ')
    cy.get('.content-ltr > :nth-child(9) > .sc-ion-label-md-h > p').should('have.text', ' To change a field above, tap the field, edit it, and press the save button that appears. ')
    
    // stats
    cy.get(':nth-child(12) > .sc-ion-label-md-h').should('have.text', ' Stats ')
    cy.get(':nth-child(13) > .sc-ion-label-md-h > h2').should('have.text', ' Recipe Count ')
    cy.get(':nth-child(13) > .sc-ion-label-md-h > p').should('have.text', '0')
    cy.get(':nth-child(14) > .sc-ion-label-md-h > h2').should('have.text', ' Recipe Image Count ')
    cy.get(':nth-child(14) > .sc-ion-label-md-h > p').should('have.text', '0')
    cy.get(':nth-child(15) > .sc-ion-label-md-h > h2').should('have.text', ' Total Message Count ')
    cy.get(':nth-child(15) > .sc-ion-label-md-h > p').should('have.text', '0')
    cy.get(':nth-child(16) > .sc-ion-label-md-h > h2').should('have.text', ' Account Created ')
    cy.get(':nth-child(17) > .sc-ion-label-md-h > h2').should('have.text', ' Last Login ')
    
    // Bonus Feature Status 
    cy.get(':nth-child(20) > .sc-ion-label-md-h').should('have.text', ' Bonus Feature Status ')
    cy.get(':nth-child(26) > .sc-ion-label-md-h').should('have.text', ' Actions ')
    cy.get('.content-ltr > :nth-child(27)').should('not.be.disabled')
    cy.get(':nth-child(31) > .sc-ion-label-md-h').should('have.text', ' Danger Zone! ')
    cy.get('.ion-margin-start.ion-color').should('not.be.disabled')
  })

  it('check for update', () => {
    cy.get(':nth-child(5) > .sc-ion-label-md-h').should('have.text', ' Check for Update ')
    cy.get(':nth-child(5) > .sc-ion-label-md-h').click({force: true});

    // pop up alert
    cy.get('.alert-head').should('exist')
    cy.get('#alert-1-hdr').should('have.text', 'App will reload')
    cy.get('#alert-1-sub-hdr').should('have.text', 'The app will reload to check for an update.')
    cy.get(':nth-child(1) > .alert-button-inner').should('not.be.disabled')
    cy.get(':nth-child(2) > .alert-button-inner').should('not.be.disabled')
  })
  
  it('split view', () => {
    cy.get(':nth-child(7) > .ng-untouched').click({force: true});
    cy.get('#ion-tg-0-lbl').should('have.text', ' Enable Split Pane View on Large Screens ')
    cy.get(':nth-child(7) > .ng-untouched').click({force: true});
    cy.get('.split-pane-side > .header-md > .toolbar-title-default > .md').should('exist')
  })

  it('background theme color', () => {
    cy.get('.ion-page > .content-ltr').should("have.css", "background-color")
    .and("eq", "rgba(0, 0, 0, 0)")
    cy.get(':nth-child(8) > .ng-untouched').click({force: true});

    cy.get('#alert-input-1-2 > .alert-button-inner > .alert-radio-icon').click({force: true});
    cy.get('.alert-button-group > :nth-child(2) > .alert-button-inner').click({force: true});
    cy.get('.item-has-start-slot.ion-touched > .ng-valid').should('have.text', ' System Default  Light  Dark  Black (OLED) ')
    
  })

  it('italian language setting working', () => {
    cy.get(':nth-child(9) > .ng-untouched').click({force: true});
    cy.get('#alert-input-1-2 > .alert-button-inner > .alert-radio-icon').click({force: true});
    cy.get('#alert-input-1-2 > .alert-button-inner > .alert-radio-icon').click({force: true});
    cy.get('.alert-button-group > :nth-child(2) > .alert-button-inner').click({force: true});
    cy.get(':nth-child(2) > .sc-ion-label-md-h').should('have.text', ' Importa Dati Ricette ')
  })
  

})