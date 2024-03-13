const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");
const router = express.Router();
const User = require("../models/User");
const Song = require("../models/Song");

//create playlist

router.post("/create",
    passport.authenticate("jwt",{session:false}),
    async(req,res)=>{
        const currentUser = req.user;
        const {name,thumbnail,songs} = req.body;

        if(!name || !thumbnail || !songs){
            return res.status(301).json({err:"Insufficient data"});
        }
        const playlistData = {
            name,
            thumbnail,
            songs,
            owner : currentUser._id,
            collaborators:[],
        };

        const playlist = await Playlist.create(playlistData);
        return res.status(200).json(playlist);
    }
);

//get a playlist by id
//we will get playlist id as a route parameter 

router.get(
    "/get/playlist/:playlistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        // This concept is called req.params
        const playlistId = req.params.playlistId;
        // I need to find a playlist with the _id = playlistId
        const playlist = await Playlist.findOne({_id: playlistId});
        if (!playlist) {
            return res.status(301).json({err: "Invalid ID"});
        }
        return res.status(200).json(playlist);
    }
);

//get playlist made by me
router.get(
    "/get/me",
    passport.authenticate("jwt",{session:false}),
    async(req,res)=>{
        const artistId = req.user._id;

        const playlists = await Playlist.find({owner:artistId}).populate("owner");
        return res.status(200).json({data:playlists});
    }
);

//get all playlist by an artist
router.get(
    "/get/artist/:artistId",
    passport.authenticate("jwt",{session:false}),
    async(req,res)=>{
        const artistId = req.params.artistId;

        //check if given id exist
        const artist = await User.findOne({_id:artistId});
        
        if(!artist ){
            return res.status(304).json({err:"Invalid Artist ID"});
        }

        const playlists = await Playlist.find({owner:artistId})
        return res.status(200).json({data:playlists});
    }
);

//Add a song to a playlist
router.post(
    "/add/song",
    passport.authenticate("jwt",{session:false}),
    async(req,res)=>{
        const currentUser = req.user;
        const {playlistId,songId} = req.body;

        //get playlist if valid
        const playlist = await Playlist.findOne({_id:playlistId});

        if(!playlist){
            return res.status(304).json({err:"Playlist does not exist"});
        }

        //step 1:check if user owns a playlist or is a collaborator
        if(!playlist.owner.equals(currentUser._id) &&
        !playlist.collaborators.includes(currentUser._id)
        )
        {
            return res.status(400).json({err:"Not allowed"});
        }

        //check if song is a valid song
        const song = await Song.findOne({_id: songId});
        if(!song){
            return res.status(304).json({err: "Song does not exist"});
        }

        //we can now simply add song to playlist
        playlist.songs.push(songId);
        await playlist.save();

        return res.status(200).json(playlist);
    }
);


module.exports = router;