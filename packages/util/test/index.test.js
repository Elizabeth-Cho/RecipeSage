const {
  expect
} = require('chai');

const {
  isHandleValid,
  parseNotes,
  isHeader,
  replaceFractionsInText,
  getMeasurementsForIngredient,
  getTitleForIngredient,
  parseInstructions,
} = require('../src/index');

describe('isHandleValid', () => {
 
  describe('invalid return false', () => {

    it('null', () => {
      expect(isHandleValid(null)).to.equal(false);
    });

    it('empty', () => {
      expect(isHandleValid()).to.equal(false);
    });
  });

  describe('EVIL_HANDLE_REGEXP return false', () => {

    it('invalid chars case 1', () => {
      expect(isHandleValid("**")).to.equal(false);
    });

    it('invalid chars parenthesis', () => {
      expect(isHandleValid("())")).to.equal(false);
    });

    it('invalid chars and valid chars', () => {
      expect(isHandleValid("*9*")).to.equal(false);
    });

    it('white spaces only', () => {
      expect(isHandleValid("    ")).to.equal(false);
    });

    it('empty string', () => {
      expect(isHandleValid("")).to.equal(false);
    });

    it('other language', () => {
      expect(isHandleValid("新年快乐")).to.equal(false);
    });
  });

  describe('Handles contain "recipesage" or "admin" return false', () => {

    it('"recipesage" alone', () => {
      expect(isHandleValid("recipesage")).to.equal(false);
    });

    it('"admin" alone', () => {
      expect(isHandleValid("admin")).to.equal(false);
    });

    it('"recipesage" plus valid chars', () => {
      expect(isHandleValid("recipesage awesome")).to.equal(false);
    });

    it('"admin" plus valid chars', () => {
      expect(isHandleValid("admin street lol")).to.equal(false);
    });

    it('"admin" and "recipesage"', () => {
      expect(isHandleValid("admin recipesage not allowed")).to.equal(false);
    });

  });

  describe('Valid Handles return true', () => {

    it('"recipesage" missing char', () => {
      expect(isHandleValid("recipesag")).to.equal(true);
    });

    it('"admin"missing char', () => {
      expect(isHandleValid("adin")).to.equal(true);
    });

    // fault
    it('valid naming', () => {
      expect(isHandleValid("julia recipe")).to.equal(true);
    });

    it('valid naming one word', () => {
      expect(isHandleValid("re")).to.equal(true);
    });

    // fault
    it('valid naming two words', () => {
      expect(isHandleValid("jessie love")).to.equal(true);
    });

    it('valid naming number', () => {
      expect(isHandleValid("233")).to.equal(true);
    });
    
  });

});

describe('replaceFractionsInText', () => {
 
  describe('text without fraction return original', () => {

    it('i dont have fraction', () => {
      expect(replaceFractionsInText("i dont have fraction")).to.equal("i dont have fraction");
    });

    it('me neither', () => {
      expect(replaceFractionsInText("me neither")).to.equal("me neither");
    });
  });

  describe('fraction only', () => {

    it('charcode ⅙ return 1/6 with a space in front', () => {
      expect(replaceFractionsInText("⅙")).to.equal(" 1/6");
    });

    it('7/8 return 7/8 itself', () => {
      expect(replaceFractionsInText("7/8")).to.equal("7/8");
    });

    it('charcode "  ⅐   " return "  1/7   " with an additional space in front', () => {
      expect(replaceFractionsInText("  ⅐   ")).to.equal("  1/7   ");
    });

    it('multiple charcode in context', () => {
      expect(replaceFractionsInText("to make a pudding you need ⅗ cup of sugar and ⅑ chocolate")).to.equal("to make a pudding you need 3/5 cup of sugar and 1/9 chocolate");
    });
  });

  describe('edge cases', () => {

    it('white spaces', () => {
      expect(replaceFractionsInText("   ")).to.equal("   ");
    });

    it('empty', () => {
      expect(replaceFractionsInText("")).to.equal("");
    });

    it('multiple fraction together', () => {
      expect(replaceFractionsInText("⅙⅙⅙⅙⅙⅙⅙⅙⅙")).to.equal(" 1/6 1/6 1/6 1/6 1/6 1/6 1/6 1/6 1/6");
    });
  });
});

