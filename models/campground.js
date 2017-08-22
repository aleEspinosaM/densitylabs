var mongoose = require("mongoose");


//Schema set up
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  //Embedded data from user to relation user with new campground
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    username: String
  },
  //Embedded data from Comment model by id
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment"
    }
  ]
});

//Create the model of DB and we export it to use it on app.js
module.exports = mongoose.model("campground", campgroundSchema);
