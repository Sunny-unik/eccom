const Service = require("../models/services");

module.exports = {
  addService: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { name, price } = req.body;
      const service = await Service.create({ name, price, categoryId });
      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllServices: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const services = await Service.findAll({ where: { categoryId } });
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  removeService: async (req, res) => {
    try {
      const { categoryId, serviceId } = req.params;
      await Service.destroy({ where: { id: serviceId, categoryId } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateService: async (req, res) => {
    try {
      const { categoryId, serviceId } = req.params;
      const { name, price } = req.body;
      const service = await Service.findOne({
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
