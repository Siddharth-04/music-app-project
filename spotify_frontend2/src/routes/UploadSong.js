import { Icon } from "@iconify/react";
import React from "react";
import { useState } from "react";
import TextWithHover from "../components/shared/TextWithHover";
import spotify_logo from "../assets/images/newLogo3.jpg";
import IconText from "../components/shared/IconText";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import {makeAuthenticatedPOSTRequest} from "../utils/serverHelpers";
import {useNavigate} from "react-router-dom";
 

const UploadSong = ()=>{
   
    const [name,setName] = useState("");
    const[thumbnail,setThumbnail] = useState("");
    const[playlistUrl,setPlaylistUrl] = useState("");
    const[uploadedSongFileName,setUploadedSongFileName] = useState();
    const navigate = useNavigate();

    const submitSong = async () =>{
        const data = {name,thumbnail,track:playlistUrl}

        const response = await makeAuthenticatedPOSTRequest("/song/create",data);
        if (response.err) {
            alert("Could not create song");
            return;
        }
        alert("Success");
        navigate("/home");

    }

    return(
        <div className="h-full w-full flex">
            {/* This is left panel */}
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                
                <div>
                    {/* logo div */}
                    <div className="logoDiv p-6">
                        <img src={spotify_logo} alt="logo" width={130}/>
                    </div>
                        
                    <div className="py-6">
                        <IconText iconName={"material-symbols:home"} displayText={"Home"} active/>
                        <IconText iconName={"mingcute:search-fill"} displayText={"Search"} />
                        <IconText iconName={"fluent-mdl2:library"} displayText={"Library"} />
                        <IconText iconName={"tabler:music"} displayText={"My Music"} />
                    </div>

                    <div className="pt-6">
                        <IconText iconName={"ph:plus-fill"} displayText={"Create Playlist"} />
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
                            <TextWithHover displayText={"Upload Song"}/>

                            <div className="bg-white h-10 w-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                SS
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content p-8 pt-0 overflow-auto">
                    <div className="text-2xl font-seimibold mb-5 text-white">
                        Upload Your Music
                    </div>

                    <div className="w-full flex space-x-3">
                        <div className="w-1/2">
                            <TextInput label="Name" 
                                labelClassName={"text-white"}
                                placeholder="Name" 
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        
                        <div className="w-1/2">
                            <TextInput label="Thumbnail"
                                labelClassName={"text-white"} 
                                placeholder="Thumbnail"
                                value={thumbnail}
                                setValue={setThumbnail}
                            />
                        </div>

                        
                    </div>

                    <div className="py-5">
                        {uploadedSongFileName ? (
                                <div className="bg-white rounded-full p-3 w-1/3">
                                    {uploadedSongFileName.substring(0, 35)}...
                                </div>
                            ) : (
                                <CloudinaryUpload
                                    setUrl={setPlaylistUrl}
                                    setName={setUploadedSongFileName}
                                />
                            )}
                    </div>

                    <div
                        className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
                        onClick={submitSong}
                    >
                        Submit Song
                    </div>
                    
                </div>

            </div>
        </div>
    )
};




export default UploadSong;