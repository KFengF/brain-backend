const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const server = express();

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '0',
        database: 'braindb'
    }
})

server.use(bodyParser.json());

server.use(cors());

server.get('/', (req, res) => res.send('It is working'));

server.post('/signin', signIn.handleSingIn(db, bcrypt));

server.post('/register', register.handleRegister(db, bcrypt));

server.get('/profile/:id', profile.handleProfile(db));

server.put('/image', image.handleImage(db));

server.post('/api', (req, res) => image.handleAPI(req, res))

server.listen(process.env.PORT || 4000, () => console.log('server is running on port ' + process.env.PORT));