import React, {useEffect, useState} from 'react'
import Loading from './Loading'
import {useDispatch, useSelector} from 'react-redux' ; 
import {setLoading} from '../reducers/loading.js' ; 
import {useNavigate} from 'react-router-dom' ; 
import Chat from '../Compo/Chat.js' ; 
function JoinedRoom() {
    const [userName,setUserName] = useState('');
    const user = useSelector(state => state.user);
    const roomcode = useSelector(state=>state.code) ; 
    const dispatch = useDispatch() ; 
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
