import React from 'react'
import "./queue.css"
export default function Queue({tracks, setCurrentIndex}) {
    console.log(tracks);

    return (
        <div className = "queue-container">
            <div className = "queue">
                <h1 className="upNext"> Up Next </h1>
                <div className = "queue-list">
                    {tracks?.map((track, index) => (
                            <div className="queue-item flex" onClick={() => setCurrentIndex(index)}>
                                <p className = "track-name">{track?.track?.name}</p>
                                <p className = "track-duration">0:30s </p>
                            </div>
                            ))}
                </div>
            </div>
        </div>
    )
}
