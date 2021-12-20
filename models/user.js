const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Review }) {
      // define association here
      this.hasMany(Review, { foreignKey: "userId" });
    }

    toJSON() {
      return { ...this.get(), id: undefined }; // this hides the id field when data is returned to the user
    }
  }
  User.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING },
      avatar: { type: DataTypes.STRING },
      phone_number: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      email_verifed_at: { type: DataTypes.DATE },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users", // this overides the model name and gives a table name
    }
  );
  return User;
};
