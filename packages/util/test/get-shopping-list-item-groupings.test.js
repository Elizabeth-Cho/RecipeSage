const {
  expect
} = require('chai');

const {
  sortedItems,
  itemsByGroupTitle,
  itemsByCategoryTitle
} = require('../src/get-shopping-list-item-groupings');

describe('sortedItems', () => {
 
  let item_1 = {
    "createdAt": new Date() - 1,
    "title": "1",
  }
  let item_2 = {
    "createdAt": new Date(),
    "title": "2",
  }
  let item_3 = 
  {
    "createdAt": new Date(),
    "title": "1",
  }

  it('if created time is the same, sort by title', () => {
    let arr = [
      item_2, item_3
    ]
    expect(sortedItems(arr, 'createdAt')[0]).equal(item_3)
  });

  it('when created date not same, sort by "createdAt"', () => {
    let arr = [
      item_1, item_2
    ]
    expect(sortedItems(arr, 'createdAt')[0]).equal(item_1)
  });

  it('when created date is the same, sort by "-createdAt"', () => {
    let arr = [
      item_3, item_2
    ]
    let sorted = sortedItems(arr, '-createdAt')
    expect(sorted[0]).equal(item_3)
    expect(sorted[1]).equal(item_2)
  });

  it('when created date not same, sort by "-createdAt"', () => {
    let arr = [
      item_1, item_2
    ]
    let sorted = sortedItems(arr, '-createdAt')
    expect(sorted[0]).equal(item_2)
    expect(sorted[1]).equal(item_1)
  });

  it('when created date is the same, sort by title', () => {
    let arr = [
      item_3, item_2
    ]
    let sorted = sortedItems(arr, '-title')
    expect(sorted[0]).equal(item_3)
    expect(sorted[1]).equal(item_2)
  });

  it('when created date not same, sort by title', () => {
    let arr = [
      item_1, item_2
    ]
    let sorted = sortedItems(arr, '-title')
    expect(sorted[0]).equal(item_1)
    expect(sorted[1]).equal(item_2)
  });

  it('when created date not same, default sort method', () => {
    let arr = [
      item_1, item_2
    ]
    let sorted = sortedItems(arr, '')
    expect(sorted[0]).equal(item_1)
    expect(sorted[1]).equal(item_2)
  });

  it('when created date not same, default sort method', () => {
    let arr = [
      item_3, item_2
    ]
    let sorted = sortedItems(arr, '')
    expect(sorted[0]).equal(item_3)
    expect(sorted[1]).equal(item_2)
  });

  it('when title is the same, default sort method', () => {
    let arr = [
      item_3, item_1
    ]
    let sorted = sortedItems(arr, '')
    expect(sorted[0]).equal(item_1)
    expect(sorted[1]).equal(item_3)
  });

});

describe('itemsByGroupTitle', () => {
  let item_1 = {
    "createdAt": new Date() - 1,
    "groupTitle": "gt1",
    "title": "1",
  }
  let item_2 = {
    "createdAt": new Date() - 2,
    "groupTitle": "gt2",
    "title": "2",
  }
  let item_3 = 
  {
    "createdAt": new Date(),
    "groupTitle": "gt3",
    "title": "3",
  }
  let item_4 = 
  {
    "createdAt": new Date() - 1,
    "groupTitle": "gt3",
    "title": "123",
  }

  it('no group title overlap, sort by -title', () => {
    let arr = [
      item_1, item_2, item_3
    ]
    let sorted = itemsByGroupTitle(arr, '-title')
    let res = {"gt1": [item_1], "gt2": [item_2], "gt3": [item_3]}
    expect(JSON.stringify(sorted)).equal(JSON.stringify(res))
  });

  it('item_3 and item_4 group title overlap, sort by -title', () => {
    let arr = [
      item_1, item_2, item_3, item_4
    ]
    let sorted = itemsByGroupTitle(arr, '-title')
    let res = {"gt1": [item_1], "gt2": [item_2], "gt3": [item_4, item_3]}
    expect(JSON.stringify(sorted)).equal(JSON.stringify(res))
  });

  it('item_3 and item_4 group title overlap, sort by createdAt', () => {
    let arr = [
      item_1, item_2, item_3, item_4
    ]
    let sorted = itemsByGroupTitle(arr, 'createdAt')
    let res = {"gt1": [item_1], "gt2": [item_2], "gt3": [item_4, item_3]}
    expect(JSON.stringify(sorted)).equal(JSON.stringify(res))
  });

  it('item_3 and item_4 group title overlap, sort by -createdAt', () => {
    let arr = [
      item_1, item_2, item_3, item_4
    ]
    let sorted = itemsByGroupTitle(arr, '-createdAt')
    let res = {"gt1": [item_1], "gt2": [item_2], "gt3": [item_3, item_4]}
    expect(JSON.stringify(sorted)).equal(JSON.stringify(res))
  });
});

describe('itemsByCategoryTitle', () => {
  let item_1 = {
    "createdAt": new Date() - 1,
    "categoryTitle": "ct1",
    "title": "1",
  }
  let item_2 = {
    "createdAt": new Date() - 2,
    "categoryTitle": "ct2",
    "title": "2",
  }
  let item_3 = 
  {
    "createdAt": new Date(),
    "categoryTitle": "ct3",
    "title": "3",
  }
  let item_4 = 
  {
    "createdAt": new Date() - 1,
    "categoryTitle": "ct3",
    "title": "123",
  }

  it('no category title overlap, sort by -title', () => {
    let arr = [
      item_1, item_2, item_3
    ]
    let sorted = itemsByCategoryTitle(arr, '-title')
    let res = {"ct1": [item_1], "ct2": [item_2], "ct3": [item_3]}
    expect(JSON.stringify(sorted)).equal(JSON.stringify(res))
  });

  it('item_3 and item_4 category title overlap, sort by -title', () => {
    let arr = [
      item_1, item_2, item_3, item_4
    ]
    let sorted = itemsByCategoryTitle(arr, '-title')
    let res = {"ct1": [item_1], "ct2": [item_2], "ct3": [item_4, item_3]}
    expect(JSON.stringify(sorted)).equal(JSON.stringify(res))
  });

  it('item_3 and item_4 category title overlap, sort by createdAt', () => {
    let arr = [
      item_1, item_2, item_3, item_4
    ]
    let sorted = itemsByCategoryTitle(arr, 'createdAt')
    let res = {"ct1": [item_1], "ct2": [item_2], "ct3": [item_4, item_3]}
    expect(JSON.stringify(sorted)).equal(JSON.stringify(res))
  });

  it('item_3 and item_4 category title overlap, sort by -createdAt', () => {
    let arr = [
      item_1, item_2, item_3, item_4
    ]
    let sorted = itemsByCategoryTitle(arr, '-createdAt')
    let res = {"ct1": [item_1], "ct2": [item_2], "ct3": [item_3, item_4]}
    expect(JSON.stringify(sorted)).equal(JSON.stringify(res))
  });
});