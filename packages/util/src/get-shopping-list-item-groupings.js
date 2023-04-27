// Sort must be one of 'createdAt', '-createdAt', '-title'
const itemSort = (a, b, sortBy) => {
  switch (sortBy) {
    case 'createdAt':
      const dateComp = (new Date(a.createdAt)) - (new Date(b.createdAt));
      if (dateComp === 0) {
        return a.title.localeCompare(b.title);
      }
      return dateComp;
    case '-createdAt':
      const reverseDateComp = (new Date(b.createdAt)) - (new Date(a.createdAt));
      if (reverseDateComp === 0) {
        return a.title.localeCompare(b.title);
      }
      return reverseDateComp;
    case '-title':
    default:
      const localeComp = a.title.localeCompare(b.title);
      if (localeComp === 0) {
        return (new Date(a.createdAt)) - (new Date(b.createdAt));
      }
      return localeComp;
  }
};

const groupAndSort = (items, keyName, sortBy) => {
  return Object.entries(items.reduce((acc, item) => {
    const key = item[keyName];
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {})).reduce((acc, [key, items]) => {
    acc[key] = items.sort((a, b) => {
      return itemSort(a, b, sortBy);
    });
    return acc;
  }, {});
}

const sortedItems  = (items, sortBy) => {
  return items.sort((a, b) => {
    return itemSort(a, b, sortBy);
  });
}

const itemsByGroupTitle  = (items, sortBy) => {
  return groupAndSort(items, 'groupTitle', sortBy);
}
const itemsByCategoryTitle  = (items, sortBy) => {
  return groupAndSort(items, 'categoryTitle', sortBy);
}
module.exports = {
  sortedItems,
  itemsByGroupTitle,
  itemsByCategoryTitle
}
