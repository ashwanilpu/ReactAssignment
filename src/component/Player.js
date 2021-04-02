
import SpotifyPlayer from "react-spotify-web-playback"
import './Player.css'

export default function Player({ accessToken, trackUri }) {

  if (!accessToken) return null
  return (
    <div className='footer'>
      <SpotifyPlayer
          token={accessToken}
          play="true"
          uris={trackUri ? [trackUri] : []}
       />
    </div>
    
  )
}