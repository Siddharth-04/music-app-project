import { Icon } from "@iconify/react";
import React, { Children, useContext, useLayoutEffect, useState,useRef } from "react";
import {Howl,Howler} from 'howler';
import TextWithHover from "../components/shared/TextWithHover";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import songContext from "../context/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";

const LoggedInContainer = ({children,currActive})=>{
    
    const[CreatePlaylistModalOpen,setCreatePlaylistModalOpen] = useState(false);

    const {currentSong,setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused} = useContext(songContext);

    const firsUpdate = useRef(true);

    useLayoutEffect(() =>{
        //if statement prevent from running on every render
        if(firsUpdate.current){
            firsUpdate.current = false;
            return ;
        }
        if(!currentSong){
            return;
        }
        console.log("here");
        changeSong(currentSong.track);

    },[currentSong && currentSong.track])

    const playSound =() =>{
        if (!soundPlayed){
            return;
        }

        soundPlayed.play();
    }

    const changeSong = (songSrc) => {
        if(soundPlayed){
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true
        });

        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    }

    const pausedSound = () =>{
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if(isPaused){
            playSound();
            setIsPaused(false);
        }
        
        else{
            pausedSound();
            setIsPaused(true);
        }
    }

    return(
        <div className="h-full w-full bg-app-black">
            {CreatePlaylistModalOpen && 
                <CreatePlaylistModal 
                    closeModal={()=>{
                        setCreatePlaylistModalOpen(false)
                    }}
                />
            }
            {/* This is left panel */}
            <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
                <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                    
                    <div>
                        {/* logo div */}
                        <div className="logoDiv p-6">
                            <img src={spotify_logo} alt="logo" width={130}/>
                        </div>
                            
                        <div className="py-6">
                            <IconText iconName={"material-symbols:home"} displayText={"Home"} active={currActive=="home"} targetLink={"/home"} />
                            <IconText iconName={"mingcute:search-fill"} displayText={"Search"}  active={currActive=="search"} targetLink={"/search"}/>
                            <IconText iconName={"fluent-mdl2:library"} displayText={"Library"} active={currActive=="library"} targetLink={"/library"}/>
                            <IconText iconName={"tabler:music"} displayText={"My Music"} active={currActive=="mymusic"} targetLink={"/mymusic"} />
                        </div>

                        <div className="pt-6">
                            <IconText iconName={"ph:plus-fill"} displayText={"Create Playlist"}  onClick={()=>{setCreatePlaylistModalOpen(true);}}/>
                            <IconText iconName={"ant-design:heart-twotone"} displayText={"Liked Songs"} />
                        </div>
                    </div>

                    <div className="px-5">
                        <div className="border border-gray-200 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                            <Icon icon="material-symbols:language"/>
                            <div className="ml-3 text-sm font-semibold">English</div>
                        </div>
                    </div>
                </div>
                
                {/* This is right panel -- main content */}
                <div className="h-full w-4/5 bg-app-black overflow-auto">
                    <div className="w-full h-1/10 bg-black bg-opacity-40 flex items-center justify-end">
                        <div className="w-1/2 h-full flex">
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText={"Premium"}/>
                                <TextWithHover displayText={"Support"}/>
                                <TextWithHover displayText={"Download"}/>
                                <div className="h-1/2 border-r border-white"></div>
                            </div>
                            
                            

                            <div className="w-1/3 flex justify-around h-full items-center">
                                <TextWithHover displayText={"Upload Song"}targetLink={"/uploadSong"}/>

                                <div className="bg-white h-10 w-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                    SS
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content p-8 pt-0 overflow-auto">
                        {children}
                    </div>

                </div>
            </div>

            {/* This is current playing song */}
            {
                currentSong &&

                <div className="h-1/10 w-full bg-black bg-opacity-30 text-white flex items-center px-4">
                    <div className="w-1/4 flex items-center">
                        <img 
                            src={currentSong.thumbnail} 
                            alt="curr song"
                            className="h-14 w-14 rounded"
                        />
                        <div className="pl-4">
                            <div className="text-sm hover:underline cursor-pointer">{currentSong.name}</div>
                            <div className="text-xs text-gray-500 hover:underline cursor-pointer">{currentSong.artist.firstname + " " + currentSong.artist.lastname}</div>
                        </div>
                    </div>

                    <div className="w-1/2 flex justify-center h-full flex-col items-center">
                        <div className="flex w-1/3 justify-between items-center">
                            {/* Controls of curr song*/}
                            <Icon icon="mi:shuffle" fontSize={30} className="cursor-pointer"/>

                            <Icon icon="fluent:previous-20-filled" fontSize={30} className="cursor-pointer"/>

                            <Icon 
                                icon={isPaused ?"ph:play-fill" :"zondicons:pause-solid"}
                                fontSize={50} 
                                className="cursor-pointer"
                                onClick={togglePlayPause}
                            />

                            <Icon icon="fluent:next-24-filled" fontSize={30} className="cursor-pointer"/>
                            <Icon icon="ph:repeat-bold" fontSize={30} className="cursor-pointer"/>
                        </div>
                        {/* <div>Progress bar</div> */}
                    </div>
                    
                    <div className="w-1/4 flex justify-end"></div>
                </div>
            }
            
        </div>
    );
};





export default LoggedInContainer;