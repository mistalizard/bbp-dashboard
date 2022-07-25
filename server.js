const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const getIO = require('./io').getIO;
getIO(io);

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successfull'));

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is live on port ${port}...`);
});
