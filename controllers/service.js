const { services } = require("../models");

module.exports = {
  addService: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { name, type: Type } = req.body;
      const service = await services.create({
        ServiceName: name,
        Type,
        categoryId,
      });
      res.status(201).json(service);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getAllServices: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const service = await services.findAll({ where: { categoryId } });
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  removeService: async (req, res) => {
    try {
      const { categoryId, serviceId } = req.params;
      await services.destroy({ where: { id: serviceId, categoryId } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateService: async (req, res) => {
    try {
      const { categoryId, serviceId } = req.params;
      const { name, price } = req.body;
      const service = await services.findOne({
        where: { id: serviceId, categoryId },
      });
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      service.name = name;
      service.price = price;
      await service.save();
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
