const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const routes = require('./route');
require('./passport');

const app = express();

app.use(express.json({}));

app.use(
  cookieSession({
    name: 'session',
    keys: ['SomeSecret'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PATCH,PUT,DELETE',
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', routes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
