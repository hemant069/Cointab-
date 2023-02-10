const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  client = await mongoose.connect(process.env.MONGO_PATH);
  return client;
};

module.exports = connect;
