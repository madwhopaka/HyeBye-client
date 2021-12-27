
import "./App.css";
import react , {useEffect,useState} from 'react' ; 
import Ape from './Ape' ; 
import Login from './components/Login.js' ;
import RoomPage from "./components/RoomPage";
import JoinedRoom from "./components/JoinedRoom";
import {Routes, Route} from "react-router-dom" ;
import {useSelector} from 'react-redux' ; 
import { setSocket } from "./reducers/socket";
import {useDispatch} from 'react-redux' ; 
import ThemeButton from "./components/ThemeButton";
import  io from 'socket.io-client' ; 


 
const CONNECTION_PORT  = 'localhost:8000/';
let socket; 


function App() {
  const dispatch = useDispatch() ; 
  const theme =  useSelector(state => state.theme);
  console.log(theme.value.color) ; 
  const body = document.body; 
  body.style.background = theme.value.color ; 
  body.style.color = theme.value.bgcolor ;
  console.log(theme.value.bgcolor) ;  
  dispatch(setSocket(socket)) ; 
  useEffect(() => {
    socket = io(CONNECTION_PORT) ; 
    return () => {
      socket.disconnect() ;
    }
  }, [CONNECTION_PORT])
  return (
    <div className="App" style = {{backgroundColor:theme.value.color , color: theme.value.bgcolor}}>
    <ThemeButton/>
   <Routes>
     <Route path = '/' element = {<Ape  />} />
     <Route path = '/room' element = {<RoomPage socket = {socket} />} />
     <Route path = 'room/:id' element = {<JoinedRoom socket = {socket}/>} />
     <Route path = '/login' element = {<Login /> } /> 
   </Routes>
   </div>
  );
}

export default App;


 