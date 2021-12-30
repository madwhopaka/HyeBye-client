import React from 'react'
import './.css'  ;
import { useState,useEffect,useContext,createRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from 'react-redux';
import plane from '../images/plane.png' ; 
import ThemeButton from '../components/ThemeButton';
import { colorSelect } from './color';
import { userChange } from '../reducers/user';
import { setLoading } from '../reducers/loading';
import {setCode} from '../reducers/code' ; 
import {SocketContext,CONNECTION_PORT} from '../reducers/socket.js';
import Loading from '../components/Loading';

var bagcolor = colorSelect() ; 
function Chat(props) {
    const nav = useNavigate()  ;
    const socket = useContext(SocketContext);
    const [mess, setMess] = useState('') ; 
    console.log(bagcolor) ;
    const messagebox = createRef()  ;
    const [messageList, setMessagesList] = useState([]) ; 
    const chatMessages = React.createRef() ; 
    const user = useSelector(state => state.user);
    const roomcode = useSelector(state=>state.code) ; 

    const dispatch  = useDispatch() ; 
     useEffect(() => {
        
      socket.on('disconnect', ()=> {
        dispatch(setLoading({loadingvalue:true, loadingtext:"You are dissconnected from the server"})); 
        setTimeout(() => {
            dispatch(setLoading({loadingvalue:false, loadingtext:""}));
            nav('/');
        }, 1000);
      })

        const data = {
            code: roomcode.value.code,
            username: user.value.username,
          };
        console.log(socket.connected) ; 
        console.log(data) ;
        socket.emit('join-room', data); 

         return () => {
            dispatch(userChange({username:''})) ; 
            dispatch(setCode({code:''})) ; 
            socket.disconnect() ; 
            

         }
     }, [CONNECTION_PORT,socket]);

     
    useEffect(() => {
       

        socket.on('receive_message', (data)=> {
            console.log(data) ; 
            setMessagesList((messageList)=> [...messageList, data]); 
        })

        socket.on('others-joined', (data)=>{
            const realdata =  JSON.stringify(data); 
            console.log(data.side); 
            console.log(realdata) ;
             setMessagesList((messageList)=>[...messageList, data]);
         });
        
        socket.on("leave", (payload) => {
            console.log(payload)
            setMessagesList((list)=> [...list,payload]);
            });
    
        
        return () => {
            socket.disconnect() ; 
        }
    }, [socket])

    const handleSubmit = (e)=> {
        e.preventDefault() ; 
        if (mess ) {
            const messageData = {
                message: mess , 
                side : "right" ,
                from : 'you' ,
                color: bagcolor, 
            }
            const username = localStorage.getItem("username"); 
            const code = localStorage.getItem("code") ; 
            const senderData = {
                message: mess, 
                side: 'left', 
                from : user.value.username, 
                color : '' ,
                room : roomcode.value.code, 
            }
            console.log(senderData) ; 
            socket.emit('send_message', senderData);  
            setMessagesList([...messageList, messageData]); 
            setMess('') ;
        }

    }
   

    const handleChange =(e)=> {
          setMess(e.target.value) ; 
          console.log(mess) ;        
    }


    return (
        
      <div className='outer-container'>
          <ThemeButton />
          <div className= 'chat-container'>
            Room Code :  4oisdslfiw
            <div  className='chat-messages'>
                <div className='left'>
                <div className= "messageBox" style = {{background:bagcolor}}>Hey whatsup</div>
                </div>     

                {messageList.map(function(message, idx){    
         return (<div style = {{marginRight:"10px"}} key = {idx} className = {message.side}>
             {message.side==="middle"? <div>{message.message}</div> : 
          <div className= "messageBox"  ref = {messagebox} style = {{backgroundColor: message.color}}>{message.message}</div> }
          <p style = {{color: "grey"  , fontWeight:"bold"}}>
              {message.from}
          </p>
        </div>)
        
       })}   
      </div>
      <form onSubmit={handleSubmit} className='message-box'>
                <input className='inputbar' placeholder='Message' onChange= {handleChange} value = {mess}>
                </input>
                <button className ="send" type = 'submit'><img height = "30px" width = "30px" src = {plane} /></button>
      </form >
      
      </div>
      <Loading />
      </div>
           
    )
}

export default Chat
