const {
  expect
} = require('chai');

const sinon = require('sinon');

const {
  setup,
  cleanup,
  syncDB,
  randomString,
  createUser,
  createRecipe,
} = require('../testutils');

// DB
const SQ = require('../models').sequelize;
const Recipe = require('../models').Recipe;

describe('recipe', () => {
  // let server;
  // beforeAll(async () => {
  //   server = await setup();
  // });

  // afterAll(async () => {
  //   await cleanup(server);
  // });

  describe('findTitle', () => {
    let _findTitleStub;

    beforeAll(() => {
      _findTitleStub = sinon.stub(Recipe, '_findTitle').returns(Promise.resolve());
    });

    afterAll(() => {
      _findTitleStub.restore();
    });

    it('calls and returns result of _findTitle with proper args', () => {
      let userId = randomString(20);
      let recipeId = randomString(20);
      let basename = randomString(20);
      let transaction = randomString(20);

      return Recipe.findTitle(userId, recipeId, basename, transaction).then(() => {

        sinon.assert.calledOnce(_findTitleStub);
        let opts = _findTitleStub.getCalls()[0].args;

        expect(opts[0]).to.equal(userId);
        expect(opts[1]).to.equal(recipeId);
        expect(opts[2]).to.equal(basename);
        expect(opts[3]).to.equal(transaction);
        expect(opts[4]).to.equal(1); // recursive start idx
      });
    });
  });

  // describe('_findTitle', () => {
  //   beforeEach(async () => {
  //     await syncDB();
  //   });

  //   it('returns initial name when no conflicts arise', async () => {
  //     let user = await createUser();

  //     let recipe = await createRecipe(user.id);

  //     return SQ.transaction(t => {
  //       return Recipe.findTitle(user.id, recipe.id, recipe.title, t).then(adjustedTitle => {
  //         expect(adjustedTitle).to.equal(recipe.title);
  //       });
  //     });
  //   });

  //   it('returns incremented name when conflict arises', async () => {
  //     let user = await createUser();

  //     let recipe1 = await createRecipe(user.id);
  //     let recipe2 = await createRecipe(user.id);

  //     return SQ.transaction(t => {
  //       return Recipe.findTitle(user.id, recipe1.id, recipe2.title, t).then(adjustedTitle => {
  //         expect(adjustedTitle).to.equal(recipe2.title + ' (2)');
  //       });
  //     });
  //   });

  //   it('returns initial name when no conflicts arise with no recipeId', async () => {
  //     let user = await createUser();

  //     return SQ.transaction(t => {
  //       let desiredTitle = randomString(20);
  //       return Recipe.findTitle(user.id, null, desiredTitle, t).then(adjustedTitle => {
  //         expect(adjustedTitle).to.equal(desiredTitle);
  //       });
  //     });
  //   });

  //   it('returns incremented name when conflict arises with no recipeId', async () => {
  //     let user = await createUser();

  //     let recipe1 = await createRecipe(user.id);

  //     return SQ.transaction(t => {
  //       return Recipe.findTitle(user.id, null, recipe1.title, t).then(adjustedTitle => {
  //         expect(adjustedTitle).to.equal(recipe1.title + ' (2)');
  //       });
  //     });
  //   });
  // });


  

});

