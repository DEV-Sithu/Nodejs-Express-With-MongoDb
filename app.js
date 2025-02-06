require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const chalk = require('chalk');

const app = express();

app.get('/', (req, res) => {
    res.send('Node JS Express With Mongoose DB');
    });


app.listen(process.env.APP_PORT , () => {
   console.log(chalk.blue('Server listening on port '+ process.env.APP_PORT));
});