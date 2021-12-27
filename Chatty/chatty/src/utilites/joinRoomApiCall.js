import { rootShouldForwardProp } from '@mui/material/styles/styled';
import axios from 'axios' ; 

const host = 'http://192.168.0.105:8000' ; 
const url  = `${host}/api/room/validate` ; 

export default async function joinRoomApiCall (username, code) {
   const formdata = {
       username: username, 
       code : code  ,
   }

   try{
    await axios.post(url,formdata).then((res)=>{
        console.log(res) ; 
        if (res.data.error) {
            return res.data.error; 
        }
        else {
            return "Success" ; 
        }
    });
   }
   catch(err) {
    console.log(err) ; 
    return err; 
   }

}