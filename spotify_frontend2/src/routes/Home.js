import { Icon } from "@iconify/react";
import React from "react";
import TextWithHover from "../components/shared/TextWithHover";
import spotify_logo from "../assets/images/newLogo3.jpg";
import IconText from "../components/shared/IconText";
import { Navigate, useNavigate } from "react-router-dom";
 
const focusCardsData = [
    {
        title: "Peaceful Piano",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const spotifyPlaylistsCardData = [
    {
        title: "This is one",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const Home = ()=>{

    const navigate = useNavigate();

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
                        <div className="w-3/5 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"}/>
                            <TextWithHover displayText={"Support"}/>
                            <TextWithHover displayText={"Download"}/>
                            <div className="h-1/2 border-r border-white"></div>
                        </div>
                        
                        

                        <div className="w-2/5 flex justify-around h-full items-center">
                            <TextWithHover displayText={"Sign up"}/>

                            <div className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer"
                            onClick={() => navigate("/login")}>
                                Log In
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content p-8 pt-0 overflow-auto">
                    <PlaylistView titleText="Focus" cardsData={focusCardsData}/>
                    <PlaylistView titleText="Spotify Playlist" cardsData={spotifyPlaylistsCardData} />
                    <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
                </div>

            </div>
        </div>
    )
};

const PlaylistView = ({titleText,cardsData}) =>{
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titleText}</div>
            <div className="w-full flex justify-between space-x-4">
                {
                    //cardsData ek array hoga
                    cardsData.map((item)=>{
                        return (
                            <Card 
                                title={item.title} 
                                description={item.description}
                                imgUrl={item.imgUrl}
                            />
                        );
                    })
                }

            </div>
        </div>
    );
};

const Card =({title,description,imgUrl}) =>{
    return (
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
            <div className="pb-4 pt-2">
                <img 
                    className="w-full rounded-md"
                    src={imgUrl}
                    alt="label"
                />
            </div>

            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-600 text-sm">{description}</div>
        </div>
    );
};

export default Home;