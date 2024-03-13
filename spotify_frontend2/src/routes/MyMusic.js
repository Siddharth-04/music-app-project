import { Icon } from "@iconify/react";
import React from "react";
import {Howl,Howler} from 'howler';
import { useState,useEffect } from "react";
import TextWithHover from "../components/shared/TextWithHover";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";
import {useNavigate} from "react-router-dom";
import SingleSongCard from "../components/shared/SingleSongCard";
import LoggedInContainer from "../containers/LoggedInContainer";


const MyMusic =() =>{
    const [songData,setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/song/get/mysongs"
            );
            setSongData(response.data);
            console.log(response);
        };
        getData();
    }, []);

    return(
        <LoggedInContainer currActive="mymusic">
            <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
                My Songs
            </div>
            <div className="space-y-3 overflow-auto ">
                {songData.map((item)=>{
                return( 
                    <SingleSongCard 
                        info={item}
                        playSound={()=>{}}
                    />
                );
            })}
            </div>
        </LoggedInContainer>
    )
}

export default MyMusic;