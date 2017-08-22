//Initialize the app with express
// Here we start the app after npm init, npm install express ejs --save
var express      = require("express"),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    //require all the package for user Auth
    passport     = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash        = require("connect-flash"),
    //we require the model
    Campground   = require("./models/campground"),
    //We require the Comment models
    Comment      = require("./models/comment"),
    //we require the User model
    User         = require("./models/user"),
    //Use seed file for removing and adding to DB
    seedDb       = require("./seed"),
    app          = express();

// EXPRESS ROUTES MODULES

var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    authRoutes        = require("./routes/index");


//Set te engine to work with ejs files
app.set("view engine", "ejs");

//this line we always use it for body parser
app.use(bodyParser.urlencoded({extended: true}));

//Connect mongoose to data base
mongoose.connect("mongodb://localhost/yelp_camp");

//serve all the public files
app.use(express.static(__dirname + "/public"));
//Start seedDb function
// seedDb();

// ===============
// PASSPORT CONFIG
// ===============

// express-session
app.use(require("express-session")({
  secret: "this is my user secret",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
// flash notice
app.use(flash());

// sendin LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Current user middleware
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
// METHOD override
app.use(methodOverride('_method'))




// tell express to use the routes
app.use(authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
//http://localhost:3000/
app.listen(3000,function(){
  console.log("The YelpCamp has started");
  console.log("listening on port 3000");
});
