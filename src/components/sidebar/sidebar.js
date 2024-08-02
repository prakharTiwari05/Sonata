import React, {useState, useEffect} from 'react'
import './sidebar.css'
import SidebarButton from "./sidebarButton";
import {MdFavorite, MdOutlineLibraryMusic, MdQuestionMark, MdSpaceDashboard} from "react-icons/md";
import {FaGripfire, FaPlay, FaSignOutAlt} from "react-icons/fa";
import {IoLibrary} from "react-icons/io5";
import apiClient from "../../spotify";
export default function Sidebar() {
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg");
    useEffect(() => {
        apiClient.get("me").then((response) => {
            setImage(response.data.images[0].url);
        });
    }, []);

    return (
        <div className="sidebar-container">
            <img src={image} className="profile-image" alt = "profile"/>
            <div>
                <SidebarButton title = "Guess" to="/guess" icon={<MdOutlineLibraryMusic/>}/>
                <SidebarButton title = "Trending" to="/trending" icon={<FaGripfire/>}/>
                <SidebarButton title = "Player" to="/player" icon={<FaPlay/>}/>
                <SidebarButton title = "Favorites" to="/favorites" icon={<MdFavorite/>}/>
                <SidebarButton title = "Library" to="/" icon={<IoLibrary/>}/>
            </div>
            <SidebarButton title = "Sign Out" to="" icon={<FaSignOutAlt/>}/>
        </div>


    )
}
