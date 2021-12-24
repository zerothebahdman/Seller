const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class subCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Ads }) {
      this.belongsTo(Category, { as: "category" });
      this.hasMany(Ads, {
        as: "ads",
        hooks: true,
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  subCategory.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: DataTypes.STRING,
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "SubCategory",
      tableName: "subCategory",
    }
  );
  return subCategory;
};
