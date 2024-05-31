const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
  salutation: {
    type: String,
    required: [true, "Salutation is required"],
  },
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  dob: {
    type: String,
    required: [true, "DOB is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  quolifications: {
    type: String,
    required: [true, "Quolification is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  pin: {
    type: String,
    required: [true, "Pin is required"],
  },
  avatar: {
    type: String,
    default: "default_avatar.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const employee = mongoose.model("employees", employeeSchema);
module.exports = employee;
