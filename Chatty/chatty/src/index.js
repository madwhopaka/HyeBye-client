import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'; 
import {configureStore} from "@reduxjs/toolkit";
import themeReducer   from './reducers/theme.js' ;
import loadingReducer from './reducers/loading.js' ;  
import userReducer from './reducers/user.js' ; 
import codeReducer from './reducers/code.js' ; 
import {BrowserRouter as Router} from "react-router-dom" ; 

const store = configureStore({
  reducer: {
    code: codeReducer , 
    theme: themeReducer ,
    load: loadingReducer , 
    user: userReducer , 
  }
}) ; 

ReactDOM.render(
  <React.StrictMode>
   <Provider store = {store}>
   <Router>
   <App />
   </Router>
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
