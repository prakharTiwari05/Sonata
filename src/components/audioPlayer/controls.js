import React from "react";
import "./controls.css";
import { IconContext } from "react-icons";
import { FaPause } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5";

export default function Controls({
                                     isPlaying,
                                     setIsPlaying,
                                     handleNext,
                                     handlePrev,
                                 }) {
    return (
        <IconContext.Provider value={{ size: "30px", color: "#C4D0E3" }}>
            <div className="controls-wrapper flex">
                <div className="action-btn flex" onClick={handlePrev}>
                    <IoPlaySkipBack />
                </div>
                <div
                    className={
                        isPlaying ? "playerButton flex active" : "playerButton flex"
                    }
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? <FaPause /> : <IoPlay />}
                </div>
                <div className="action-btn flex" onClick={handleNext}>
                    <IoPlaySkipForward />
                </div>
            </div>
        </IconContext.Provider>
    );
}