const express = require('express');

const friendsController = require('./controllers/friends.controllers');
const messagesController = require('./controllers/messages.controllers');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
  console.log(`Your request took ${delta} miliseconds.`);
});

app.get('/', (req, res) => {
  res.send('Hello, welcome to my app');
})

const friendsRouter = express.Router();

friendsRouter.post('/', friendsController.postFriend);
friendsRouter.get('/', friendsController.getFriends);
friendsRouter.get('/:friendId', friendsController.getFriend);

app.use('/friends', friendsRouter);

app.get('/messages', messagesController.getMessages);
app.post('/messages', messagesController.postMessage);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
