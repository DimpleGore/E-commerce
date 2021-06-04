const Users = require("../models/userModel");

const adminCtrl = {
  getOrders: async (req, res) => {
    try {
      const orders = await Users.findById(req.user.id)
      res.json(orders.order);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = adminCtrl;
