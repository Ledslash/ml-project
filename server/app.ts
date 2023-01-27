import express from 'express';
import { profile } from './services/profile';
import { purchasedList } from './services/purchased-list';
import http from 'http';
import cors from 'cors';
import { purchasedItemStatus } from './services/purchased-item-status';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(_req, res) {
  res.send('hello world');
});




// const port = normalizePort(process.env.PORT || context.port);
app.set('port', 8050);
const server = http.createServer(app);
app.listen(8050, () => {
    console.info("Server listening on 8050");
});

/**
 * Event listener for HTTP server "error" event.
 *
function onError(error) {
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

server.on('error', onError);*/


app.get('/profile', profile);
app.post('/purchased-list/:id', purchasedList);
app.post('/purchased-item-status', purchasedItemStatus);
