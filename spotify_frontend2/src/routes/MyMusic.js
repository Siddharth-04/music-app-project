import React from "react";
import { useState,useEffect } from "react";
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";
import LoggedInContainer from "../containers/LoggedInContainer";
import "../styles/mymusic.css";


const MyMusic =() =>{
    const shimmerCount = 7;
    const [isLoading,setLoading] = useState(true);
    const [songData,setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/song/get/mysongs"
            );
            setSongData(response.data);
            setLoading(false);
            console.log(response);
        };
        getData();
    }, []);

    return(
        <LoggedInContainer currActiveScreen="mymusic">
        <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
            Songs
        </div>
        {isLoading ? (
            <>
                {Array.from({ length: shimmerCount }).map((_, index) => (
                    <div className='flex song-card-container'>
                        <div className='flex song-card-container-left'>
                            <div className='song-image-container shimmer'></div>
                            <div className='song-details-container'>
                                <div className='song-details-name shimmer'></div>
                                <div className='song-details-artist shimmer'></div>
                            </div>
                        </div>
                        <div className='song-card-container-right'>
                            <div className='song-duration-container shimmer'></div>
                        </div>
                    </div>
                ))}
            </>
        ) : (
            <>
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
            </>
        )}
    </LoggedInContainer>
    )
}

export default MyMusic;