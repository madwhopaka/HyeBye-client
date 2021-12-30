import  io from 'socket.io-client' ; 
import React from 'react';
 
const CONNECTION_PORT  = 'https://hybye-backend.herokuapp.com/';

export const socket = io.connect(CONNECTION_PORT);
export const SocketContext = React.createContext();
export {CONNECTION_PORT}; 