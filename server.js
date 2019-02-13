const express = require('express');
const morgan = require('morgan');


const postsRouter = require("./data/posts/posts-router");
const usersRouter = require("./data/users/users-router");


const server = express();

server.use(express.json());
server.use(morgan('dev'));

server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.get('/', async (req, res) => {
  res.send('Hello from the server yoooo')
})



module.exports = server;