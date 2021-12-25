const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Product }) {
      this.belongsTo(Category, {
        as: "category",
      });
      this.hasMany(Product, {
        as: "product",
        hooks: true,
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  subcategory.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: DataTypes.STRING,
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "SubCategory",
      tableName: "subcategories",
    }
  );
  return subcategory;
};
