/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 12/08/2023                      */

// Import required packages
const express = require('express'); // Express framework for creating web applications
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const mailgun = require('mailgun-js'); // Mailgun library for sending emails

// Mailgun API key and domain
const apiKey = 'Place your custom Mailgun API here'; // Can't share it as Mailgun doesn't allow it
const domain = 'Place your domain here'; // Can't share it as Mailgun doesn't allow it
const mailgunMsg = mailgun({ apiKey: apiKey, domain: domain }); // Initialize Mailgun with API key and domain

// Create an instance of the Express application
const myApp = express();

// Configure middleware
myApp.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
myApp.use(express.static('public/css')); // Serve static CSS files from the 'public/css' directory

// Handle GET requests for the root path ('/')
myApp.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Send the 'index.html' file as the response
});

// Handle POST requests to the '/subscribe' path
myApp.post('/subscribe', (req, res) => {
  const email = req.body.email; // Extract the email from the POST request's body

  // Define email data
  const data = {
    from: 'NeverKnow <1phenominal2@gmail.com>', // Sender's email address
    to: email, // Recipient's email address (provided in the POST request)
    subject: 'Welcome to Our Daily Insider!', // Email subject
    text: 'This email is sent to you to confirm that you have made a subscription.', // Email body
  };

  // Send the email using Mailgun's messages API
  mailgunMsg.messages().send(data, (error, body) => {
    if (error) {
      console.log(error); // Log any errors
      return res.status(500).send('Error Detected.'); // Respond with an error message
    }
    console.log('Email sent successfully:',body); // Log the response from Mailgun
    res.sendFile(__dirname + '/index.html'); // Send back the 'index.html' file as the response
    
    // return res.status(200).send('Email Sent'); // Send back the success message (Alternate Option)
  });
});

// Start the server and listen on port 7000
myApp.listen(7000, () => {
  console.log('Server is running at port 7000.');
});
