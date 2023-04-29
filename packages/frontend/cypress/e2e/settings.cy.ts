import * as settings from '../consts/settings_const';

describe('settings', () => {
  beforeEach(() => {
    // login
    cy.visit('/')
    cy.get('.title > .button-small').click();
    cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
    cy.get(':nth-child(11) > .ng-untouched').type('1234567')
    cy.get('.ion-padding > .md').click();
    // redirect to settings
    cy.get('.buttons-first-slot > .md').click();
    cy.get(':nth-child(11) > .item-has-start-slot > .sc-ion-label-md-h').click();
  })

  it('import recipe data - json-ld', () => {
    cy.get(settings.IMPORT_RECIPE_DATA_TAB).contains('Import Recipe Data');
    cy.get(settings.IMPORT_RECIPE_DATA_TAB).click();
    cy.url().should('contain', '/settings/import');


    cy.get(settings.IMPORT_DATA_JSON_LD).click();
    cy.url().should('contain', '/settings/import/json-ld');
    cy.get(settings.CHOOSE_JSON_UPLOAD).should('not.be.disabled');
  })

  // import pepperplate
  it('import recipe data - pepperplate', () => {
    cy.get(settings.IMPORT_RECIPE_DATA_TAB).contains('Import Recipe Data');
    cy.get(settings.IMPORT_RECIPE_DATA_TAB).click();
    cy.url().should('contain', '/settings/import');

    
    // pepperplate
    cy.get(settings.IMPORT_PEPPERPLATE_TAB).click({force: true});
    cy.url().should('contain', '/settings/import/pepperplate');
    cy.get(settings.PEPPERPLATE_START_IMPORT).should('not.be.disabled');

    cy.get(settings.PEPPERPLATE_START_IMPORT).click();
    cy.get(settings.PEPPERPLATE_IMPORT_ERROR).contains('Please enter your pepperplate email/username.');
  })

  // import livingcookbook
  it('import recipe data - livingcookbook', () => {
    cy.get(settings.IMPORT_RECIPE_DATA_TAB).contains('Import Recipe Data');
    cy.get(settings.IMPORT_RECIPE_DATA_TAB).click();
    cy.url().should('contain', '/settings/import');
    
    // livingcookbook
    cy.get(settings.IMPORT_LIVINGCOOKBOOK_TAB ).click();
    cy.url().should('contain', '/settings/import/livingcookbook');
    cy.get(settings.LC_EXCLUDE_IMG).click({multiple: true, force: true});
    cy.get(settings.LC_STOCK_LCB).click({multiple: true, force: true});
    cy.get(settings.LC_TECHNIQUES).click({multiple: true, force: true});
    cy.get(settings.LC_SELECT).should('not.be.disabled');
  })

  it('export recipe data', () => {
    cy.get(settings.EXPORT_RECIPE_DATA_TAB).contains('Export Recipe Data');
    cy.get(settings.EXPORT_RECIPE_DATA_TAB).click();
    cy.url().should('contain', '/settings/export');

    // download in various form should not be disabled
    cy.get(settings.EXPORT_JSON_LD).should('not.be.disabled')
    cy.get(settings.EXPORT_XML).should('not.be.disabled')
    cy.get(settings.EXPORT_TXT).should('not.be.disabled')
  })

  it('Account Settings & Stats', () => {
    cy.get(settings.ACCOUNT_SETTINGS_TAB).contains('Account Settings & Stats');
    cy.get(settings.ACCOUNT_SETTINGS_TAB).click();
    cy.url().should('contain', '/settings/account');
    cy.get(settings.PAGE_TITLE).contains('Account & Credentials');

    cy.get(settings.NICKNAME_WRAPPER).contains('Name/Nickname');
    // enable edit name
    cy.get(settings.NICKNAME_WRAPPER).click();
    cy.get(':nth-child(5) > .ion-align-self-center').should('not.be.disabled')

    // should be able to see email and password
    cy.get('.content-ltr > :nth-child(6)').should('have.text', ' Email ')
    cy.get('.content-ltr > :nth-child(7)').should('have.text', ' Password ')
    cy.get('.content-ltr > :nth-child(7)').should('not.have.text', ' 1234567 ')
    cy.get('.content-ltr > :nth-child(9) > .sc-ion-label-md-h > p').should('have.text', ' To change a field above, tap the field, edit it, and press the save button that appears. ')
    
    // stats
    cy.get(':nth-child(12) > .sc-ion-label-md-h').contains('Stats')
    cy.get(':nth-child(13) > .sc-ion-label-md-h > h2').contains('Recipe Count');
    // cy.get(':nth-child(13) > .sc-ion-label-md-h > p').should('have.text', '0')
    cy.get(':nth-child(14) > .sc-ion-label-md-h > h2').contains('Recipe Image Count');
    // cy.get(':nth-child(14) > .sc-ion-label-md-h > p').should('have.text', '0')
    cy.get(':nth-child(15) > .sc-ion-label-md-h > h2').contains('Total Message Count');
    // cy.get(':nth-child(15) > .sc-ion-label-md-h > p').should('have.text', '0')
    cy.get(':nth-child(16) > .sc-ion-label-md-h > h2').contains('Account Created');
    cy.get(':nth-child(17) > .sc-ion-label-md-h > h2').contains('Last Login');
    
    // Bonus Feature Status 
    cy.get(':nth-child(20) > .sc-ion-label-md-h').contains('Bonus Feature Status');
    // cy.get(':nth-child(26) > .sc-ion-label-md-h').contains('Actions');
    cy.get('.content-ltr > :nth-child(27)').should('not.be.disabled')
    cy.get(settings.DANGER_ZONE).contains('Danger Zone!');
    cy.get('.ion-margin-start.ion-color').should('not.be.disabled');
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
    cy.get(settings.THEME_SELECTOR).click();
    cy.get(settings.SYSTEM_DEFAULT).contains('System Default');
    cy.get(settings.LIGHT).contains('Light');
    cy.get(settings.DARK).contains('Dark');
    cy.get(settings.BLACK_OLED).contains('Black (OLED)');

    // cy.get('#alert-input-1-2 > .alert-button-inner > .alert-radio-icon').click({force: true});
    // cy.get('.alert-button-group > :nth-child(2) > .alert-button-inner').click({force: true});
    // cy.get('.item-has-start-slot.ion-touched > .ng-valid').should('have.text', ' System Default  Light  Dark  Black (OLED) ')
    
  })

  it('italian language setting working', () => {
    cy.get(settings.LANG_SELECTOR).click();
    cy.get('#alert-input-1-2 > .alert-button-inner > .alert-radio-icon').click({force: true});
    cy.get('#alert-input-1-2 > .alert-button-inner > .alert-radio-icon').click({force: true});
    cy.get('.alert-button-group > :nth-child(2) > .alert-button-inner').click({force: true});
    cy.get(':nth-child(2) > .sc-ion-label-md-h').should('have.text', ' Importa Dati Ricette ')
  })
  

})