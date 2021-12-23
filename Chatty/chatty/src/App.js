import logo from "./logo.svg";
import "./App.css";
import LandPage from "./components/LandPage";
import ThemeButton from "./components/ThemeButton";
import {useSelector} from 'react-redux' ; 

function App() {
  const theme =  useSelector(state => state.theme);
  console.log(theme.value.color) ; 
  console.log(theme.value.bgcolor) ; 
  return (
    <div className="App" style = {{backgroundColor:theme.value.color , color: theme.value.bgcolor}}>
    <ThemeButton/>
    <LandPage />
    </div>
  );
}

export default App;
