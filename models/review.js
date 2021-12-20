"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // Both the hasOne and belongsTo calls will infer that the foreign key to be created should be called fooId. To use a different name you will have to specify an object { foreignKey: "userId" } as second arguement
      this.belongsTo(User, { foreignKey: "userId" });
    }
  }
  reviews.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "reviews",
    }
  );
  return reviews;
};
