import React, {useEffect, useState} from 'react'
import apiClient from "../../spotify";
import "./library.css";
import {IconContext} from "react-icons";
import {AiFillPlayCircle, AiFillPlaySquare} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

export default function Library() {
    const [playlists, setPlaylists] = useState(null);
    useEffect(() => {
        apiClient.get("me/playlists").then(function(response)
        {
            setPlaylists(response.data.items);
            console.log(response.data.items);
        });
    }, []);

    const navigate = useNavigate();

    const playPlaylist = (id) =>
    {
        navigate("/player", {state: {id: id} });
    }
    return (
        <div className="screen-container">
            <div className="library-body">
                {playlists?.map((playlist) => (
                    <div className="playlist-card" key = {playlist.id} onClick={() => playPlaylist(playlist.id)}>
                        {playlist.images && playlist.images.length > 0 && playlist.images[0].url ? (
                            <img src={playlist.images[0].url} className="playlist-image" alt="Playlist Art"/>
                        ) : (
                            <img src="https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1" className="playlist-image" alt="Default Playlist Art"/>
                        )}
                        <p className="playlist-name">{playlist.name}</p>
                        <p className="playlist-total">{playlist.tracks.total} songs</p>
                        <div className="playlist-fade">
                            <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                                <AiFillPlayCircle />
                            </IconContext.Provider>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
