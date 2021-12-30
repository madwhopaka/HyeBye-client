
import "./App.css";
import react , {useEffect,useState} from 'react' ; 
import Ape from './Ape' ; 
import Login from './components/Login.js' ;
import RoomPage from "./components/RoomPage";
import JoinedRoom from "./components/JoinedRoom";
import {Routes, Route} from "react-router-dom" ;
import {useSelector} from 'react-redux' ; 
import {useDispatch} from 'react-redux' ; 
import ThemeButton from "./components/ThemeButton";
import {SocketContext, socket} from './reducers/socket.js' ;
import Chat from './Compo/Chat.js' ; 



function App() {
  const dispatch = useDispatch() ; 
  const theme =  useSelector(state => state.theme);
  console.log(theme.value.color) ; 
  const body = document.body; 
  body.style.background = theme.value.color ; 
  body.style.color = theme.value.bgcolor ;
  console.log(theme.value.bgcolor) ;  
  
  return (
    <div className="App" style = {{backgroundColor:theme.value.color , color: theme.value.bgcolor}}>
      <SocketContext.Provider value = {socket} > 
      <ThemeButton/>
<Routes>
 <Route path = '/' element = {<Ape  />} />
 <Route path = '/room' element = {<RoomPage socket = {socket} />} />
 <Route path = 'room/:id' element = {<JoinedRoom socket = {socket}/>} />
 <Route path = '/login' element = {<Login /> } /> 
</Routes>
       </SocketContext.Provider>
   </div>
  );
}

export default App;


{/* <SocketContext.Provider value={socket}>
<ThemeButton/>
<Routes>
 <Route path = '/' element = {<Ape  />} />
 <Route path = '/room' element = {<RoomPage socket = {socket} />} />
 <Route path = 'room/:id' element = {<JoinedRoom socket = {socket}/>} />
 <Route path = '/login' element = {<Login /> } /> 
</Routes>
</SocketContext.Provider> */}