require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
var request = require("request");
const Users = require("../models/userModel");

const paymentCtrl = {
  createOrder: async (req, res) => {
    try {
      var amount = req.body.price;
      
      
      
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });

      const options = {
        amount: amount * 100, // amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order_74394",
      };

      const order = await instance.orders.create(options);
    

      if (!order) return res.status(500).send("Some error occured");

      res.json(order);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  verification: async (req, res) => {
    try {
      // getting the details back from our font-end
      const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
      } = req.body;
      
      

      // Creating our own digest
      // The format should be like this:
      // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
      const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
      console.log(shasum);

      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

      const digest = shasum.digest("hex");
      console.log(digest);
      // generated_signature = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, process.env.RAZORPAY_SECRET)

      // comaparing our digest with the actual signature
      if (digest !== razorpaySignature) {
        console.log(false);
        return res.status(400).json({ msg: "Transaction not legit!" });
      } else {
        console.log(true);
      }
      // THE PAYMENT IS LEGIT & VERIFIED
      // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

      /* if (generated_signature == razorpaySignature) {
                console.log('payment is successfull')}*/

      res.json({
        msg: "payment is successfull",
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  capture: async (req, res) => {
    const {
      cart,
      amount,
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    

    request(
      {
        method: "POST",
        url: `https://${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_SECRET}@api.razorpay.com/v1/payments/${razorpayPaymentId}/capture`,
        form: { amount: amount, currency: "INR" },
      },
      async function (error, response, body) {
        console.log("Status:", response.statusCode);
        console.log("Headers:", response.headers);
        console.log("Response:", JSON.parse(body));
        const user = await Users.findById(req.user.id);
        const admin = await Users.findOne({ role: 1 });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        
        const order = [...user.order];
        const adorder = [...admin.order];
        const neworder = {
          header: response.headers,
          payment: JSON.parse(body),
          cart: cart,
        };
        
        order.unshift(neworder);
        adorder.unshift(neworder);
        user.order = order;
        admin.order = adorder;
        await user.save();
        await admin.save();

        
        
        
        
        res.json({ msg: " cart added" });
      }
    );
  },

 /* webhook: async (req, res) => {
    console.log("web");
    console.log(req.body);

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    const webhook_payload = req.body;
    console.log(req.body.payload);
    const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
    const webhookDigest = hmac
      .update(JSON.stringify(webhook_payload))
      .digest("hex");

    //const computedSignature = `sha1=${webhookDigest}`
    const requestSignature = req.headers["x-razorpay-signature"];

    if (webhookDigest !== requestSignature) {
      console.log(
        `[Optimizely] Signatures did not match! Do not trust webhook request")`
      );
      res.status(500);
      return;
    }

    console.log(`
          [Optimizely] Optimizely webhook request received!
          Signatures match! Webhook verified as coming from Optimizely
          Download Optimizely datafile and re-instantiate the SDK Client
          For the latest changes to take affect
        `);
    res.sendStatus(200);
  },*/
};

module.exports = paymentCtrl;
