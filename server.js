const express = require('express');

const friendsController = require('./controllers/friends.controllers');
const messagesController = require('./controllers/messages.controllers');

const app = express();

const PORT = 3000;

const friends = [
  {
    id: 0,
    name: "Albert Einstein",
  },
  {
    id: 1,
    name: 'Sir Isaac Newton',
  }
];

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
  console.log(`Your request took ${delta} miliseconds.`);
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(400).send('Something is not working');
})

app.get('/', (req, res) => {
  res.send('Hello, welcome to my app');
})

app.post('/friends', friendsController.postFriend);
app.get('/friends', friendsController.getFriends);
app.get('/friends/:friendId', friendsController.getFriend);

app.get('/messages', messagesController.getMessages);
app.post('/messages', messagesController.postMessage);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
