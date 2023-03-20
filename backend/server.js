const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");


const app = express();

//dotenv conig
dotenv.config();









app.use(session({
  secret: "Our little secret.",
  resave: false,

  saveUninitialized: false,
  cookie: { secure: false, sameSite: 'none' }

}));



const corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions));


////new 

app.use(passport.initialize());
app.use(passport.session());
// app.use(cookieParser());

///new

//mongodb connection
connectDB();

//rest obejct

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] },((err,data)=>{
    if(err){
      console.log(err)
    }
    console.log("anoop",data);
  }))
  );
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000");
  });

  app.get("/logout", function(req, res){
    res.redirect("http://localhost:3000/");
  });


app.use("/api/v1/user", require("./routes/userRoutes"));
// app.use("/api/v1/admin",require("./backend/routes/adminRoutes"))
app.use("/api/v1/admin", require("./routes/adminRoutes"));




//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
module.exports = app ;
