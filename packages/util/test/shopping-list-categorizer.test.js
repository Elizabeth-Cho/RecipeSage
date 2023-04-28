const {
  expect
} = require('chai');

const {
  getCategoryTitle
} = require('../src/shopping-list-categorizer');

describe('getCategoryTitle', () => {

  describe('Canned', () => {
    it('with keyword canned', () => {
      expect(getCategoryTitle('canned')).equal("Canned")
    });

    it('with keyword can', () => {
      expect(getCategoryTitle(' can ')).equal("Canned")
    });

    it('with keyword cans', () => {
      expect(getCategoryTitle(' cans ')).equal("Canned")
    });
  });

  describe('Frozen', () => {
    it('with keyword Frozen', () => {
      expect(getCategoryTitle('Frozen pineapple')).equal("Frozen")
    });

    it('with capitalize keyword Frozen', () => {
      expect(getCategoryTitle('FROZEN pineapple')).equal("Frozen")
    });

    it('with small case keyword cans', () => {
      expect(getCategoryTitle('frozen pineapple')).equal("Frozen")
    });
  });

  describe('Dairy', () => {
    it('milk', () => {
      expect(getCategoryTitle('milk')).equal("Dairy")
    });

  });

  describe('Uncatigorized', () => {
    it('numbers', () => {
      expect(getCategoryTitle('22309842')).equal("Uncategorized")
    });

    it('dollars', () => {
      expect(getCategoryTitle('$$')).equal("Uncategorized")
    });

    it('empty', () => {
      expect(getCategoryTitle('')).equal("Uncategorized")
    });
  });

  describe('Nonfood', () => {
    it('shampoo', () => {
      expect(getCategoryTitle('Shampoo')).equal("nonfood")
    });
  });
  
});