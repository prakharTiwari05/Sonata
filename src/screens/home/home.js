import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Library from "../library/library";
import Feed from "../guess/guess";
import Player from "../player/player";
import Trending from "../trending/trending";
import Favorites from "../favorites/favorites";
import './home.css'
import Sidebar from "../../components/sidebar/sidebar";
import Login from "../auth/login";
import {setClientToken} from "../../spotify";
import Guess from "../guess/guess";
import GuessGame from "../guess/guessGame";

export default function Home() {
    const [token, setToken] = useState("");
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const hash = window.location.hash;
        window.location.hash = "";
        if(!token && hash)
        {
            const _token = hash.split("&")[0].split('=')[1];
            window.localStorage.setItem("token", _token);
            setToken(_token);
            setClientToken(_token);
        }
        else
        {
            setToken(token);
            setClientToken(token);
        }
    }, []);
    return !token ?(
            <Login />) :
        (<Router>

            <div className="main-body">

                <Sidebar/>
                <Routes>
                    <Route path="/" element = {<Library/>}/>
                    <Route path="/guess" element = {<Guess />}/>
                    <Route path="/guessGame" element = {<GuessGame />}/>
                    <Route path="/trending" element = {<Trending/>}/>
                    <Route path="/player" element = {<Player/>}/>
                    <Route path="/favorites" element = {<Favorites/>}/>


                </Routes>
            </div>
        </Router>
    )
}
