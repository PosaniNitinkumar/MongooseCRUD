const mongoose = require("mongoose");

const Userlist = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("usesr", Userlist);
