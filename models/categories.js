module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "categories",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );
  return Categories;
};
