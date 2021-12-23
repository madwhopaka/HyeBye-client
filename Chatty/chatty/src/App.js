import logo from "./logo.svg";
import "./App.css";
import app_logo from "./images/app_logo.gif";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function App() {
  return (
    <div className="App">
      <div className="center-div">
        <div className="logohead">
          <img className="logo" src={app_logo} />
          <div className="heading">
            <h3 className="title">HyBye</h3>
            <p className="sub-title">Your private chat room</p>
          </div>
        </div>
        <div className="btn-container">
          <button className="btnn"> <p style = {{margin:0, padding: 0}}>Get in </p><ArrowForwardIosIcon className = "icon" sx = {{margin:0, padding:0}}/> </button>
        </div>
      </div>
      {/* <div>
     <div className='image-cont'>
     
     </div>
     <div>
     
     </div>
    </div>
    <button className='btn'>Get in </button>? */}
    </div>
  );
}

export default App;
