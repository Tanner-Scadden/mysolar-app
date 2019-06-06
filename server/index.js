const express = require('express');
const session = require('express-session');
require('dotenv').config();
const massive = require('massive');

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Solar checking in')
  app.listen(SERVER_PORT, () => console.log(`It's over ${SERVER_PORT}!!!`))
});

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10
    }
}));

// Controllers //
const authC = require('./Controllers/authController');
const calendarC = require('./Controllers/calendarController');


// Auth Endpoints //
app.post('/auth/login', authC.login);
app.post('/auth/register', authC.register);
app.get('/auth/getUser', authC.getUser);
app.delete('/auth/logout', authC.logout);


// Calendar Endpoints //

app.get('/api/getEvents', calendarC.getEvents);
app.put('/api/changeEvent', calendarC.alterTime);


