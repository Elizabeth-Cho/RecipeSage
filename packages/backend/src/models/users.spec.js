const { expect } = require('chai');
const crypto = require('crypto');
const sinon = require('sinon');
const { randomString } = require('../testutils');
// DB
const User = require('.').User;
describe('user', () => {
  describe('generateHashedPassword', () => {
    let generateHashedPasswordStub;

    beforeAll(() => {
      generateHashedPasswordStub = sinon
        .stub(User, 'generateHashedPassword')
        .returns(Promise.resolve());
    });
    afterAll(() => {
      generateHashedPasswordStub.restore();
    });

    it('calls and returns result of generateHashedPassword with proper args', () => {
      let password = randomString(20);

      return User.generateHashedPassword(password).then(() => {
        sinon.assert.calledOnce(generateHashedPasswordStub);
        let opts = generateHashedPasswordStub.getCalls()[0].args;

        expect(opts[0]).to.equal(password);
      });
    });
  });
  
  describe('validateHashedPassword', () => {
    //let validateHashedPasswordStub;
    const sandbox = sinon.createSandbox();

    beforeAll(() => {
      sandbox.spy(crypto, 'pbkdf2Sync');
    });
    afterAll(() => {
      sandbox.restore();
    });

    it('calls crypto.pbkdf2Sync with right arguments and is called once', () => {
      let password = randomString(20);
      let hash = randomString(20);
      let salt = randomString(20);
      const version = 1;

      const isValidated = User.validateHashedPassword(
        password,
        hash,
        salt,
        version
      );
      expect(crypto.pbkdf2Sync.calledOnce);
      expect(typeof isValidated === 'boolean');
      let opts = crypto.pbkdf2Sync.getCalls()[0].args;
      expect(opts[0]).to.equal(password);
      expect(opts[1]).to.equal(salt);
      expect(opts[2]).to.equal(10000);
      expect(opts[3]).to.equal(512);
      expect(opts[4]).to.equal('sha512');
    });
  });

  describe('login', () => {
    let mockUserValidatePassword;
    let mockUserFindOne;
    const sandbox = sinon.createSandbox();

    beforeAll(() => {
      mockUserFindOne = sandbox.stub(User, 'findOne');
      mockUserFindOne.resolves({
        exec: (w, transaction) => {
          if (
            w.where.email === 'email@gmail.com' &&
            transaction === 'transaction'
          ) {
            return {
              id: '123',
              name: 'Fake_Name',
              handle: 'handler',
              email: 'email@gmail.com',
              passwordHash: 'hashed',
              passwordSalt: 'salty',
              passwordVersion: 20,
              lastLogin: new Date(),
              stripeCustomerId: 'stripeId',
              enableProfile: true,
            };
          }
          return null;
        },
      });

      mockUserValidatePassword = sandbox.stub(User, 'validatePassword');
      mockUserValidatePassword.resolves({
        exec: () => {
          return true;
        },
      });
    });
    afterAll(() => {
      sandbox.restore();
    });
     
    it('calls and returns result of login with valid user with proper args', () => {
      const password = 'password';
      const transaction = 'transaction';
      const email = 'email@gmail.com';

      return User.login(email, password, transaction).then(() => {
        sinon.assert.calledOnce(mockUserFindOne);
        sinon.assert.calledOnce(mockUserValidatePassword);
        let optsFindOne = mockUserFindOne.getCalls()[0].args;
        expect(JSON.stringify(optsFindOne[0])).to.equal(
          JSON.stringify({
            where: { email: email },
            transaction: transaction,
          })
        );
      });
    });
  });
});