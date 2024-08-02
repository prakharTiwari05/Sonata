import React from 'react'
import "./songcard.css";
import AlbumImage from "./albumImage";
import AlbumInfo from "./albumInfo";

export default function SongCard({album}) {
    return (
        <div className = "songCard-body flex">
            <AlbumImage url = {album?.images?.[0]?.url}/>
            <AlbumInfo album = {album}/>

        </div>

    )

}
