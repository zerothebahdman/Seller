module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "admins", // Name of the created table
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      adminUuid: { type: DataTypes.STRING, allowNull: false },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories", // Name of the created table
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      subcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "subcategories", // Name of the created table
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      selling_price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("products");
  },
};
