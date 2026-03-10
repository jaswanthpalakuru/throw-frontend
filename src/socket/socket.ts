import {io, Socket } from 'socket.io-client';
const HOST = import.meta.env.VITE_API_URL;

const socket: Socket = io(HOST || 'http://localhost:3001', {
    autoConnect: false
});

export default socket;