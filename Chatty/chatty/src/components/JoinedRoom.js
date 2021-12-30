import React, {useEffect, useState, useContext} from 'react'
import Loading from './Loading'
import {useDispatch, useSelector} from 'react-redux' ; 
import {setLoading} from '../reducers/loading.js' ; 
import {useNavigate} from 'react-router-dom' ; 
import { SocketContext,  } from '../reducers/socket';
import Chat from '../Compo/Chat.js' ; 
function JoinedRoom() {
    const [userName,setUserName] = useState('');
    const user = useSelector(state => state.user);
    const roomcode = useSelector(state=>state.code) ; 
    const dispatch = useDispatch() ; 
    const socket = useContext(SocketContext); 
    const nav = useNavigate() ; 
    useEffect(() => {
        setUserName(user.value.username);
        if (!user.value.username && !roomcode.value.code) {
           
            nav("/", { replace: true });
          }
        return () => {
            
        }
    }, [user.value.username,nav]) ; 

    
    const leaveRoom = ()=> {
      
        
        dispatch(setLoading({loadingvalue:true, loadingtext:"Leaving the rooom"})); 
        setTimeout(() => {
        dispatch(setLoading({loadingvalue:false, loadingtext:"Leaving the rooom"})); 
        socket.emit('leaving');
        nav('/', {replace:true}); 
        }, 1500);
    }

    useEffect(() => {
      
    }) ;  
    return (
        <div className='normal-container'>
            <Chat />
            <button className='create-join-btn' onClick = {leaveRoom}>
                Leave room  
            </button>
            <Loading />
        </div>
    )
}

export default JoinedRoom
