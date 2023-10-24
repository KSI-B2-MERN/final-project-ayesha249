const mongoose = require('mongoose');
const requireLogin = require('../midlewares/requireLogin');
const requireCredits = require('../midlewares/requireCredits');
const Survey = mongoose.model('surveys')
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
module.exports = (app) =>{
   
//     app.get('/api/surveys/thanks', (req,res)=>{
//        res.send(`
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         background-color: #f5f5f5;
//         text-align: center;
//       }
//       .thank-you {
//         background-color: #3498db;
//         color: #ffffff;
//         padding: 20px;
//         border-radius: 10px;
//         margin: 50px auto;
//         max-width: 400px;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="thank-you">
//       <h2>Thank You for Your Feedback!</h2>
//       <p>Your input is greatly appreciated.</p>
//     </div>
//   </body>
//   </html>
// `);

//     })




console.log('here in survey router')
    app.post('/api/surveys', requireLogin, requireCredits, (req, res)=>{
    
    const {title, subject, body, recipients } = req.body;
     const survey = new Survey({
        title,
        subject,
         body,
        recipients :recipients.split(',').map(email => ({ email: email.trim() })), 
        _user: req.user._id,  // who created the survey
        dateSet : Date.now()
     })

    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
    })
    
}