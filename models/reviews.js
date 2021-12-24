const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: "userId",
        as: "users",
        hooks: true,
        onDelete: "cascade",
        onUpdate: "cascade",
      }); // the second method as serves as an alias for the relationship. This is what will be used when calling the relationship
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined }; // this hides the id and userId field when data is returned to the user
    }
  }
  Reviews.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      review: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      // if the model name and the table name is not the same always specify the the table name object.
      modelName: "Reviews",
      tableName: "reviews", // this overides the model name and gives a table name
    }
  );
  return Reviews;
};
