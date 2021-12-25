const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Ads }) {
      this.hasMany(Ads, {
        as: "ads",
        hooks: true,
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined, password: undefined };
    }
  }
  admin.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: `Opps!, please specify an email address` },
          isEmail: { msg: `Opps!, please enter a valid email address` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Opps!. This is a required field." },
          notEmpty: { msg: "Opps!. This is a required field." },
          min: 5,
        },
      },
      password_updated_at: DataTypes.STRING,
      shop_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: `Opps!, please specify a shop name` } },
      },
      email_verifed_at: DataTypes.DATE,
      role: { type: DataTypes.ENUM("admin", "vendor"), defaultValue: "vendor" },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: { msg: `Opps!, please specify a valid phone number` },
          notEmpty: { msg: `Opps!, please a phone number` },
        },
        avatar: { type: DataTypes.STRING, allowNull: true },
        location: { type: DataTypes.STRING, allowNull: true },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Admin",
      tableName: "admins",
    }
  );
  return admin;
};
