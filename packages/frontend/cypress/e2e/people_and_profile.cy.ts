import * as landing_login from '../consts/landing_login_const';
import * as sidebar from '../consts/sidebar_const';
import * as people_profile from '../consts/people_and_profile_const';
import * as create from '../consts/create_recipe_const';

// accounts needed - toggle enable/disable profile, edit details + friends, existing username

describe('profile creation validation', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('jluo30@jhu.edu');
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('1234567');
        cy.get(landing_login.LOGIN_SUBMIT).click();
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.PEOPLE_PROFILE).click();
    })

    // should not create a profile with invalid characters in the tag
    it('should not be able to create a profile with invalid characters in the tag', () => {
        cy.get(people_profile.CREATE_VIEW_PROFILE).click();
        cy.get(people_profile.HANDLE_INPUT).type('/');
        cy.get(people_profile.PROFILE_CREATE_SAVE).should('not.be.enabled');
    })

    // should not create a profile with an existing user tag
    it('should not be able to create a profile with a user tag that already exists', () => {
        cy.get(people_profile.CREATE_VIEW_PROFILE).click();
        cy.get(people_profile.HANDLE_INPUT).type('ElizabethCho');
        cy.get(people_profile.PROFILE_CREATE_SAVE).should('not.be.enabled');
    })
    
    // should not create a profile without a name
    it('should not be able to create a profile without a name', () => {
        cy.get(people_profile.CREATE_VIEW_PROFILE).click();
        cy.get(people_profile.NAME_INPUT).clear();
        // cy.get(people_profile.NAME_INPUT).invoke('val').should('be.empty');
        cy.get(people_profile.HANDLE_INPUT).type('jluo30');
        cy.get(people_profile.PROFILE_CREATE_SAVE).click();
        cy.get('ion-toast').should('exist');
    })

    it('should not be able to create a profile without a tag', () => {
        cy.get(people_profile.CREATE_VIEW_PROFILE).click();
        cy.get(people_profile.HANDLE_INPUT).clear();
        cy.get(people_profile.PROFILE_CREATE_SAVE).click();
        cy.get('ion-toast').should('exist');
    })

    // // clicking create profile should create a profile
    // it('should be able to create a profile with valid inputs', () => {

    // })
})

