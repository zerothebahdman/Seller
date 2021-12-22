const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Reviews }) {
      // define association here
      User.hasMany(Reviews, { foreignKey: "userId", as: "reviews" }); // the second method as serves as an alias for the relationship. This is what will be used when calling the relationship
    }

    toJSON() {
      return { ...this.get(), id: undefined, password: undefined }; // this hides the id field when data is returned to the user
    }
  }
  User.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Opps!. Name must specified." },
          notEmpty: { msg: "Opps!. Name can't be empty." },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: "Opps!, You email type is invalid." },
          notNull: { msg: "Opps!, Email must specified." },
          notEmpty: { msg: "Opps!, Email can't be empty." },
          // unique: { msg: "Opps!, This email is already in use." },
        },
      },
      password: {
        type: DataTypes.STRING,
        // allowNull: false,
        // validate: {
        //   notNull: { msg: "Opps!. This is a required field." },
        //   notEmpty: { msg: "Opps!. This is a required field." },
        //   min: 5,
        // },
      },
      avatar: { type: DataTypes.STRING },
      phone_number: {
        type: DataTypes.STRING,
        // allowNull: false,
        // isNumber: true,
        // notNull: { msg: "Opps!. Phone Number must specified." },
        // notEmpty: { msg: "Opps!. Phone Number can't be empty." },
        // min: 10,
        // max: 11,
      },
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
