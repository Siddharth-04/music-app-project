const express = require("express");
const app = express();
const passport = require("passport");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
require("dotenv").config();
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("./models/User");
const mongoose = require("mongoose");
const PlaylistModel = require("./models/Playlist");
const cors = require("cors");
const port=8000;
app.use(cors());
app.use(express.json());

//takes 2 args..1.which db(db url)
mongoose.connect("mongodb+srv://xyzABC123:"+process.env.MONGO_PASSWORD+"@cluster0.m4mb3vz.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}
).then((x)=>{
    console.log("Connected to Mongo!");
}).catch((err)=>{
    console.log("Error while connecting to Mongo!")
});

//setup passport jwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.identifier}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);

app.listen(port,()=>{
    console.log("App is running in port + "+ port);
});