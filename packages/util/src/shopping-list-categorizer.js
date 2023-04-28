const itemCategories = require('../../backend/src/constants/itemCategories.json');

const itemTitles = Object.keys(itemCategories).sort((a, b) => b.length - a.length);

const formattedCategoryTitles = {
  'produce': 'Produce',
  'dairy': 'Dairy',
  'meat': 'Meats',
  'bakery': 'Baked Goods',
  'grocery': 'Grocery Items',
  'liquor': 'Liquor',
  'seafood': 'Seafood',
  'nonfood': 'Non-Food and Household',
  'deli': 'Deli'
};

const getCategoryTitle = itemTitle => {
  itemTitle = itemTitle.toLowerCase();
  if (itemTitle.includes('canned') || itemTitle.includes(' can ') || itemTitle.includes(' cans ')) return 'Canned';
  if (itemTitle.includes('frozen')) return 'Frozen';

  const itemTitleMatch = itemTitles.find(potentialMatch => {
    const potentialChunks = potentialMatch.charAt(0) === '*' ? [potentialMatch.substring(1)] : potentialMatch.split(' '); // Matchers beginning with * should be matched whole
    const diffChunks = potentialChunks.filter(token => !itemTitle.includes(token)); // Filter by any chunks that _do not_ match our itemTitle

    return diffChunks.length === 0;
  });
  if (!itemTitleMatch) return 'Uncategorized';

  const category = itemCategories[itemTitleMatch];
  return formattedCategoryTitles[category];
};


module.exports = {
  getCategoryTitle,
}