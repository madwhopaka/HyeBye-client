import React, {useEffect} from 'react'
import Loading from './Loading'
import {useDispatch} from 'react-redux' ; 
import {setLoading} from '../reducers/loading.js' ; 
import {useNavigate} from 'react-router-dom' ; 
function JoinedRoom(props) {
    let socket;
   
    const dispatch = useDispatch() ; 
    const nav = useNavigate() ; 
    const leaveRoom = ()=> {
        dispatch(setLoading({loadingvalue:true, loadingtext:"Leaving the rooom"})); 
        setTimeout(() => {
        dispatch(setLoading({loadingvalue:false, loadingtext:"Leaving the rooom"})); 
        nav('/login', {replace:true}); 
        }, 1500);
    }

    useEffect(() => {
        socket = props.socket ; 
        console.log(socket) ; 
       return ()=>{
           socket.disconnect() ; 
       }
    }) ;  
    return (
        <div className='normal-container'>
            <h1>Hello world</h1>
            <button className='create-join-btn' onClick = {leaveRoom}>
                Leave room  
            </button>
            <Loading />
        </div>
    )
}

export default JoinedRoom
