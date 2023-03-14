const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const { boolean } = require("joi");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "name is required"],
  },
  email: {
    type: String,
    // required: [true, "email is required"],
  },
  password: {
    type: String,
    // required: [true, "password is required"],
  },
  phoneNumber:{
    type:Number
  },
  googleId: String,

  secret: String,
  
  answer:{
    type:String,



// required:true,
  },
  access:{
    type:Boolean,
    default:true
    


// required:true,
  },
});



userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)



const userModel = mongoose.model("users", userSchema);


passport.use(userModel.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
  console.log("amal",user)
});
passport.deserializeUser(function(id, done) {
  userModel.find(function(err, user) {
    done(err, user);
    // console.log("amal",user)
  });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    userModel.findOrCreate({ googleId: profile.id, username: profile.id,name:profile.displayName,email:profile.id,Access:true}, function (err, user) {
      console.log("qwerty",profile.displayName)
      return cb(err, profile);
    });
  }

));

module.exports = userModel


