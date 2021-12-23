import React from 'react';
import app_logo from "../images/output.gif";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useSelector} from 'react-redux' ; 

function LandPage() {
  const theme =  useSelector(state => state.theme);
  console.log(theme.value.color) ; 
  console.log(theme.value.bgcolor) ; 
    return (
        <div className="center-div">
        <div className="logohead">
          <img className="logo" src={app_logo}  style = {{border:`2px solid ${theme.value.color}`, borderRadius:"50%"}}/>
          <div className="heading">
            <h3 className="title">HyBye</h3>
            <p className="sub-title" style= {{color:theme.value.bgcolor}}>Your private chat room</p>
          </div>
        </div>
        <div className="btn-container">
          <button className="btnn"> <p style = {{margin:0, padding: 0}}>Get in </p><ArrowForwardIosIcon className = "icon" sx = {{margin:0, padding:0}}/> </button>
        </div>
      </div>
    )
}

export default LandPage
