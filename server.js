const express = require('express');

// const postsRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());

// server.use('/api/posts', postsRouter);

server.get('/', async (req, res) => {
  res.send('Hello from the server yoooo')
})

module.exports = server;