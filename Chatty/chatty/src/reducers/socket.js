import  io from 'socket.io-client' ; 
import React from 'react';
 
const CONNECTION_PORT  = 'http://192.168.0.105:8000/';

export const socket = io.connect(CONNECTION_PORT);
export const SocketContext = React.createContext();
export {CONNECTION_PORT}; 