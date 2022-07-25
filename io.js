let io;

exports.getIO = async io => {
  await getIOServer(io);
  io.on('connection', socket => {
    console.log('Socket Server Imported Successfully');
  });
};

exports.getMessageData = (event, message) => {
  emitMessageToClient(event, message);
};

function getIOServer(server) {
  io = server;
  return io;
}

let i = 1;
function emitMessageToClient(event, message) {
  setTimeout(() => {
    io.sockets.emit(`${event}`, `${message} ${i}`);
  }, 1000);
  i++;
}

// setInterval(() => {
//   io.sockets.emit('message', 'Connected to IO Server');
// }, 10000);
