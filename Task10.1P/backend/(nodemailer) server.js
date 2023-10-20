const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors'); 
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// Load environment variables from a .env file if present
dotenv.config();

const app = express();

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.use(cors());

// Creating a nodemailer sender using a free SMTP server (Gmail in this case)
const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,  // from 1phenominal1@gmail.com
        pass: process.env.EMAIL_APP_PASSWORD,     
    },
});

app.post('/api/email', async(req, res) => {
  const { email } = req.body;

  const data = {  
        from: 'NeverKnow <1phenominal2@gmail.com>', // Sender's email address
        to: email, // Recipient's email address (provided in the POST request)
        subject: 'Welcome to Our Daily Insider!', // Email subject
        text: 'This email is sent to you to confirm that you have made a subscription.\nWe look forward to you being a part of our Newsletter. \n\nThanks for joining the Newsletter. \n\nRegards\nNK-Works\n-by Anneshu Nag, Student ID- 2210994760', // Email body
  };

    try {
        // Send mail
        await sender.sendMail(data);
        console.log('Email sent successfully');
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}.`);
});