describe('isHeader', () => {

  it('empty string return null', () => {
    expect(isHeader("")).to.equal(null);
  });

  it('white spaces only string return null', () => {
    expect(isHeader("   ")).to.equal(null);
  });

  it('string with ] but no [ return null', () => {
    expect(isHeader("lol]")).to.equal(null);
  });

  it('string with [ but no ] return null', () => {
    expect(isHeader("[haha")).to.equal(null);
  });

  it('"[]" return null', () => {
    expect(JSON.stringify(isHeader("[]"))).equal(JSON.stringify(["[]"]))
  });

  it('"[random string]" return ["[random string]"]', () => {
    expect(JSON.stringify(isHeader("[sksi]"))).equal(JSON.stringify(["[sksi]"]))
  });

  it('"[random string] string" return null', () => {
    expect(isHeader("[sksi] hihi")).equal(null)
  });

  it('"[random string two words]" return ["[random string two words]"]', () => {
    expect(JSON.stringify(isHeader("[look nice]"))).equal(JSON.stringify(["[look nice]"]))
  });
});

describe('parseInstructions', () => {
  describe('non-header string one line', () => {
    it('character text', () => {
      let res = [
        {
          "content": "chocolate chip",
          "isHeader": false,
          "count": 1,      
          "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("chocolate chip"))).equal(JSON.stringify(res))
    });

    it('int text', () => {
      let res = [
        {
          "content": "1234",
          "isHeader": false,
          "count": 1,      
          "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("1234"))).equal(JSON.stringify(res))
    });

      it('number and string text', () => {
        let res = [
          {
            "content": "1234 yum yum",
            "isHeader": false,
            "count": 1,      
            "complete": false,
          },
        ]
        expect(JSON.stringify(parseInstructions("1234 yum yum"))).equal(JSON.stringify(res))
      });
  });

  describe('header string one line', () => {
    it('header string only', () => {
      let res = [
      {
        "content": "chocolate chip",
        "isHeader": true,
        "count": 0,      
        "complete": false,
      },
    ]
      expect(JSON.stringify(parseInstructions("[chocolate chip]"))).equal(JSON.stringify(res))
    });

    it('header string with random string afterwards return no header', () => {
      let res = [
        {
          "content": "[chocolate chip] lol",
          "isHeader": false,
          "count": 1,      
          "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("[chocolate chip] lol"))).equal(JSON.stringify(res))
    });

    it('header int string', () => {
      let res = [
        {
          "content": "394",
        "isHeader": true,
        "count": 0,      
        "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("[394]"))).equal(JSON.stringify(res))
    });

    it('header int string with empty white spaces trimmed', () => {
      let res = [
        {
          "content": "394  ",
        "isHeader": true,
        "count": 0,      
        "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("   [394  ]     "))).equal(JSON.stringify(res))
    });

    it('header string with random int string afterwards return no header', () => {
      let res = [
        {
          "content": "[chocolate chip] 1234",
          "isHeader": false,
          "count": 1,      
          "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("[chocolate chip] 1234"))).equal(JSON.stringify(res))
    });

    it('two header string extract outer []', () => {
      let res = [
        {
          "content": "chocolate chip] [cookie",
          "isHeader": true,
          "count": 0,      
          "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("[chocolate chip] [cookie]"))).equal(JSON.stringify(res))
    });

    it('two header string extract outer []', () => {
      let res = [
        {
          "content": "[cookie]",
          "isHeader": true,
          "count": 0,      
          "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("[[cookie]]"))).equal(JSON.stringify(res))
    });

    it('two header empty string extract outer []', () => {
      let res = [
        {
          "content": "[]",
          "isHeader": true,
          "count": 0,      
          "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("[[]]"))).equal(JSON.stringify(res))
    });

    
  });

  describe('non-header string two line', () => {
    it('two char strings return object array with two objects', () => {
      let res = [
      {
        "content": "chocolate chip",
        "isHeader": false,
        "count": 1,      
        "complete": false,
      },
      {
        "content": "hi",
        "isHeader": false,
        "count": 2,      
        "complete": false,
      },
      ]
      expect(JSON.stringify(parseInstructions("chocolate chip \n hi"))).equal(JSON.stringify(res))
    });

    it('char string and int string return object array with two objects', () => {
      let res = [
      {
        "content": "924c",
        "isHeader": false,
        "count": 1,      
        "complete": false,
      },
      {
        "content": "hi",
        "isHeader": false,
        "count": 2,      
        "complete": false,
      },
      ]
      expect(JSON.stringify(parseInstructions("924c \n hi"))).equal(JSON.stringify(res))
    });

    it('char string and int string return object array with two objects', () => {
      let res = [
      {
        "content": "1234",
        "isHeader": false,
        "count": 1,      
        "complete": false,
      },
      {
        "content": "99",
        "isHeader": false,
        "count": 2,      
        "complete": false,
      },
      ]
      expect(JSON.stringify(parseInstructions("1234 \n 99"))).equal(JSON.stringify(res))
    });

    it('next line char only', () => {
      let res = []
      expect(JSON.stringify(parseInstructions(" \n "))).equal(JSON.stringify(res))
    });

    it('string within string', () => {
      let res = [
      {
        "content": "924",
        "isHeader": false,
        "count": 1,      
        "complete": false,
      },
      {
        "content": "'ijioj'",
        "isHeader": false,
        "count": 2,      
        "complete": false,
      },
      ]
      expect(JSON.stringify(parseInstructions("924 \n 'ijioj'"))).equal(JSON.stringify(res))
    });
  });

  describe('header string multiple lines', () => {
    it('header string only', () => {
      let res = [
      {
        "content": "123",
        "isHeader": true,
        "count": 0,      
        "complete": false,
      },
      {
        "content": "chocolate chip",
        "isHeader": true,
        "count": 0,      
        "complete": false,
      },
    ]
      expect(JSON.stringify(parseInstructions("[123] \n [chocolate chip]"))).equal(JSON.stringify(res))
    });

    it('header string with random string afterwards return no header', () => {
      let res = [
        {
          "content": "[chocolate chip] lol",
          "isHeader": false,
          "count": 1,      
          "complete": false,
        },
        {
          "content": "chocolate chip",
          "isHeader": true,
          "count": 0,      
          "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("[chocolate chip] lol \n [chocolate chip]"))).equal(JSON.stringify(res))
    });

    it('header string and non-header string on different lines', () => {
      let res = [
        {
          "content": "chocolate chip",
          "isHeader": true,
          "count": 0,      
          "complete": false,
        },
        {
          "content": "233",
          "isHeader": false,
          "count": 1,      
          "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("[chocolate chip] \n 233"))).equal(JSON.stringify(res))
    });

    it('\n at the start of header string', () => {
      let res = [
        {
          "content": "chocolate chip",
          "isHeader": true,
          "count": 0,      
          "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("\n[chocolate chip]"))).equal(JSON.stringify(res))
    });

    it('\n at both the start and the end of header string', () => {
      let res = [
        {
          "content": "chocolate chip",
          "isHeader": true,
          "count": 0,      
          "complete": false,
        },
      ]
      expect(JSON.stringify(parseInstructions("\n[chocolate chip]\n"))).equal(JSON.stringify(res))
    });
  });
});

describe('parseNotes', () => {
 
  describe('string note', () => {

    it('one note', () => {
      let res = [
        {
          "content": "note1",
          "isHeader": false
        },
      ]
      expect(JSON.stringify(parseNotes("note1"))).equal(JSON.stringify(res))
    });

    it('one header note', () => {
      let res = [
        {
          "content": "note1",
          "isHeader": true
        },
      ]
      expect(JSON.stringify(parseNotes("[note1]"))).equal(JSON.stringify(res))
    });

    it('one note with white spaces', () => {
      let res = [
        {
          "content": "note1",
          "isHeader": false
        },
      ]
      expect(JSON.stringify(parseNotes("   note1   "))).equal(JSON.stringify(res))
    });

    it('one header note with white spaces outside header', () => {
      let res = [
        {
          "content": "note1",
          "isHeader": true
        },
      ]
      expect(JSON.stringify(parseNotes("[note1]   "))).equal(JSON.stringify(res))
    });

    it('one header note with white spaces inside header', () => {
      let res = [
        {
          "content": "note1   ",
          "isHeader": true
        },
      ]
      expect(JSON.stringify(parseNotes("[note1   ]"))).equal(JSON.stringify(res))
    });
  });

  describe('note with number', () => {

    it('one note', () => {
      let res = [
        {
          "content": "443 cups of chocolate",
          "isHeader": false
        },
      ]
      expect(JSON.stringify(parseNotes("443 cups of chocolate"))).equal(JSON.stringify(res))
    });

    it('one header note', () => {
      let res = [
        {
          "content": "443 cups of chocolate",
          "isHeader": true
        },
      ]
      expect(JSON.stringify(parseNotes("[443 cups of chocolate]"))).equal(JSON.stringify(res))
    });

    it('one note with white spaces', () => {
      let res = [
        {
          "content": "443 cups of chocolate",
          "isHeader": false
        },
      ]
      expect(JSON.stringify(parseNotes("   443 cups of chocolate   "))).equal(JSON.stringify(res))
    });

    it('one header note with white spaces outside header', () => {
      let res = [
        {
          "content": "443 cups of chocolate",
          "isHeader": true
        },
      ]
      expect(JSON.stringify(parseNotes("[443 cups of chocolate]   "))).equal(JSON.stringify(res))
    });

    it('one header note with white spaces inside header', () => {
      let res = [
        {
          "content": "443 cups of chocolate   ",
          "isHeader": true
        },
      ]
      expect(JSON.stringify(parseNotes("[443 cups of chocolate   ]"))).equal(JSON.stringify(res))
    });
  });

  describe('notes with multiple lines', () => {

    it('two lines of note: two header strings', () => {
      let res = [
        {"content":"ingredients","isHeader":true},
        {"content":"like","isHeader":true}
    ]
      expect(JSON.stringify(parseNotes("[ingredients] \n [like]"))).equal(JSON.stringify(res))
    });

    it('two lines of note: header and non-header strings', () => {
      let res = [
        {"content":"ingredients","isHeader":true},
        {"content":"fresh tomato","isHeader":false}
    ]
      expect(JSON.stringify(parseNotes("[ingredients] \n fresh tomato"))).equal(JSON.stringify(res))
    });

    it('two lines of note: non-header strings', () => {
      let res = [
        {"content":"onions","isHeader":false},
        {"content":"fresh tomato","isHeader":false}
    ]
      expect(JSON.stringify(parseNotes("onions \n fresh tomato"))).equal(JSON.stringify(res))
    });

    it('multiple new line chars', () => {
      let res = [
        {"content":"onions","isHeader":false},
        {"content":"","isHeader":false},
        {"content":"","isHeader":false},
        {"content":"","isHeader":false},
    ]
      expect(JSON.stringify(parseNotes("onions \n \n \n"))).equal(JSON.stringify(res))
    });

    it('chars seperated by new lines', () => {
      let res = [
        {"content":"s","isHeader":false},
        {"content":"a","isHeader":false},
        {"content":"d","isHeader":false},
    ]
      expect(JSON.stringify(parseNotes(" s \n a \n d "))).equal(JSON.stringify(res))
    });

    it('long sentences with int numbers', () => {
      let res = [
        {"content":"How to Cook Spaghetti Squash","isHeader":true},
        {"content":"Place the spaghetti squash cut side down on the baking sheet and use a fork to poke holes.","isHeader":false},
        {"content":"Roast for 30 to 40 minutes or until lightly browned on the outside","isHeader":false},
    ]
      expect(JSON.stringify(parseNotes(" [How to Cook Spaghetti Squash] \n Place the spaghetti squash cut side down on the baking sheet and use a fork to poke holes. \n Roast for 30 to 40 minutes or until lightly browned on the outside "))).equal(JSON.stringify(res))
    });

  });

  describe('edge cases', () => {

    it('empty string', () => {
      let res = [
        {
          "content": "",
          "isHeader": false
        },
      ]
      expect(JSON.stringify(parseNotes(""))).equal(JSON.stringify(res))
    });

    it('white spaces string', () => {
      let res = [
        {
          "content": "",
          "isHeader": false
        },
      ]
      expect(JSON.stringify(parseNotes("   "))).equal(JSON.stringify(res))
    });

    it('empty header string', () => {
      let res = [
        {
          "content": "",
          "isHeader": true
        },
      ]
      expect(JSON.stringify(parseNotes("[]"))).equal(JSON.stringify(res))
    });
  });
});

describe('getMeasurementsForIngredient', () => {
  describe('return recipe measurements', () => {

    it('one ingredient measurement', () => {
      let res = ["3/4 cup"]
      expect(JSON.stringify(getMeasurementsForIngredient("3/4 cup chocolate"))).equal(JSON.stringify(res))
    });

    it('multiple ingredient measurement only return the first', () => {
      let res = ["3/4 cup"]
      expect(JSON.stringify(getMeasurementsForIngredient("3/4 cup chocolate, ⅗ sugar"))).equal(JSON.stringify(res))
    });

    it('multiple ingredient measurement on two lines only return the first', () => {
      let res = ["3/4 cup"]
      expect(JSON.stringify(getMeasurementsForIngredient("3/4 cup chocolate \n ⅗ cup sugar"))).equal(JSON.stringify(res))
    });

    it('one charcode ingredient measurement', () => {
      let res = ["3/5 cup"]
      expect(JSON.stringify(getMeasurementsForIngredient("⅗ cup chocolate"))).equal(JSON.stringify(res))
    });

    it('one charcode ingredient measurement with g', () => {
      let res = ["3/5 g"]
      expect(JSON.stringify(getMeasurementsForIngredient("⅗ g chocolate"))).equal(JSON.stringify(res))
    });

    it('one charcode ingredient measurement with tablespoon', () => {
      let res = ["3/5 tablespoon"]
      expect(JSON.stringify(getMeasurementsForIngredient("⅗ tablespoon chocolate"))).equal(JSON.stringify(res))
    });

    it('one charcode ingredient measurement with unknown units of measurement', () => {
      let res = ["3/5"]
      expect(JSON.stringify(getMeasurementsForIngredient("⅗ ggn chocolate"))).equal(JSON.stringify(res))
    });
  });

  describe('edge cases', () => {

    it('empty string returns empty array', () => {
      expect(JSON.stringify(getMeasurementsForIngredient(""))).equal(JSON.stringify([]))
    });

    it('white spaces string returns empty array', () => {
      expect(JSON.stringify(getMeasurementsForIngredient("   "))).equal(JSON.stringify([]))
    });

    it('empty header string returns empty array', () => {
      expect(JSON.stringify(getMeasurementsForIngredient("[]"))).equal(JSON.stringify([]))
    });
  });
});


describe('getTitleForIngredient', () => {
  describe('return recipe title', () => {

    it('simple ingredient with measurement unit', () => {
      expect(getTitleForIngredient("3/4 cup chocolate")).equal("chocolate")
    });

    it('simple ingredient without measurement unit', () => {
      expect(getTitleForIngredient("3/4 butter")).equal("butter")
    });

    it('simple ingredient', () => {
      expect(getTitleForIngredient("steak")).equal("steak")
    });

    it('simple ingredient', () => {
      expect(JSON.stringify(getTitleForIngredient("steak"))).equal(JSON.stringify("steak"))
    });

    // fault
    it('ingredients in sentence', () => {
      expect(JSON.stringify(getTitleForIngredient("Place the steak flat in the skillet "))).equal(JSON.stringify("steak"))
    });

    it('simple ingredient with tablespoon', () => {
      expect(JSON.stringify(getTitleForIngredient("3/5 tablespoon flour"))).equal(JSON.stringify("flour"))
    });

    it('ingredients with white spaces', () => {
      expect(JSON.stringify(getTitleForIngredient("milk  "))).equal(JSON.stringify("milk"))
    });

    it('multiple ingredient titles', () => {
      expect(JSON.stringify(getTitleForIngredient("milk, sugar, water"))).equal(JSON.stringify("milk, sugar, water"))
    });
  });

  describe('edge cases', () => {

    it('empty string returns empty string', () => {
      expect(JSON.stringify(getTitleForIngredient(""))).equal(JSON.stringify(""))
    });

    it('white spaces string returns empty string', () => {
      expect(JSON.stringify(getTitleForIngredient("   "))).equal(JSON.stringify(""))
    });

    it('empty header string returns empty array string', () => {
      expect(JSON.stringify(getTitleForIngredient("[]"))).equal(JSON.stringify("[]"))
    });
  });
});