module.exports = async (sequelize, DataTypes) => {
  const Categories = sequelize.define("categories", {
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
  });
  return Categories;
};
