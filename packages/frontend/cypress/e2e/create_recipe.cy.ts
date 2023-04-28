import * as create_recipe from '../consts/create_recipe_const';
import * as sidebar from '../consts/sidebar_const';

// actual create recipe page
describe('create recipe', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('.title > .button-small').click();
        cy.get(':nth-child(8) > .ng-untouched').type('jluo30@jhu.edu')
        cy.get(':nth-child(11) > .ng-untouched').type('1234567')
        cy.get('.ion-padding > .md').click();
        // cy.get(sidebar.OPEN_SIDEBAR).click();
        // cy.get(sidebar.CREATE_RECIPE).click();
        // cy.visit('/#/edit-recipe/new');
        cy.get(create_recipe.CREATE_RECIPE_BUTTON).click();
    })

    // stars should be clickable
    it('should be able to click on the stars', () => {
        cy.get(create_recipe.FIRST_STAR_RATING).should('have.css', 'cursor', 'pointer');
        cy.get(create_recipe.SECOND_STAR_RATING).should('have.css', 'cursor', 'pointer');
        cy.get(create_recipe.THIRD_STAR_RATING).should('have.css', 'cursor', 'pointer');
        cy.get(create_recipe.FOURTH_STAR_RATING).should('have.css', 'cursor', 'pointer');
        cy.get(create_recipe.FIFTH_STAR_RATING).should('have.css', 'cursor', 'pointer');
    })

    // should not be able to create a recipe from a blank form
    it('should not be able to create a recipe with a fully blank form', () => {
        cy.get(create_recipe.SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('Please provide a recipe title (the only required field).');
        // cy.wait(5000);
    })

    // should be able to create a recipe with only whitespace as a title --> check submission
    it('should be able to submit the form when there is whitespace in the title', () => {
        // type into the title field
        cy.get(create_recipe.TITLE_INPUT).type(' ');
        // submit
        cy.get(create_recipe.SUBMIT).click();
        // new recipe should be at the top of the list
        cy.url().should('include', '/recipe/');
        cy.get(create_recipe.TITLE).contains('Recipe Details: ');
        cy.get(create_recipe.INGREDIENTS).contains('No Ingredients');
        cy.get(create_recipe.INSTRUCTIONS).contains('No Instructions');
    })

    // check that the other fields are default value --> check values
    // it('should not have any fields filled when there is only whitespace in the title', () => {
    //     cy.visit('/');
    //     cy.get(create_recipe.BLANK_CARD).click();

        // back to main page
        // cy.get(create_recipe.RECIPE_CARD_BACK).click();
        // cy.url().should('include', '/list/main');
        // cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h2').contains(' ');
    // })

    // should not be able to create a recipe with no title
    it('should not be able to create a recipe with no title but other fields filled in', () => {
        cy.visit('https://recipesage.com/#/edit-recipe/new');
        cy.get(create_recipe.DESCRIPTION_INPUT).type('test');
        cy.get(create_recipe.SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('Please provide a recipe title (the only required field).');
        cy.wait(5000);
    }) 

    // should be able to create a recipe with a title and no fields filled - all of the values are default --> check submission
    it('should be able to create a recipe with only a title', () => {
        // cy.get(create_recipe.DESCRIPTION_INPUT).clear();
        cy.get(create_recipe.TITLE_INPUT).type('test recipe');
        // submit
        cy.get(create_recipe.SUBMIT).click();
        // check submission
        cy.url().should('include', '/recipe/');
        cy.get(create_recipe.TITLE).contains('test recipe');
        cy.get(create_recipe.INGREDIENTS).contains('No Ingredients');
        cy.get(create_recipe.INSTRUCTIONS).contains('No Instructions');
    })

    // // should have default values when creating a recipe with only a title and no fields filled --> check values
    // it('should have default values when only the title is filled out', () => {
    //     cy.get(create_recipe.TITLE).contains('test recipe');
    //     cy.get(create_recipe.INGREDIENTS).contains('No Ingredients');
    //     cy.get(create_recipe.INSTRUCTIONS).contains('No Instructions');
    //     // back to main page
    //     cy.get(create_recipe.RECIPE_CARD_BACK).click();
    //     cy.url().should('include', '/list/main');
    //     // cy.get('#main-content > page-home > ion-content > div > div.infinite-scrolling-container > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h2').contains('test recipe');
    // })

    // should be able to create a recipe when all fields are filled --> check submission
    it('should be able to create a recipe when all fields are filled out', () => {
        cy.visit('https://recipesage.com/#/edit-recipe/new');
        cy.get(create_recipe.TITLE_INPUT).type('test full recipe');
        cy.get(create_recipe.DESCRIPTION_INPUT).type('test full recipe desc');
        cy.get(create_recipe.YIELD_INPUT).type('1');
        cy.get(create_recipe.ACTIVE_TIME_INPUT).type('20 minutes');
        cy.get(create_recipe.TOTAL_TIME_INPUT).type('35 minutes');
        cy.get(create_recipe.SOURCE_INPUT).type('google');
        cy.get(create_recipe.SOURCE_URL_INPUT).type('https://google.com');
        cy.get(create_recipe.INGREDIENTS_INPUT).type('1 test');
        cy.get(create_recipe.INSTRUCTIONS_INPUT).type('testing');
        cy.get(create_recipe.NOTES_INPUT).type('hit submit');
        cy.get(create_recipe.THIRD_STAR_RATING).click();
        cy.get(create_recipe.SUBMIT).click();
        // check url redirect
        cy.url().should('include', '/recipe/');
        // check values
        cy.get(create_recipe.TITLE).contains('test full recipe');
        cy.get(create_recipe.DESCRIPTION).contains('test full recipe desc');
        cy.get(create_recipe.YIELD).contains('Yield: 1');
        cy.get(create_recipe.ACTIVE_TIME).contains('20 minutes');
        cy.get(create_recipe.TOTAL_TIME).contains('35 minutes');
        cy.get(create_recipe.SOURCE).contains('google');
        cy.get(create_recipe.SOURCE_URL).should('have.attr', 'href').and('include', 'https://google.com');
        cy.get(create_recipe.INGREDIENTS).contains('1 test');
        cy.get(create_recipe.INSTRUCTIONS).contains('testing');
        cy.get(create_recipe.NOTES).contains('hit submit');
    })

    // // should have all fields filled out appropriately when prior form is submitted --> check values
    // it('should have the appropriate fields filled out with the input values when all fields are filled out', () => {
    //     // title
    //     cy.get(create_recipe.TITLE).contains('test full recipe');
    //     // description
    //     cy.get(create_recipe.DESCRIPTION).contains('test full recipe desc');
    //     // yield
    //     cy.get(create_recipe.YIELD).contains('Yield: 1');
    //     // active time
    //     cy.get(create_recipe.ACTIVE_TIME).contains('20 minutes');
    //     // total time
    //     cy.get(create_recipe.TOTAL_TIME).contains('35 minutes');
    //     // source
    //     cy.get(create_recipe.SOURCE).contains('google');
    //     // source url
    //     cy.get(create_recipe.SOURCE_URL).should('have.attr', 'href').and('include', 'https://google.com');
    //     // ingredients
    //     cy.get(create_recipe.INGREDIENTS).contains('1 test');
    //     // instructions
    //     cy.get(create_recipe.INSTRUCTIONS).contains('testing');
    //     // notes
    //     cy.get(create_recipe.NOTES).contains('hit submit');
    //     // stars
    // })

    // fill out a recipe with no link - source should be unlinked --> check submission
    it('should not link to a source when no link is provided', () => {
        // cy.visit('https://recipesage.com/#/edit-recipe/new');
        // title
        cy.get(create_recipe.TITLE_INPUT).type('test full recipe');
        // source
        cy.get(create_recipe.SOURCE_INPUT).type('google');
        cy.get(create_recipe.SUBMIT).click();
        // redirect
        cy.url().should('include', '/recipe/');
    })

    // autofill nothing when there's no link --> error toast
    it('should not fill out the form when no autofill link is provided', () => {
        // cy.visit('https://recipesage.com/#/edit-recipe/new');
        cy.get(create_recipe.AUTOFILL_FROM_LINK).click();
        cy.get(create_recipe.AUTOFILL_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('Error: You must provide a valid URL');
        // cy.wait(5000);
    })

    // autofill with invalid link --> error toast
    it('should not fill out the form when an improper link is provided', () => {
        cy.get(create_recipe.AUTOFILL_FROM_LINK).click();
        cy.get(create_recipe.AUTOFILL_URL).type('not a valid url');
        cy.get(create_recipe.AUTOFILL_SUBMIT).click();
        cy.get('ion-toast').should('exist').shadow().contains('Error: You must provide a valid URL');
        // cy.wait(5000);
    })

    // autofill fields from recipe url should be submittable --> check submission
    it('should fill out the appropriate fields when autofilling from a url', () => {
        // cy.visit('https://recipesage.com/#/edit-recipe/new');
        cy.get(create_recipe.AUTOFILL_FROM_LINK).click();
        cy.get(create_recipe.AUTOFILL_URL).type('https://www.thespruceeats.com/basic-recipe-for-fresh-fruit-syrup-4108534');
        cy.get(create_recipe.AUTOFILL_SUBMIT).click();
        cy.get(create_recipe.LOADING_OVERLAY, {timeout: 30000}).should('not.be.visible');
        cy.get(create_recipe.SUBMIT).click();
        // redirect
        cy.url().should('include', '/recipe/');
        // values
        cy.get(create_recipe.TITLE).contains('Fresh Fruit Syrup');
        cy.get(create_recipe.DESCRIPTION).contains('Do you want to make your own basic fruit syrup to serve');
        cy.get(create_recipe.YIELD).contains('1 Cup');
        cy.get(create_recipe.ACTIVE_TIME).contains('10 mins');
        cy.get(create_recipe.TOTAL_TIME).contains('22 mins');
        cy.get(create_recipe.SOURCE).contains('www.thespruceeats.com');
        cy.get(create_recipe.SOURCE_URL).contains('https://www.thespruceeats.com/basic-recipe-for-fresh-fruit-syrup-4108534');
        cy.get(create_recipe.INGREDIENTS).contains('1 cup fruit, fresh or frozen \n 3/4 cup sugar \n 1/3 cup water');
        cy.get(create_recipe.INSTRUCTIONS).contains('Gather the ingredients \n Peel, de-stem, or remove seeds from the fruit, as appropriate.');
    })

    // // autofill fields from recipe url should fill out the appropriate fields
    // it('should fill out the appropriate fields when autofilling from a recipe url', () => {
    //     cy.get(create_recipe.TITLE).contains('Fresh Fruit Syrup');
    //     cy.get(create_recipe.DESCRIPTION).contains('Do you want to make your own basic fruit syrup to serve');
    //     cy.get(create_recipe.YIELD).contains('1 Cup');
    //     cy.get(create_recipe.ACTIVE_TIME).contains('10 mins');
    //     cy.get(create_recipe.TOTAL_TIME).contains('22 mins');
    //     cy.get(create_recipe.SOURCE).contains('www.thespruceeats.com');
    //     cy.get(create_recipe.SOURCE_URL).contains('https://www.thespruceeats.com/basic-recipe-for-fresh-fruit-syrup-4108534');
    //     cy.get(create_recipe.INGREDIENTS).contains('1 cup fruit, fresh or frozen \n 3/4 cup sugar \n 1/3 cup water');
    //     cy.get(create_recipe.INSTRUCTIONS).contains('Gather the ingredients \n Peel, de-stem, or remove seeds from the fruit, as appropriate.');
    // })

    // autofill fields from nonrecipe url should produce some funky results --> check submission
    it('should be able to submit the form when a nonrecipe url', () => {
        // cy.visit('https://recipesage.com/#/edit-recipe/new');
        cy.get(create_recipe.AUTOFILL_FROM_LINK).click();
        cy.get(create_recipe.AUTOFILL_URL).type('https://www.google.com');
        cy.get(create_recipe.AUTOFILL_SUBMIT).click();
        cy.get(create_recipe.LOADING_OVERLAY, {timeout: 30000}).should('not.be.visible');
        cy.get(create_recipe.SUBMIT, { timeout: 10000}).click();
        // redirect
        cy.url().should('include', '/recipe/');
        // values
        cy.get(create_recipe.SOURCE).contains("www.google.com");
        cy.get(create_recipe.SOURCE_URL).contains('https://www.google.com');
    })

    // // autofill fields from nonrecipe url should have at least the source and url filled in
    // it('should have at least the source and the url filled in when autofilling from a nonrecipe url', () => {
    //     cy.get(create_recipe.SOURCE).contains("www.google.com");
    //     cy.get(create_recipe.SOURCE_URL).contains('https://www.google.com');
    // })

    // autofill url and replacing should replace the filled in fields completely
    it('should fully replace all fields when the form is autofilled twice', () => {
        // cy.visit('https://recipesage.com/#/edit-recipe/new');
        cy.get(create_recipe.AUTOFILL_FROM_LINK).click();
        cy.get(create_recipe.AUTOFILL_URL).type('https://www.google.com');
        cy.get(create_recipe.AUTOFILL_SUBMIT).click();
        cy.get(create_recipe.LOADING_OVERLAY, {timeout: 30000}).should('not.be.visible');
        cy.get(create_recipe.TITLE_INPUT).should('have.value', 'Google');
        cy.get(create_recipe.SOURCE_INPUT).should('have.value', 'www.google.com');
        cy.get(create_recipe.SOURCE_URL_INPUT).should('have.value', 'https://www.google.com');
        cy.get(create_recipe.UPLOAD_PICTURE).should('have.css', 'display', 'none');
        cy.get(create_recipe.AUTOFILL_FROM_LINK).click();
        cy.get(create_recipe.AUTOFILL_URL).type('https://jhu-st.github.io/cs422_sp23/docs/project/');
        cy.get(create_recipe.AUTOFILL_SUBMIT).click();
        cy.get(create_recipe.LOADING_OVERLAY, {timeout: 30000}).should('not.be.visible');
        cy.get(create_recipe.TITLE_INPUT).should('have.value', 'Project');
        cy.get(create_recipe.SOURCE_INPUT).should('have.value', 'Home');
        cy.get(create_recipe.SOURCE_URL_INPUT).should('have.value', 'https://jhu-st.github.io/cs422_sp23/docs/project/');
        cy.get(create_recipe.UPLOAD_PICTURE).should('not.have.css', 'display', 'none');
    })

    // no image uploaded should result in default image
    it('should have the default thumbnail when no image is provided', () => {
        // cy.visit('https://recipesage.com/#/edit-recipe/new');
        // title
        cy.get(create_recipe.TITLE_INPUT).type('test default image');
        cy.get(create_recipe.SUBMIT).click();
        cy.get(create_recipe.RECIPE_CARD_BACK).click();
        cy.get(create_recipe.FIRST_RECIPE_IMG).should('have.attr', 'src', '/assets/imgs/logo_green.png');
    })

    // uploading an image should result in not the default image
    it('should not have the default image if an image is uploaded', () => {
        cy.visit('https://recipesage.com/#/edit-recipe/new');
        cy.get(create_recipe.TITLE_INPUT).type('test upload image');
        // upload???
        // @ts-ignore
        cy.get(create_recipe.UPLOAD_PICTURE_INPUT).selectFile('cypress/support/pancakes.jpg', { force: true });
        // cy.get(create_recipe.SUBMIT).click();
        // cy.get(create_recipe.FIRST_RECIPE_IMG).should('not.have.attr', 'src', '/assets/imgs/logo_green.png');
    })

    // redirect to create recipe page when + is clicked on the main page
    it('should redirect to the create recipe page when the + button is clicked on the main recipe list page', () => {
        cy.visit('/#/list/main');
        cy.get(create_recipe.CREATE_RECIPE_BUTTON).click();
        cy.url().should('contain', '/edit-recipe/new');
    })

    it('should be able to add an image with a valid url', () => {
        cy.get(create_recipe.ACTIONS_BUTTON).click();
        cy.get(create_recipe.ADD_IMG_BY_URL).click();
        cy.get(create_recipe.IMG_URL_INPUT).type('https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b3/Cookie_JE2_BE2.png/revision/latest?cb=20190505051355');
        cy.get(create_recipe.IMG_URL_CONFIRM).click();
    })

    it('should not be able to add an image with an invalid url', () => {
        cy.get(create_recipe.ACTIONS_BUTTON).click();
        cy.get(create_recipe.ADD_IMG_BY_URL).click();
        cy.get(create_recipe.IMG_URL_INPUT).type('https://google.com');
        cy.get(create_recipe.IMG_URL_CONFIRM).click();
        cy.get('ion-toast').should('exist').shadow().contains('Please enter a valid image URL');
    })

    it('should not be able to add an image when invalid text is input', () => {
        cy.get(create_recipe.ACTIONS_BUTTON).click();
        cy.get(create_recipe.ADD_IMG_BY_URL).click();
        cy.get(create_recipe.IMG_URL_INPUT).type('adsf');
        cy.get(create_recipe.IMG_URL_CONFIRM).click();
        // An unexpected error occurred
        cy.get('ion-toast', {timeout: 30000}).should('exist').shadow().contains('An unexpected error occurred');
    })

    // after(() => {
    //     /* REMOVE THIS AFTER TWEAKING - THIS JUST CLEARS IT */
    //     cy.visit('https://recipesage.com/#/list/main')
    //     // 1
    //     // cy.get(create_recipe.FIRST_RECIPE_CARD).click();
    //     // cy.get(create_recipe.DELETE_RECIPE).click();
    //     // cy.get(create_recipe.DELETE_CONFIRM).click();
    //     // // 2
    //     // cy.get(create_recipe.FIRST_RECIPE_CARD).click();
    //     // cy.get(create_recipe.DELETE_RECIPE).click();
    //     // cy.get(create_recipe.DELETE_CONFIRM).click();
    //     // // 3
    //     // cy.get(create_recipe.FIRST_RECIPE_CARD).click();
    //     // cy.get(create_recipe.DELETE_RECIPE).click();
    //     // cy.get(create_recipe.DELETE_CONFIRM).click();
    //     // // 4
    //     // cy.get(create_recipe.FIRST_RECIPE_CARD).click();
    //     // cy.get(create_recipe.DELETE_RECIPE).click();
    //     // cy.get(create_recipe.DELETE_CONFIRM).click();
    //     // // 5
    //     // cy.get(create_recipe.FIRST_RECIPE_CARD).click();
    //     // cy.get(create_recipe.DELETE_RECIPE).click();
    //     // cy.get(create_recipe.DELETE_CONFIRM).click();
    //     // // 6
    //     // cy.get(create_recipe.FIRST_RECIPE_CARD).click();
    //     // cy.get(create_recipe.DELETE_RECIPE).click();
    //     // cy.get(create_recipe.DELETE_CONFIRM).click();
    //     // logout
    //     // cy.get(sidebar.OPEN_SIDEBAR).click();
    //     // cy.get(sidebar.LOGOUT).click();
    // })
})

