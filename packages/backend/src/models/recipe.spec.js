const {
  expect
} = require('chai');

const sinon = require('sinon');

const {
  randomString,
} = require('../testutils');

// DB
const Recipe = require('../models').Recipe;

describe('recipe', () => {
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

});

describe('_findTitleCount', () => {
  it('returns incremented name when conflict arises', async () => {
    adjustedTitle = Recipe._findTitleCount("userId", 2);
    expect(adjustedTitle).to.equal("userId (2)");
  });

  it('returns original name when no conflict', async () => {
    adjustedTitle = Recipe._findTitleCount("userId", 1);
    expect(adjustedTitle).to.equal("userId");
  });


  it('when count num is zero', async () => {
    adjustedTitle = Recipe._findTitleCount("Jessie", 0);
    expect(adjustedTitle).to.equal("Jessie (0)");
  });

});

describe('share', () => {
  let findByPkStub;
  beforeAll(() => {
    findByPkStub = sinon.stub(Recipe, 'findByPk').returns(Promise.resolve());
  });

  it('calls and returns result of findByPkStub with proper args', () => {
    let transaction = randomString(20);

    return Recipe.share("test",transaction).then((result) => {
      sinon.assert.calledOnce(findByPkStub);
      let opts = findByPkStub.getCalls()[0].args;
      expect(opts[0]).to.equal("test");
      expect(result).to.equal("test_result");
    });
  });
});