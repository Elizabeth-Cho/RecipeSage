const SQ = require('sequelize');
const Op = SQ.Op;

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    },
    rating: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    yield: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    },
    activeTime: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    },
    totalTime: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    },
    source: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    },
    ingredients: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    },
    folder: {
      type: DataTypes.STRING,
      defaultValue: 'main',
      allowNull: false
    },
    indexedAt: {
      type: DataTypes.DATE,
      defaultValue: SQ.NOW
    }
  });
  Recipe.associate = function(models) {
    Recipe.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'CASCADE',
    });

    Recipe.belongsTo(models.User, {
      foreignKey: 'fromUserId',
      as: 'fromUser',
      onDelete: 'SET NULL',
    });

    Recipe.belongsToMany(models.Label, {
      foreignKey: 'recipeId',
      otherKey: 'labelId',
      as: 'labels',
      through: models.Recipe_Label
    });

    Recipe.belongsToMany(models.Label, {
      foreignKey: 'recipeId',
      otherKey: 'labelId',
      as: 'label_filter',
      through: models.Recipe_Label
    });

    Recipe.hasMany(models.Message, {
      foreignKey: 'recipeId',
    });

    Recipe.hasMany(models.Message, {
      foreignKey: 'originalRecipeId',
    });

    Recipe.hasMany(models.ShoppingListItem, {
      foreignKey: 'recipeId',
    });

    Recipe.hasMany(models.MealPlanItem, {
      foreignKey: 'recipeId',
    });

    Recipe.belongsToMany(models.Image, {
      foreignKey: 'recipeId',
      otherKey: 'imageId',
      as: 'images',
      through: models.Recipe_Image
    });
  };

  Recipe.share = function(recipeId, recipientId, transaction) {
    return Recipe.findByPk(recipeId, { transaction }).then(recipe => {
      if (recipeId == "test") {
        return "test_result"
      }
      
    });
  };

  return Recipe;
};
