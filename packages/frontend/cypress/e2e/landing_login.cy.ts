import * as landing_login from '../consts/landing_login_const';

describe('login', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    // top login button    
    it('should open the login page when clicking the login button at the top', () => {
        cy.get(landing_login.LOGIN_TOP).click();
        cy.url().should('include', '/#/auth/login');
        cy.get(landing_login.TITLE).contains("Log In", {matchCase: false});
    })

    // bottom login button
    it('should open the login page when clicking the login button at the bottom', () => {
        cy.get(landing_login.LOGIN_BOTTOM).click();
        cy.url().should('include', '/#/auth/login');
        cy.get(landing_login.TITLE).contains("Log In", {matchCase: false});
    })

    // create account redirect
    it('should redirect to create account when clicking \"create an account instead\"', () => {
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.CREATE_REDIRECT).click();
        cy.get(landing_login.TITLE).contains("Create an Account", {matchCase: false});
    })

    // top login successful
    it('should redirect to the main page after logging in successfully', () => {
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('echo30@jhu.edu');
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('123456');
        cy.get(landing_login.LOGIN_SUBMIT).click();
        cy.url().should('include', '/#/list/main');
    })

    // top login unsuccessful wrong email
    it('should not login when given the wrong email', () => {
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('not.a@real.email');
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('123456');
        cy.get(landing_login.LOGIN_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('email or password isn\'t correct');
        // cy.url().should('include', '/#/list/main');
    })

    // top login unsuccessful wrong password
    it('should not login when given the wrong password', () => {
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('echo30@jhu.edu');
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('password');
        cy.get(landing_login.LOGIN_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('email or password isn\'t correct');
    })

    // top login unsuccessful - empty
    it('should not login when no info is given', () => {
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('enter a password');
    })
})

describe('create account', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    // create account top
    it('should open the create account page when clicking the create account button at the top', () => {
        cy.get(landing_login.CREATE_ACCOUNT_TOP).click();
        cy.url().should('contain', '/#/auth/register');
        cy.get(landing_login.TITLE).contains("Create an Account", {matchCase: false});
    })

    // create account bottom
    it('should open the create account page when clicking the create account button at the bottom', () => {
        cy.get(landing_login.CREATE_ACCOUNT_BOTTOM).click();
        cy.url().should('contain', '/#/auth/register');
        cy.get(landing_login.TITLE).contains("Create an Account", {matchCase: false});
    })

    // log in instead
    it('should redirect to login when clicking \"log in instead\"', () => {
        cy.get(landing_login.CREATE_ACCOUNT_TOP).click();
        cy.get(landing_login.LOGIN_REDIRECT).click();
        cy.get(landing_login.TITLE).contains("Log In", {matchCase: false});
    })

    // empty form submit
    it('should not create an account when an empty form is submitted', () => {
        cy.get(landing_login.CREATE_ACCOUNT_TOP).click();
        cy.get(landing_login.CREATE_ACCOUNT_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('valid email address');
    })

    // no name
    it('should not create an account when no name is given', () => {
        cy.get(landing_login.CREATE_ACCOUNT_TOP).click();
        cy.get(landing_login.EMAIL_INPUT).type('echo30@jhu.edu');
        cy.get(landing_login.PWD_INPUT).type('123456');
        cy.get(landing_login.PWD_CONFIRM_INPUT).type('123456');
        cy.get(landing_login.CREATE_ACCOUNT_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('enter a name');
    })

    // no email
    it('should not create an account when no email is given', () => {
        cy.get(landing_login.CREATE_ACCOUNT_TOP).click();
        cy.get(landing_login.NAME_INPUT).type('test');
        cy.get(landing_login.PWD_INPUT).type('123456');
        cy.get(landing_login.PWD_CONFIRM_INPUT).type('123456');
        cy.get(landing_login.CREATE_ACCOUNT_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('valid email address');
    })

    // invalid email format
    it('should not create an account when an invalid email format is given', () => {
        cy.get(landing_login.CREATE_ACCOUNT_TOP).click();
        cy.get(landing_login.NAME_INPUT).type('test');
        cy.get(landing_login.EMAIL_INPUT).type('not an email');
        cy.get(landing_login.PWD_INPUT).type('123456');
        cy.get(landing_login.PWD_CONFIRM_INPUT).type('123456');
        cy.get(landing_login.CREATE_ACCOUNT_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('valid email address');
    })

    // no password
    it('should not create an account when no password is given', () => {
        cy.get(landing_login.CREATE_ACCOUNT_TOP).click();
        cy.get(landing_login.NAME_INPUT).type('test');
        cy.get(landing_login.EMAIL_INPUT).type('echo30@jhu.edu');
        cy.get(landing_login.CREATE_ACCOUNT_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('enter a password');
    })

    // password mismatch
    it('should not create an account when the passwords do not match', () => {
        cy.get(landing_login.CREATE_ACCOUNT_TOP).click();
        cy.get(landing_login.NAME_INPUT).type('test');
        cy.get(landing_login.EMAIL_INPUT).type('echo30@jhu.edu');
        cy.get(landing_login.PWD_INPUT).type('this one does not');
        cy.get(landing_login.PWD_CONFIRM_INPUT).type('match this one');
        cy.get(landing_login.CREATE_ACCOUNT_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('do not match');
    })

    // password less than 6 characters
    it('should not create an account when the password is less than 6 characters', () => {
        cy.get(landing_login.CREATE_ACCOUNT_TOP).click();
        cy.get(landing_login.NAME_INPUT).type('test');
        cy.get(landing_login.EMAIL_INPUT).type('echo30@jhu.edu');
        cy.get(landing_login.PWD_INPUT).type('12345');
        cy.get(landing_login.PWD_CONFIRM_INPUT).type('12345');
        cy.get(landing_login.CREATE_ACCOUNT_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('at least 6 characters long');
    })

    // should not create another account with the same email
    it('should not make another account with the same email', () => {
        cy.get(landing_login.CREATE_ACCOUNT_TOP).click();
        cy.get(landing_login.NAME_INPUT).type('test');
        cy.get(landing_login.EMAIL_INPUT).type('echo30@jhu.edu');
        cy.get(landing_login.PWD_INPUT).type('123456');
        cy.get(landing_login.PWD_CONFIRM_INPUT).type('123456');
        cy.get(landing_login.CREATE_ACCOUNT_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('email address already exists');
    })

})