describe('people and profile', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('echo30@jhu.edu');
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('123456');
        cy.get(landing_login.LOGIN_SUBMIT).click();
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.PEOPLE_PROFILE).click();
        cy.get(people_profile.CREATE_VIEW_PROFILE).click();
    })

    // view/edit profile --> change nickname
    it('should reflect any changes I make to my nickname', () => {
        cy.get(people_profile.EDIT_NICKNAME_CLICK).click();
        cy.get(people_profile.EDIT_NICKNAME_INPUT).clear().type('Elizabeth Cho');
        cy.get(people_profile.EDIT_SAVE).click();
        cy.wait(1000);
        cy.get(people_profile.VIEW_PROFILE).click();
        cy.get(people_profile.VIEW_PROFILE_NAME).contains('Elizabeth Cho', {matchCase: false});
        // reset
        cy.get(people_profile.VIEW_PROFILE_BACK).click();
        cy.get(people_profile.EDIT_NICKNAME_AFTER_VIEWING_PROFILE).clear().type('Elizabeth');
        cy.get(people_profile.EDIT_SAVE).click();
    })

    // view/edit profile --> no nickname
    it('should be able to save a profile with no nickname', () => {
        cy.get(people_profile.EDIT_NICKNAME_CLICK).click();
        cy.get(people_profile.EDIT_NICKNAME_INPUT).clear();
        cy.get(people_profile.EDIT_SAVE).click();
        cy.get(people_profile.WELCOME_TO_PROFILE).contains('Welcome to your profile!', {matchCase: false});
        // reset
        cy.get(people_profile.RESET_NAME).type('Elizabeth');
        cy.get(people_profile.EDIT_SAVE).click();
    })
        
    // view/edit profile --> change tag
    it('should reflect any changes I make to my user tag', () => {
        cy.get(people_profile.EDIT_TAG_CLICK).click();
        cy.get(people_profile.EDIT_TAG_INPUT).clear().type('18ElizabethCho');
        cy.get(people_profile.EDIT_SAVE).click();
        cy.wait(1000);
        cy.get(people_profile.VIEW_PROFILE).click();
        cy.get(people_profile.VIEW_PROFILE_HANDLE).contains('18ElizabethCho', {matchCase: false});
        // reset
        cy.get(people_profile.VIEW_PROFILE_BACK).click();
        cy.get(people_profile.EDIT_TAG_AFTER_VIEWING_PROFILE).clear().type('ElizabethCho');
        cy.get(people_profile.EDIT_SAVE).click();
    })
    
    // view/edit profile --> no tag
    it('should not be able to save a profile with no tag', () => {
        cy.get(people_profile.EDIT_TAG_CLICK).click();
        cy.get(people_profile.EDIT_TAG_INPUT).clear();
        cy.get(people_profile.EDIT_SAVE).click();
        cy.get('ion-toast').should('exist');
    })

    // view/edit profile --> duplicate tag
    it('should not be able to save a profile that has been changed to have a tag that already exists', () => {
        cy.get(people_profile.EDIT_TAG_CLICK).click();
        cy.get(people_profile.EDIT_TAG_INPUT).clear().type('julianpoy');
        cy.get(people_profile.EDIT_SAVE).should('not.be.enabled');
    })

    // share should show a pop up
    it('should show a pop up when sharing a profile', () => {
        cy.get(people_profile.SHARE).click();
        cy.get(people_profile.SHARE_MODAL).should('be.visible');
        cy.get(people_profile.SHARE_LINK).contains('@elizabethcho', {matchCase: false});
        cy.get(people_profile.SHARE_FACEBOOK).should('not.be.disabled');
        cy.get(people_profile.SHARE_TWITTER).should('not.be.disabled');
        cy.get(people_profile.SHARE_PINTEREST).should('not.be.disabled');
        cy.get(people_profile.SHARE_EMAIL).should('not.be.disabled');
        cy.get(people_profile.SHARE_BOTTOM_CLOSE).click();
    })

    // view profile --> ?
    it('should do something when clicking view profile', () => {
        cy.get(people_profile.VIEW_PROFILE).click();
        cy.url().should('contain', 'elizabethcho');
    })

    // should be able to pin and remove recipes, tags, and collections
    it('should be able to pin and remove recipes', () => {
        cy.get(people_profile.ADD_TO_PROFILE).click();
        cy.get(people_profile.PROFILE_ITEM_RECIPE).click();
        cy.get(people_profile.PROFILE_ITEM_SEARCH).type('fruit smoothie');
        cy.wait(1000);
        cy.get(people_profile.RECIPE_SMOOTHIE).click();
        cy.get(people_profile.PROFILE_ITEM_PUBLIC).click();
        cy.get(people_profile.PROFILE_ITEM_FEATURED_TITLE).type('Fruit smoothie');
        cy.get(people_profile.PROFILE_ITEM_CONFIRM).click();
        cy.get(people_profile.EDIT_SAVE).click();
        cy.wait(1000);
        cy.get(people_profile.VIEW_PROFILE).click();
        cy.get(people_profile.VIEW_PROFILE_PINNED_FIRST).contains('Fruit smoothie');
        cy.get(people_profile.VIEW_PROFILE_PINNED_FIRST).click();
        cy.url().should('contain', '/#/recipe/');
        cy.get(create.TITLE).contains("Fruit Smoothies");
        cy.visit('/#/people/my-profile');
        cy.get(people_profile.PROFILE_ITEM_REMOVE_FIRST).click();
        cy.get(people_profile.EDIT_SAVE).click();
    })
    
    // should be able to pin and remove recipes, tags, and collections
    it('should be able to pin and remove tags', () => {
        cy.get(people_profile.ADD_TO_PROFILE).click();
        cy.get(people_profile.PROFILE_ITEM_LABEL).click();
        cy.get(people_profile.LABEL_DESSERT).click();
        cy.get(people_profile.PROFILE_ITEM_FRIENDS).click();
        cy.get(people_profile.PROFILE_ITEM_FEATURED_TITLE).type('Desserts');
        cy.get(people_profile.PROFILE_ITEM_CONFIRM).click();
        cy.get(people_profile.EDIT_SAVE).click();
        cy.wait(1000);
        cy.get(people_profile.VIEW_PROFILE).click();
        cy.get(people_profile.VIEW_PROFILE_PINNED_FIRST).contains('Desserts');
        cy.get(people_profile.VIEW_PROFILE_PINNED_FIRST).click();
        cy.url().should('contain', 'labels=desserts');
        cy.get(people_profile.SHARED_LABEL_TITLE).contains("desserts");
        cy.visit('/#/people/my-profile');
        cy.get(people_profile.PROFILE_ITEM_REMOVE_FIRST).click();
        cy.get(people_profile.EDIT_SAVE).click();
    })

    // should be able to pin and remove recipes, tags, and collections
    it('should be able to pin and remove collections', () => {
        cy.get(people_profile.ADD_TO_PROFILE).click();
        cy.get(people_profile.PROFILE_ITEM_EVERYTHING).click();
        cy.get(people_profile.PROFILE_ITEM_FRIENDS).click();
        cy.get(people_profile.PROFILE_ITEM_FEATURED_TITLE).type('Recipes');
        cy.get(people_profile.PROFILE_ITEM_CONFIRM).click();
        cy.get(people_profile.EDIT_SAVE).click();
        cy.wait(1000);
        cy.get(people_profile.VIEW_PROFILE).click();
        cy.get(people_profile.VIEW_PROFILE_PINNED_FIRST).click();
        cy.url().should('contain', '/#/list/main');
        cy.get(people_profile.SHARED_LABEL_TITLE).contains("Shared Recipes");
        cy.visit('/#/people/my-profile');
        cy.get(people_profile.PROFILE_ITEM_REMOVE_FIRST).click();
        cy.get(people_profile.EDIT_SAVE).click();
    })

    // disabling profile should remove the profile and lead back to the create profile button
    it('should remove the profile when disabling it', () => {
        cy.get(people_profile.ENABLE_TOGGLE).click();
        cy.get(people_profile.EDIT_SAVE).click();
        cy.get(people_profile.ENABLE_TOGGLE).should('not.have.class', 'toggle-checked');
        cy.visit('/#/people');
        cy.get(people_profile.PEOPLE_CREATE_PROFILE).should('be.visible');
        cy.get(people_profile.PEOPLE_CREATE_PROFILE).click();
        cy.get(people_profile.PROFILE_NOT_ENABLED_IGNORE).click();
        // reset
        cy.visit('/#/people');
        cy.get(people_profile.PEOPLE_CREATE_PROFILE).click();
        cy.get(people_profile.PROFILE_NOT_ENABLED_ENABLE).click();
        cy.get(people_profile.EDIT_SAVE).click();
    })

    it('should be able to reenable the profile with the same information', () => {
        cy.get(people_profile.ENABLE_TOGGLE).click();
        cy.get(people_profile.EDIT_SAVE).click();
        cy.get(people_profile.ENABLE_TOGGLE).should('not.have.class', 'toggle-checked');
        cy.visit('/#/people');
        cy.get(people_profile.PEOPLE_CREATE_PROFILE).click();
        cy.get(people_profile.PROFILE_NOT_ENABLED_ENABLE).click();
        cy.get(people_profile.ENABLE_TOGGLE).should('have.class', 'toggle-checked');
        cy.get(people_profile.EDIT_NICKNAME_CLICK).contains('Elizabeth');
        cy.get(people_profile.EDIT_TAG_CLICK).contains('elizabethcho');
        cy.get(people_profile.EDIT_SAVE).click();
    })
})

