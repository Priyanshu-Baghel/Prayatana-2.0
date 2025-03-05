const express = require("express");
const paymentController = require("../../controller/payment/paymentController");
const router = express.Router();

router.route("/payment").post(paymentController.payment);
router.route('/pricing').get(paymentController.pricing);

module.exports = router;