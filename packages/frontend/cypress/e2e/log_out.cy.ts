import * as log_out from '../consts/log_out_const';
import * as sidebar from '../consts/sidebar_const';

describe('log out', () => {
  beforeEach(() => {
    // log in
    cy.visit('/')
    cy.get('.title > .button-small').click();
    cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
    cy.get(':nth-child(11) > .ng-untouched').type('1234567')
    cy.get('.ion-padding > .md').click();
    // log out
    cy.get('.buttons-first-slot > .md').click();
    cy.get(':nth-child(13) > .item-has-start-slot > .sc-ion-label-md-h').click();
  })

  it('log out url, pop up log in page', () => {
    cy.url().should('contain', '/#/welcome');
    cy.get(log_out.LOGOUT_OVERLAY_HEADER).contains('Log In');
    cy.get(log_out.LOGIN_INSTRUCTIONS).contains('Please login with your account details below.');
    cy.get(log_out.LOGIN_WELCOME).contains('Welcome back!');
  })

  it('log in again', () => {
    cy.get(log_out.LOGIN_AGAIN_EMAIL).type('jluo30@jhu.edu')
    cy.get(log_out.LOGIN_AGAIN_PWD).type('1234567')
    cy.get(log_out.LOGIN_SUBMIT).click();
    cy.url().should('contain', '/#/welcome')
  })

  // fault - discrepancy between running the case on cypress and 
  it('when click, the pop-up window should disappear', () => {
    cy.get(log_out.OVERLAY_CLOSE).click();
    cy.get(log_out.LOGIN_INSTRUCTIONS).should('not.exist');
  })

})