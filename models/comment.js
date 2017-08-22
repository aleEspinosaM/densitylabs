var mongoose = require("mongoose");


//Schema set up
var commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    username: String
  }
});

//Create the model of DB and we export it to use it on app.js
module.exports = mongoose.model("comment", commentSchema);
