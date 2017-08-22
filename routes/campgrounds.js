var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


//INDEX --- Show all campgrounds
router.get("/", function(req, res){
  // try console.log(req.user);
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
    }
  });
});
//CREATE --- add new campground to database siempre se necesitan un post y un get
router.post("/", middleware.isLoggedIn ,function(req, res){
   //get data from form
   var name = req.body.name; //with body parser we can check the elements of the JSON request
   var image = req.body.image; //try console.log(req.body);
   var desc = req.body.description;
  //  author object
   var author = {
     id: req.user._id,
     username: req.user.username
   }
   var newCampground = {name: name, image: image, description: desc, author: author}; //Wae change the value of the var name to the new name for post
   // console.log(req.user);
   console.log(req.user);
   //Create new campground and save in the DB
   Campground.create(newCampground, function(err, newCampground){
     if (err) {
       console.log(err);
     } else {
      //  console.log(newCampground);
       res.redirect("/campgrounds");
     }
   })
});
//NEW show form to create new campground (one route to show form get, one route to create post)
router.get("/new", middleware.isLoggedIn ,function(req, res) {
   res.render("campgrounds/new");
});

//SHOW show info from an specific camp
router.get("/:id", function(req, res){
    //Find campground with id and pass the comments
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
             //logging all the comments with a campground
            console.log(foundCampground);
            //Render template from that specific campground
            res.render("campgrounds/show", { campground: foundCampground});
        }
    });

});

// EDIT campground route

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
      Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
      });
});
// UPDATE campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  // Find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if (err) {
      console.log(err);
    } else {
      // redirect to show page
      req.flash("success", "Campground updated")
      res.redirect("/campgrounds/"+ req.params.id);
    }
  });
});

// DESTROY campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds")
    }
  })
});

// MIDDLEWARE for campground



module.exports = router;
