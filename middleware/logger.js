const moment = require('moment'); //STEP 21 establish moment
const logger = require('./middleware/logger'); //STEP 18

const logger = (req, res, next) => { //STEP 20 setting up logger
  console.log(
    `${req.protocol}://${req.get('host')}${
      req.originalUrl
    }: ${moment().format()}` //STEP 22, now the console also logs the date
  );
  next(); //the console.log on line 4 will give you the entire URL 
};

module.exports = logger; //STEP 23 export logger

//The LOGGER lesson ends at 31:13 in youtube video