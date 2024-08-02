import React, {useEffect, useState} from 'react'
import apiClient from "../../spotify";
import "./guess.css"

import {useNavigate} from "react-router-dom";

export default function Guess() {
    const [playlists, setPlaylists] = useState(null);
    useEffect(() => {
        apiClient.get("me/playlists").then(function(response)
        {
            setPlaylists(response.data.items);

        });
    }, []);

    const navi = useNavigate();
    const chosenPlaylist = (id) =>
    {
        navi("/guessGame", {state: {id: id} });
    }
    return (
        <div className="screen-container">
            <div className="library-body">
                <h1 className = "choosePlaylist"> Choose a playlist to begin guessing!</h1>
                {playlists?.map((playlist) => (
                    <div className="playlist-card" key={playlist.id} onClick={() => chosenPlaylist(playlist.id)}>
                        {playlist.images && playlist.images.length > 0 && playlist.images[0].url ? (
                            <img src={playlist.images[0].url} className="playlist-image" alt="Playlist Art"/>) : (<img
                                src="https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1"
                                className="playlist-image" alt="Default Playlist Art"/>)}
                        <p className="playlist-name">{playlist.name}</p>
                        <p className="playlist-total">{playlist.tracks.total} songs</p>
                        <div className="playlist-fade">
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
