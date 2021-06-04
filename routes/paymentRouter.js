const paymentCtrl = require("../controllers/paymentCtrl");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/orders", paymentCtrl.createOrder);
router.post("/verification", paymentCtrl.verification);
router.post("/capture", auth, paymentCtrl.capture);

module.exports = router;
