import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import http from 'http';
import cors from 'cors';

import { config } from './config/config';
import { itemInfo } from './endpoints/item-info';
import { profile } from './endpoints/profile';
import { purchasedList } from './endpoints/purchased-list';
import { normalizePort } from './shared/normalizeEnv';

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
        default:
        throw error;
    }
}


const app = express();
if(config.EXPRESS.ALLOW_CORS === "true"){
    app.use(cors());
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = normalizePort(process.env.PORT || config.EXPRESS.PORT);
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);


app.listen(port, () => {
    console.info(`Server listening on ${port}`);
});

// Services
app.get('/profile', profile);
app.post('/purchased-list', purchasedList);
app.post('/item-info', itemInfo);

