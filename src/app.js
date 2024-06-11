import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';

import config from './config.js';
import initSocket from './sockets.js';
import productsRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.routes.js';
import usersRouter from './routes/users.routes.js';
import cartsRouter from './routes/carts.routes.js';
import sessionRouter from './routes/sessions.routes.js';


const app = express();

const httpInstance = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI)

const socketServer = initSocket(httpInstance);
app.set('socketServer', socketServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true
}))

app.engine('handlebars', handlebars.engine());
app.set('views', `src/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionRouter);
app.use('/static', express.static(`src/public`));

console.log(`app funcionando en puerto ${config.PORT} conectada a bbdd`);
});
