const ServicePrice = require("./servicePrice");

module.exports = (sequelize, DataTypes) => {
  let Service = sequelize.define("services", {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ServiceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type: {
      type: DataTypes.ENUM("Normal", "VIP"),
      allowNull: false,
      defaultValue: "Normal",
    },
  });
  Service.hasMany(ServicePrice(sequelize, DataTypes), {
    as: "prices",
    foreignKey: "ServiceId",
  });
  return Service;
};
