const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/infor", auth, userCtrl.getUser);
router.get("/refresh_token", userCtrl.refreshToken);
router.put("/addAddress/:id", auth, userCtrl.addAddress);
router.put("/addCart", auth, userCtrl.addCart);
router.get("/myOrder", auth, userCtrl.myOrder);

module.exports = router;
