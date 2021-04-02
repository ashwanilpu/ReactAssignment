
export const authEndpoint="https://accounts.spotify.com/authorize";

const redirectUri="http://localhost:3000/";

const clientId="f01abf236ff84598bb5ab78e31e11b4e";

//The permission that user allow to acess
const scopes=[
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
];

//used to take out the accesstoken given by spotify
export const getTokenFromUrl = () => {
return window.location.hash
.substring(1)
.split('&')
.reduce((intial,item)=>{
     let parts=item.split('=')
     intial[parts[0]]=decodeURIComponent(parts[1]);
     return intial;
    },{});
}
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;