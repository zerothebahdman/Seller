const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SubCategory, Ads }) {
      this.hasMany(SubCategory, {
        as: "subCategory",
        hooks: true,
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      this.hasMany(Ads, {
        as: "ads",
        hooks: true,
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  category.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
      tabelName: "category",
    }
  );
  return category;
};
