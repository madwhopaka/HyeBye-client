
import "./App.css";
import Ape from './Ape' ; 
import Login from './components/Login.js' ;
import RoomPage from "./components/RoomPage";
import JoinedRoom from "./components/JoinedRoom";
import {Routes, Route} from "react-router-dom" ;
import {useSelector} from 'react-redux' ; 
import ThemeButton from "./components/ThemeButton";

function App() {
  const theme =  useSelector(state => state.theme);
  console.log(theme.value.color) ; 
  console.log(theme.value.bgcolor) ;  
  return (
    <div className="App" style = {{backgroundColor:theme.value.color , color: theme.value.bgcolor}}>
     <ThemeButton/>
    <Routes>
      <Route path = '/' element = {<Ape />} />
      <Route path = '/room' element = {<RoomPage />} />
      <Route path = 'room/:id' element = {<JoinedRoom />} />
      <Route path = '/login' element = {<Login />} /> 
    </Routes>
    </div>
  );
}

export default App;
