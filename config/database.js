require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const chalk = require('chalk');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_URL ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

mongoose.connection.on('connected', () => {
    console.log(chalk.cyan('Connected to MongoDB'));
});

mongoose.connection.on('error', (err) => {
    console.error(chalk.red('Error connecting to MongoDB:', err));
});
