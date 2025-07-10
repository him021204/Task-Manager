const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  server.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.on('task:updated', (data) => {
    socket.broadcast.emit('task:updated', data);
  });

  socket.on('comment:added', (data) => {
    socket.broadcast.emit('comment:added', data);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

module.exports.io = io; // For use in controllers if needed
