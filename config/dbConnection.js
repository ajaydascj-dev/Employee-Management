const mongoose = require("mongoose");

const connectUserDb1 = async () => {
  try {
    const connect = await mongoose.connect(process.env.USER_CONNECTION_STRING);
    console.log("User Database is connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectUserDb1 };
