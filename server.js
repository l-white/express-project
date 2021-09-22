const express = require('express');
const path = require('path');

const messagesRouter = require('./routers/messages.router.js');
const friendsRouter = require('./routers/friends.router.js');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
  console.log(`Your request took ${delta} miliseconds.`);
});

app.use(express.json());
app.use('/site', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'My friends are clever!',
    header: 'Let\'s go skiing!',
  })
});

app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
