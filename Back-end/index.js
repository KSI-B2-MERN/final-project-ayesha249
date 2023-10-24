const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require ('./config/keys');
const bodyParser = require('body-parser');


  require('./models/user'); 
  require('./models/surveys');
  require('./services/passport');
 mongoose.connect(keys.connectionURI);

 
 const app = express();

 app.use(bodyParser.json());
 app.use(
   cookieSession({
    maxAge: 30* 24 * 60 * 60 *100,
    keys :  [keys.cookieKey]
   })

 )
  
 app.use (passport.initialize());
 app.use(passport.session());


require('./routes/autrhRouter') (app);
require('./routes/billingRouter') (app);
require('./routes/surveyRouter') (app);

const PORT = process.env.PORT || 5000; 
app.listen(PORT); 