import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import { User}  from "../models/userFormModel.js";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

export const userform = async (req, res) => {
  try {
    const {
      name,
      surname,
      post,
      mobileNumber,
      gstNumber,
      organizationName,
      adharNumber,
      file,
      picture
    } = req.body;

    // Create a new user object with the submitted data
    const user = new User({
      name,
      surname,
      post,
      mobileNumber,
      gstNumber,
      organizationName,
      adharNumber,
      file,
      picture
    });

    // Save the user object to the database
    const savedUser = await user.save();

    res.status(201).json({ message: 'User submitted successfully', user: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error submitting user' });
  }
};



