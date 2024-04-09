module.exports = (sequelize, DataTypes) => {
  const ServicePrice = sequelize.define("servicePrice", {
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Hourly", "Weekly", "Monthly"),
      allowNull: false,
    },
  });
  return ServicePrice;
};
