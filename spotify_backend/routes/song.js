const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

router.post("/create",
    passport.authenticate("jwt",{session:false}),
    async (req,res)=>{

        const{name,thumbnail,track}=req.body;

        if(!name || !thumbnail || !track)
        {
            return res.status(301).json({err:"Insuffiient details to create a song"});
        }
        const artist = req.user._id;
        const songDetails = {name,thumbnail,track,artist};
        const createdSong = await Song.create(songDetails);
        return res.status(200).json(createdSong);
});

//get song i have published.
router.get(
    "/get/mysongs",
    passport.authenticate("jwt",{session : false}),
    async (req,res)=>{
        //we need to get all songs where artist id == current user id
        const songs = await Song.find({artist:req.user._id}).populate("artist");
        return res.status(200).json({data:songs});
    }
);

//get songs of an artist
router.get(
    "/get/artist/:artistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const {artistId} = req.params;
        // We can check if the artist does not exist
        const artist = await User.findOne({_id: artistId});
        // ![] = false
        // !null = true
        // !undefined = true
        if (!artist) {
            return res.status(301).json({err: "Artist does not exist"});
        }

        const songs = await Song.find({artist: artistId});
        return res.status(200).json({data: songs});
    }
);

//get single song by name
router.get("/get/songname/:songName",
    passport.authenticate("jwt",{session:false}),
    async(req,res)=>{
        const {songName} = req.params;

        const songs = await Song.find({name:songName}).populate("artist");
        return res
        .status(200)
        .json({data:songs});
});


module.exports = router;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiNjU2MmVjZDRlMjg3MjIzOWZiMzM4YTUyIiwiaWF0IjoxNzAwOTgxOTczfQ.pupQxicqp1T63lvis6kM0qBmQ74ZzQIXs5YucqxIgUE