'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealPlanItem = sequelize.define('MealPlanItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: DataTypes.STRING,
    scheduled: DataTypes.DATE,
    meal: DataTypes.STRING
  }, {});
  MealPlanItem.associate = function(models) {
    MealPlanItem.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    MealPlanItem.hasOne(models.ShoppingListItem, {
      foreignKey: 'mealPlanItemId'
    });

    MealPlanItem.belongsTo(models.MealPlan, {
      foreignKey: 'mealPlanId',
      onDelete: 'CASCADE',
    });

    MealPlanItem.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };
  return MealPlanItem;
};