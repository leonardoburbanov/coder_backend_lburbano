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

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use("/", viewRouter);
app.use('/api/session', sessionRouter);