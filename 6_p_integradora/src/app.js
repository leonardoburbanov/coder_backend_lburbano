import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import __dirname from './utils.js';

import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewRouter from './routes/views.routes.js';

const PORT = 8080;
const MONGO = 'mongodb+srv://admin:4w2kSZgJ5TXC4IWy@leonardocoder.aiiriqo.mongodb.net/ecommerce?retryWrites=true&w=majority';

const app = express();
app.use(express.static(__dirname+'/public'));

const connection = mongoose.connect(MONGO);
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use('/',viewRouter);

const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT);
})

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


const socketServerIO = new Server(server);


import messageModel from "./dao/db/models/messages.js";



socketServerIO.on('connection',  async(socket) =>{
    console.log('Usuario conectado');
    var logs = await messageModel.find()
/*     socket.on("message1", data =>{
        socketServerIO.emit('log', data);
    }) */

    socket.on("message2", async (data) =>{
        console.log(data)
        await messageModel.create({user: data.user, message: data.message})
        logs = await messageModel.find()
        console.log(logs)
        socketServerIO.emit('log', {logs})
    })

})