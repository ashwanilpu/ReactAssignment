import React, { useEffect ,useState} from "react";
import './App.css';
import Login from './component/Login';
import {getTokenFromUrl} from './spotify.js';
import  spotifyWebApi from "spotify-web-api-js";
import Songlist from "./component/Songlist";
import Player from "./component/Player";



const spotify= new spotifyWebApi();
const App = ()=> {
    
   const [token, setToken] = useState(null)
   const [search,setSearch] = useState("")
   const [searchResults,setSearchResults] = useState([])
   const [playingTrack, setPlayingTrack] = useState({})
    
  //  set accesstoken to token
  useEffect(()=>{
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if(_token){
      setToken(_token)
      
    }
  },[]);


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
};
  
// to set the track that user choose
function chooseTrack(track) {
  setPlayingTrack(track)
}


  return (
    <div className="App">
      {
        token ? ( 
           
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

       ) : (
              
          //Login page  
             <Login/>
        )
      }
     
    </div>
  );
}

export default App;
