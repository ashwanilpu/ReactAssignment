import React, {useState} from "react";
import  spotifyWebApi from "spotify-web-api-js";
import Songlist from './Songlist';
import Player from "./Player";
import './Search.css'
import {AiOutlineHome} from "react-icons/ai"
import {CgProfile} from "react-icons/cg"
import {BiSearch} from "react-icons/bi"
import spotifyLogo from '../logo/spotifylogo3.png';
import { NavLink } from "react-router-dom";


const spotify = new spotifyWebApi();
function Search({token}) {

    const [search,setSearch] = useState("")
    const [searchResults,setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState({})

      // funtion run on on formsubmit and fetch the results
  const  onFormSubmit = event => {
    event.preventDefault();
   
    spotify.setAccessToken(token)

    spotify.searchTracks(search).then(res => {
        setSearchResults(res.tracks.items.map(track =>{
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[1].url,
           }
        }))

    })

    spotify.getNewReleases().then(res=>{
        console.log(res);
    })
};


  
// to set the track that user choose
function chooseTrack(track) {
    setPlayingTrack(track)
  }
  return (
    <div style={{display:'flex'}}>
    <div className="side_nav">
        <div className="nav_container">
            <img src={spotifyLogo} alt="logo" className="logo"></img>
            <ul>
               {/* <NavLink   to="home"  className={({ isActive }) => (isActive ? 'active' : 'inactive')}> <li><AiOutlineHome style={{marginRight: '10px'}} />Home</li></NavLink>
               <NavLink  to="profile" className={({ isActive }) => (isActive ? 'active' : 'inactive')}> <li><CgProfile style={{marginRight: '10px'}} />Profile</li></NavLink>
               <NavLink  to="search" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>  <li><BiSearch style={{marginRight: '10px'}} />Search</li></NavLink> */}
            </ul>
        </div>


    </div>



 <div style={{marginLeft:'300px',width:'100%'}}>
  <div style={{marginTop:"10px",display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>          
            {/* From to Search the Song */}
            <h2 style={{color:'white',margin:'10px'}}>Search For Songs</h2>
          <form onSubmit={onFormSubmit} className="header_input">
              <input  type = 'text' placeholder = "Search Song/Artist" value = {search} onChange = {  e  => setSearch(e.target.value)}  />
          </form>

          {/* To display The result  */}
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:"center"}}>
             {searchResults.map(track => (
                    <Songlist
                   track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
               />
            ))}
            </div>

            {/* Bottom Player */}
          { playingTrack && Object.keys(playingTrack).length > 0 && 
          <Player accessToken={token} trackUri={playingTrack.uri}/>
          }
        </div>
    </div>
    </div>
  )
}

export default Search;