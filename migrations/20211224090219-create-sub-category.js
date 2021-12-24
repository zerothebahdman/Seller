module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("sub_categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable("sub_categories");
  },
};
