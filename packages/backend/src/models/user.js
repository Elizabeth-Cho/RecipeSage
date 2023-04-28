const crypto = require('crypto');

('use strict');

module.exports = (sequelize, DataTypes) => {
  let currentPasswordVersion = 2;

  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.TEXT,
      handle: DataTypes.STRING,
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      passwordHash: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      passwordSalt: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      passwordVersion: {
        type: DataTypes.INTEGER,
        defaultValue: currentPasswordVersion,
        allowNull: false,
      },
      lastLogin: DataTypes.DATE,
      stripeCustomerId: {
        type: DataTypes.STRING,
        unique: true,
      },
      enableProfile: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Session, {
      foreignKey: 'userId',
    });

    User.belongsToMany(models.Image, {
      foreignKey: 'userId',
      otherKey: 'imageId',
      as: 'profileImages',
      through: models.User_Profile_Image,
    });

    User.hasMany(models.FCMToken, {
      foreignKey: 'userId',
      as: 'fcmTokens',
    });

    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
    });

    User.hasMany(models.Label, {
      foreignKey: 'userId',
    });

    User.hasMany(models.Message, {
      foreignKey: 'toUserId',
      as: 'receivedMessages',
    });

    User.hasMany(models.Message, {
      foreignKey: 'fromUserId',
      as: 'sentMessages',
    });

    User.hasMany(models.ShoppingList, {
      foreignKey: 'userId',
      as: 'ownedShoppingLists',
    });

    User.belongsToMany(models.ShoppingList, {
      foreignKey: 'userId',
      otherKey: 'shoppingListId',
      as: 'collaboratingShoppingLists',
      through: 'ShoppingList_Collaborator',
    });

    User.hasMany(models.ShoppingListItem, {
      foreignKey: 'userId',
      as: 'shoppingListItems',
    });

    User.hasMany(models.MealPlan, {
      foreignKey: 'userId',
      as: 'mealPlans',
    });

    User.belongsToMany(models.MealPlan, {
      foreignKey: 'userId',
      otherKey: 'mealPlanId',
      as: 'collaboratingMealPlans',
      through: 'MealPlan_Collaborator',
    });

    User.hasMany(models.StripePayment, {
      foreignKey: 'userId',
    });

    User.hasMany(models.UserSubscription, {
      foreignKey: 'userId',
    });
  };

  User.validateHashedPassword = function (password, hash, salt, version) {
    switch (version) {
      case 1:
      case '1':
        return hash == crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
      case 2:
      case '2':
        return (
          hash ==
          crypto
            .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
            .toString('base64')
        );
    }

    return false;
  };

  return User;
};