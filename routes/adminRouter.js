const router = require("express").Router();
const adminCtrl = require("../controllers/adminCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/adminorder")
  .get(auth, authAdmin, adminCtrl.getOrders);
module.exports = router;