describe('sending friend requests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(landing_login.LOGIN_TOP).click();
        cy.get(landing_login.LOGIN_EMAIL_INPUT).type('echo30@jhu.edu');
        cy.get(landing_login.LOGIN_PASSWORD_INPUT).type('123456');
        cy.get(landing_login.LOGIN_SUBMIT).click();
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.PEOPLE_PROFILE).click();
        cy.wait(2000);
    })

    it('should be able to view someone else\'s profile', () => {
        cy.get(people_profile.SEARCH_FRIENDS).click();
        cy.get(people_profile.SEARCH_FRIENDS_INPUT).type('echo30.dev');
        cy.wait(1000);
        cy.get(people_profile.SEARCH_FIRST_RESULT).click();
        cy.get(people_profile.SEARCH_OPEN_PROFILE).click();
        cy.url().should('include', 'echo30.dev');
    })

    it('should be able to send a friend request from viewing their profile', () => {
        cy.get(people_profile.SEARCH_FRIENDS).click();
        cy.get(people_profile.SEARCH_FRIENDS_INPUT).type('echo30');
        cy.wait(1000);
        cy.get(people_profile.SEARCH_FIRST_RESULT).click();
        cy.get(people_profile.SEARCH_OPEN_PROFILE).click();
        cy.get(people_profile.FRIEND_PROFILE_REQUEST).click();
        cy.get('ion-toast').should('exist').shadow().contains('Friend invite sent!');
        cy.wait(5000);
        cy.get(people_profile.FRIEND_PROFILE_REQUEST).click();
        cy.get('ion-toast').should('exist').shadow().contains('Friendship removed');
    })

    // should be able to add friends from search
    it('should be able to add friends from the search', () => {
        cy.get(people_profile.SEARCH_FRIENDS).click();
        cy.get(people_profile.SEARCH_FRIENDS_INPUT).type('echo30');
        cy.wait(1000);
        cy.get(people_profile.SEARCH_FIRST_RESULT).click();
        cy.get(people_profile.SEARCH_SEND_REQUEST).click();
        cy.get('ion-toast').should('exist').shadow().contains('Friend invite sent!');
        cy.wait(1000);
        cy.get(people_profile.CANCEL_FRIEND_REQUEST).click();
        cy.get(people_profile.CANCEL_FRIEND_REQUEST).should('not.exist');
    })

    // should be able to remove friends
    it('should be able to accept friend requests', () => {
        cy.get(people_profile.SEARCH_FRIENDS).click();
        cy.get(people_profile.SEARCH_FRIENDS_INPUT).type('echo30.dev');
        cy.wait(1000);
        cy.get(people_profile.SEARCH_FIRST_RESULT).click();
        cy.get(people_profile.SEARCH_SEND_REQUEST).click();
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.LOGOUT).click();
        cy.get(people_profile.RELOG_EMAIL).type('echo30.dev@gmail.com');
        cy.get(people_profile.RELOG_PWD).type('password');
        cy.get(people_profile.RELOG_SUBMIT).click();
        cy.visit('/#/people');
        cy.get(people_profile.ACCEPT_FRIEND_REQUEST).click();
        cy.get(people_profile.UNFRIEND).should('exist');
        // reset
        cy.wait(1000);
        cy.get(people_profile.UNFRIEND).click();
    })

    // should be able to remove friends 
    it('should be able to remove friends', () => {
        cy.get(people_profile.SEARCH_FRIENDS).click();
        cy.get(people_profile.SEARCH_FRIENDS_INPUT).type('echo30.dev');
        cy.wait(1000);
        cy.get(people_profile.SEARCH_FIRST_RESULT).click();
        cy.get(people_profile.SEARCH_SEND_REQUEST).click();
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.LOGOUT).click();
        cy.get(people_profile.RELOG_EMAIL).type('echo30.dev@gmail.com');
        cy.get(people_profile.RELOG_PWD).type('password');
        cy.get(people_profile.RELOG_SUBMIT).click();
        cy.visit('/#/people');
        cy.get(people_profile.ACCEPT_FRIEND_REQUEST).click();
        // reset
        cy.wait(1000);
        cy.get(people_profile.UNFRIEND).click();
        cy.get(people_profile.UNFRIEND).should('not.exist');
    })

    // should be able to decline friend requests
    it('should be able to decline friend requests', () => {
        cy.get(people_profile.SEARCH_FRIENDS).click();
        cy.get(people_profile.SEARCH_FRIENDS_INPUT).type('echo30.dev');
        cy.wait(1000);
        cy.get(people_profile.SEARCH_FIRST_RESULT).click();
        cy.get(people_profile.SEARCH_SEND_REQUEST).click();
        cy.get(sidebar.OPEN_SIDEBAR).click();
        cy.get(sidebar.LOGOUT).click();
        cy.get(people_profile.RELOG_EMAIL).type('echo30.dev@gmail.com');
        cy.get(people_profile.RELOG_PWD).type('password');
        cy.get(people_profile.RELOG_SUBMIT).click();
        cy.visit('/#/people');
        cy.get(people_profile.INCOMING_REQUEST).should('exist');
        cy.get(people_profile.DECLINE_FRIEND_REQUEST).click();
        cy.wait(1000);
        cy.get(people_profile.INCOMING_REQUEST).should('not.exist');
    })
})