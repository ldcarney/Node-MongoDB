const mongoose = require('mongoose');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

//Log the current environment
console.log(`app: ${app.get('env')}`);

//Connect to MongoDB
mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to mongodb...'))
    .catch(err => console.error('Could not connect to MongoDB'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/', home);

//Configuration
// console.log('Application Name:' + config.get('name'));
// console.log('Mail Server:' + config.get('mail.host'));
// console.log('Mail Password:' + config.get('mail.password'));

//In development mode
if (app.get('env') === 'development') {
    //Log HTTP request
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

//Db work... 
dbDebugger('Connected to the Database...');

app.use(logger);

//Port
const port = process.env.PORT || 3000;
app.listen( port, () => console.log(`Listening on port ${port}...`));

