import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
import logger from '../utils/logger.js';
import MESSAGES from '../common/messages.js';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3001"],
        methods: ['GET', 'POST']
    }
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; //userId: socketId

io.on('connection', (socket) => {
    logger.info(`${MESSAGES.A_USER_CONNECTED} ${socket.id}`)

    const userId = socket.handshake.query.userId;
    if(userId != 'undefined'){
        userSocketMap[userId] = socket.id;
    }

    //io.emit is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    //socket.on is used to listen to the events; can be used on client and server side
    socket.on("disconnect", () => {
        logger.info(`${MESSAGES.USER_DISCONNECTED} ${socket.id}`)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export {app, io, server}