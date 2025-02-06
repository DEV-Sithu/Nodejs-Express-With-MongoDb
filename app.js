require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
require('./config/database');

const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');


const app = express();
// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet()); 
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));


const versionMiddleware = require('./middlewares/versioning');

// Versioned routes using middleware
app.use(versionMiddleware('v1')); // Default to v1

// User 
const v1UserRoutes = require('./routes/v1/userRoutes');
app.use('/v1', v1UserRoutes);
//Room
const v1RoomRoutes = require('./routes/v1/roomRoutes');
app.use('/v1', v1RoomRoutes);



app.get('/checkVersion', (req, res) => {
  if (req.version === 'v1') {
    res.send('Response from v1');
  } else if (req.version === 'v2') {
    res.send('Response from v2');
  }
});


app.get('/', (req, res) => {
    res.send('Node JS Express With Mongoose DB');
    });


app.listen(process.env.APP_PORT , () => {
   console.log(chalk.blue('Server listening on port '+ process.env.APP_PORT));
});