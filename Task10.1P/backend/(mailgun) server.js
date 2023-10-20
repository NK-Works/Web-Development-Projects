const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors'); 
const mailgun = require('mailgun-js');
const dotenv = require('dotenv');

// Load environment variables from a .env file if present
dotenv.config();

const app = express();

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.use(cors());

const mg = mailgun({
  apiKey:process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMIAN,
});

app.post('/api/email', (req, res) => {
  const { email } = req.body;

  const data = {  
    from: 'NeverKnow <anneshu4760.be22@chitkara.edu.in>', // Sender's email address
        to: email, // Recipient's email address (provided in the POST request)
        subject: 'Welcome to Our Daily Insider!', // Email subject
        text: 'This email is sent to you to confirm that you have made a subscription.\nWe look forward to you being a part of our Newsletter. \n\nThanks for joining the Newsletter. \n\nRegards\nNK-Works', // Email body
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error in sending email');
    } else {
      console.log('Email sent:', body);
      res.status(200).send('Email sent successfully!');
    }
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}.`);
});
