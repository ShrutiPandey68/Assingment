import express from "express";
import {
  checkout,
  paymentVerification,
  userform
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

router.route("/userform").post(userform);

export default router;
