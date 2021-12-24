const { Model } = require("sequelize");
const slugify = require("slugify");

module.exports = (sequelize, DataTypes) => {
  class ads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Admin, Category, SubCategory }) {
      this.belongsTo(Category, { as: "Category" });
      this.belongsTo(SubCategory, { as: "subCategory" });
      this.belongsTo(Admin, { as: "admin" });
    }
  }
  ads.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: "admin",
        referencesKey: "id",
      },
      adminUuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: `Opps!, you have to specify a name` },
          notNull: { msg: `Opps!, name cant be null` },
        },
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { notEmpty: { msg: `Opps!, Slug cannot be empty` } },
        set(value) {
          const slug = slugify(value, {
            lower: true,
            replacement: "-",
            trim: true,
            strict: true,
          });
          this.setDataValue("slug", slug);
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: "category",
        referencesKey: "id",
      },
      subCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: "sub_category",
        referencesKey: "id",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: { msg: `Opps!, quantity cannot be empty` } },
      },
      selling_price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        validate: { notEmpty: { msg: `Opps!, you have to specify a price` } },
      },
      discount_price: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
      product_condition: {
        type: DataTypes.ENUM("Brand New", "Used"),
        allowNull: false,
      },
      color: { type: DataTypes.STRING, allowNull: true },
      size: { type: DataTypes.STRING, allowNull: true },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: `Opps!, description cannot be empty` } },
      },
      specification: { type: DataTypes.STRING, allowNull: true },
      hot_new: { type: DataTypes.STRING, allowNull: true },
      trending: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.STRING, allowNull: true },
      promote_ad_weekly: { type: DataTypes.STRING, allowNull: true },
      promote_ad_monthly: { type: DataTypes.STRING, allowNull: true },
      ad_first_image: { type: DataTypes.STRING, allowNull: false },
      ad_second_image: { type: DataTypes.STRING, allowNull: true },
      ad_third_image: { type: DataTypes.STRING, allowNull: true },
      ad_fourth_image: { type: DataTypes.STRING, allowNull: true },
      public_first_image_id: { type: DataTypes.STRING, allowNull: true },
      public_second_image_id: { type: DataTypes.STRING, allowNull: true },
      public_third_image_id: { type: DataTypes.STRING, allowNull: true },
      public_fourth_image_id: { type: DataTypes.STRING, allowNull: true },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "Ads",
      tabelName: "ads",
    }
  );
  return ads;
};
