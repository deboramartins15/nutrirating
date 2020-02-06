//CONFIGURAÇÕES DO SERVER
const app = require('express')();
const { PORT } = require('./.env');
const consign = require('consign');
const db = require('./config/db');

// use process.env variables to keep private variables,
require('dotenv').config()

// App
app.db = db; //connection w/ database

//Populando o app
consign()
.include('./config/authentication.js')
.then('./config/middlewares.js')
.then('./api')
.then('./config/routes.js')
.into(app); 

// App Server Connection
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})