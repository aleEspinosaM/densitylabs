var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});


// para poder utilizar local mongoose y todos sus metodos
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);
