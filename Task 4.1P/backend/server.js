/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 26/08/2023                      */

// Import necessary dependencies
const express = require('express');
const dotenv = require('dotenv');
const mg = require('mailgun-js');

// Load environment variables from a .env file if present
dotenv.config();

// Function to configure the Mailgun client
const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

// Create an instance of the Express application
const app = express();
// Configure middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Define a route for handling POST requests to '/api/email'
app.post('/api/email', (req, res) => {
  const { email } = req.body;
  mailgun()
    .messages()
    .send(
      {
        from: 'NeverKnow <anneshu4760.be22@chitkara.edu.in>', // Sender's email address
        to: email, // Recipient's email address (provided in the POST request)
        subject: 'Welcome to Our Daily Insider!', // Email subject
        text: 'This email is sent to you to confirm that you have made a subscription.', // Email body
      },
      (error, body) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: 'Error in sending email' });
        } else {
          console.log(body);
          res.send({ message: 'Email sent successfully' });
        }
      }
    );
});
// Define the port to listen on (fallback to 3000 if PORT is not defined in environment)
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
}); 
