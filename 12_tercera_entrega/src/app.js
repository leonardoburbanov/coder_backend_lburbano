import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import __dirname from './utils.js';
import viewRouter from "./router/views.routes.js";
import sessionRouter from './router/sessions.routes.js';
import productRouter from './router/products.routes.js';
import cartRouter from './router/carts.routes.js';
import initializePassport from './config/passport.config.js';
import { config } from "./config/config.js";

import {Server} from "socket.io";
import chatService from "./services/chat.service.js"

const PORT = config.server.port;
const MONGO = config.mongo.url;
const SECRET = config.session.secret;

const app = express();
app.use(express.static(__dirname+'/public'));

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:3600
    }),
    secret:SECRET,
    resave:false,
    saveUninitialized:false
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const connection = mongoose.connect(MONGO);
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');


const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT);
})

const socketServer = new Server(server);
server.on('error', error => console.log(`Error in server ${error}`));


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use("/", viewRouter);
app.use('/api/session', sessionRouter);

socketServer.use((socket, next) => {
  if (socket.request.user && socket.request.user.role === 'user') {
    return next();
  }
  // If the user is not authorized, reject the connection
  next(new Error('Unauthorized'));
});


socketServer.on("connection",async(socketConnected)=>{
    console.log(`Nuevo cliente conectado ${socketConnected.id}`);
    const messages = await chatService.getMessages();
    socketServer.emit("msgHistory", messages);
    //capturamos un evento del socket del cliente
    socketConnected.on("message",async(data)=>{
        //recibimos el msg del cliente y lo guardamos en el servidor con el id del socket.
        await chatService.addMessage(data);
        const messages = await chatService.getMessages();
        // messages.push({socketId: socketConnected.id, message: data});
        //Enviamos todos los mensajes a todos los clientes
        socketServer.emit("msgHistory", messages);
    });
});