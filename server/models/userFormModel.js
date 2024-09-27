import mongoose from "mongoose";

const userFormSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  post: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  gstNumber: { type: String, required: true },
  organizationName: { type: String, required: true },
  adharNumber: { type: String, required: true },
  file: { type: String, required: true },
  picture: { type: String, required: true },
});


export const User = mongoose.model("User", userFormSchema);