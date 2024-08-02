
import React, { useState, useRef, useEffect } from "react";
import "./audioPlayer.css";
import Controls from "./controls";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";

export default function AudioPLayer({
                                        currentTrack,
                                        currentIndex,
                                        setCurrentIndex,
                                        total,
                                    }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const audioSrc = total[currentIndex]?.track.preview_url;

    const audioRef = useRef(new Audio(total[0]?.track.preview_url));
    const timeBetween = useRef();
    const playCheck = useRef(false);
    const { duration } = audioRef.current;
    const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;
    const startTimer = () => {
        clearInterval(timeBetween.current);
        timeBetween.current = setInterval(() => {
            if (audioRef.current.ended) {
                handleNext();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    };
    useEffect(() => {
        if (audioRef.current.src) {
            if (isPlaying) {
                audioRef.current.play();
                startTimer();
            } else {
                clearInterval(timeBetween.current);
                audioRef.current.pause();
            }
        } else {
            if (isPlaying) {
                audioRef.current = new Audio(audioSrc);
                audioRef.current.addEventListener('canplaythrough', () => {
                    audioRef.current.play();
                    setIsPlaying(true); // Move setIsPlaying inside the event listener
                    startTimer();
                });
            } else {
                clearInterval(timeBetween.current);
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);

        setTrackProgress(audioRef.current.currentTime);

        if (playCheck.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            playCheck.current = true;
        }
    }, [currentIndex]);

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(timeBetween.current);
        };
    }, []);
    const handleNext = () => {
        if (currentIndex < total.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else setCurrentIndex(0);
    };
    const handlePrev = () => {
        if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
        else setCurrentIndex(currentIndex - 1);
    };
    const reset = (n) => {
        return n > 9 ? "" + n : "0" + n;
    };
    const artists = [];
    currentTrack?.album?.artists.forEach((artist) => {
        artists.push(artist.name);
    });
    return (
        <div className="player-body flex">
            <div className = "player-left-body flex">
                <ProgressCircle
                    percentage={currentPercentage}
                    isPlaying={true}
                    image = {currentTrack?.album?.images[0]?.url}
                    size = {300}
                    color = "#0240de"
                />
            </div>

            <div className="player-right-body flex">
                <p className="song-title">{currentTrack?.name}</p>
                <p className="song-artist">{artists.join(" | ")}</p>
                <div className="player-right-bottom flex">
                    <div className="song-duration flex">
                        <p className="duration">0:{reset(Math.round(trackProgress))}</p>
                        <WaveAnimation isPlaying={isPlaying} />
                        <p className="duration">0:30</p>
                    </div>
                    <Controls
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        total={total}
                    />
                </div>
            </div>
        </div>
    );
}
