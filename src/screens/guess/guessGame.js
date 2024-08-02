import React, { useEffect, useRef, useState } from 'react';
import "./guessGame.css";
import { useLocation } from 'react-router-dom';
import apiClient from '../../spotify';


export default function GuessGame() {
    const location = useLocation();
    const [tracks, setTracks] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [songName, setSongName] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (location.state) {
            apiClient
                .get("playlists/" + location.state.id + "/tracks")
                .then((res) => {
                    const fetchedTracks = res.data.items.map(item => item.track);
                    setTracks(fetchedTracks);
                });
        }
    }, [location.state]);

    useEffect(() => {
        if (tracks.length > 0) {
            const songsWithImages = tracks.filter(song => song.album?.images?.[0]?.url);
            setSelectedSongs(getRandomSongs(songsWithImages, 4));
        }
    }, [tracks]);

    const randomSong = selectedSongs[Math.floor(Math.random() * 4)];
    useEffect(() => {
        if (selectedSongs.length > 0) {
            setCurrentSong(randomSong);
            setSongName(randomSong?.name);
            audioRef.current = new Audio(randomSong?.preview_url);
        }
    }, [selectedSongs]);

    const audioRef = useRef(new Audio(randomSong?.preview_url));
    function getRandomSongs(tracks, num) {
        const shuffled = [...tracks].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }
    const whenClicked = (clickedSongName) => {
        if (clickedSongName === currentSong?.name) {
            setFeedback('Good job!');
            setCorrectAnswer(clickedSongName);
            setTimeout(() => {
                window.location.reload(); // Reload the page after 3 seconds
            }, 2000);
        } else {
            setFeedback('Incorrect');
        }
    };

    return (
        <div className="screen-container">
            <div className="library-body">
                <div className="left-guess-body">
                    <audio controls src={currentSong?.preview_url}></audio>
                    {selectedSongs.map((song) => (
                        <div
                            className={`song-card ${feedback === 'Good job!' && song.name === correctAnswer ? 'correct' : feedback === 'Incorrect' && song.name === currentSong?.name ? 'incorrect' : ''}`}
                            key={song.id}
                            onClick={() => whenClicked(song.name)}
                        >
                            {song.album?.images?.[0]?.url ? (
                                <img src={song.album.images[0].url} className="song-image" alt="Album Art"/>) : (
                                <img
                                    src="https://via.placeholder.com/150"
                                    className="song-image"
                                    alt="Default Album Art"
                                />)}
                            <p className="song-name">{song.name}</p>
                            <p className="song-artist">{song.artists[0].name}</p>
                        </div>
                    ))}
                    {feedback && <p className={`feedback ${feedback === 'Good job!' ? 'correct' : 'incorrect'}`}>{feedback}</p>}
                </div>
                <div className="right-guess-body">

                </div>
            </div>
        </div>
    );
}
