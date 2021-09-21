const express = require('express');

const messagesRouter = require('./routers/messages.router.js');
const friendsRouter = require('./routers/friends.router.js');

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
  console.log(`Your request took ${delta} miliseconds.`);
});

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello, welcome to my app');
});

app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
