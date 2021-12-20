"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("users", {
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
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING },
      avatar: { type: DataTypes.STRING },
      phone_number: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      email_verifed_at: { type: DataTypes.DATE },
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
    await queryInterface.dropTable("users");
  },
};
