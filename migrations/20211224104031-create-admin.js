module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("admins", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      shop_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_verifed_at: DataTypes.DATE,
      admin: { type: DataTypes.BOOLEAN, allowNull: true },
      vendor: { type: DataTypes.BOOLEAN, allowNull: true },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        avatar: { type: DataTypes.STRING, allowNull: true },
        location: { type: DataTypes.STRING, allowNull: true },
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
    await queryInterface.dropTable("admins");
  },
};
