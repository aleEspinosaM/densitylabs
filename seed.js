var mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment");


var data = [
        {
            name: "Sayulita Beach",
            image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae cursus felis, et aliquet mauris. Nam quis risus vitae mi venenatis tincidunt."

        },
        {
            name: "San Pancho Beach",
            image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae cursus felis, et aliquet mauris. Nam quis risus vitae mi venenatis tincidunt."

        },
        {
            name: "Gorriones Pancho Beach",
            image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae cursus felis, et aliquet mauris. Nam quis risus vitae mi venenatis tincidunt."

        }

    ];

function seedDb(){
  //Remove all campground
  Campground.remove({},function(err){
      if(err){
        console.log(err);
      }
        console.log("Removed all campground");
        //Loop data array
        data.forEach(function(seed){
          Campground.create(seed,function(err,campground){
              if (err) {
                  console.log(err);
              } else {
                  console.log("Added campground");
                  //ADD a coment to each campground
                  Comment.create(
                      {
                          text: "bla bla bla muy feo",
                          author: "yoloman123"
                      }, function(err,comment){
                      if (err) {
                          console.log(err);
                      } else {
                          campground.comments.push(comment);
                          campground.save();
                          console.log("new comment added")
                      }
                  })
              }
          })
       });
    });




}

module.exports = seedDb;
