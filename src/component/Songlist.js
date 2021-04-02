import React from 'react'
import './Songlist.css'


const  Songlist = ({track, chooseTrack})=> {
  
    function handlePlay() {
        chooseTrack(track)
      }
    return (
      
         <div onClick={handlePlay} className="card">
          <div>
                <img src={track.albumUrl}  alt='pic' style={{width: "100%",}}/>
                <div className="card_bottom">
                       <h3>{track.title}</h3>
                    <p style={{color:'#ccc'}}>{track.artist}</p>    
                </div>
             </div>
        
           
        </div>

      
       
    )
}

export default Songlist
