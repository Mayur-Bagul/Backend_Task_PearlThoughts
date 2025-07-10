const express = require('express');
const EmailQueue = require('./queue/EmailQueue');
const Logger = require('./utils/Logger');

const app = express();
const PORT = process.env.PORT || 3000;

const emailQueue = new EmailQueue(); // Queue runs automatically

// Middleware
app.use(express.json());

// API Endpoint
app.post('/send-email', (req, res) => {
  const email = req.body;

  if (!email.id || !email.to) {
    return res.status(400).json({ error: 'Missing email.id or email.to' });
  }

  emailQueue.enqueue(email);
  Logger.info(`Received email request: ${email.id}`);
  res.status(202).json({ status: 'queued', id: email.id });
});

// Root
app.get('/', (req, res) => {
  res.send('Resilient Email Service is running');
});

// Start server
app.listen(PORT, () => {
  Logger.info(`🚀 Server listening on port ${PORT}`);
});
// This code sets up a simple Express server that listens on port 3000.
// It imports the EmailService class and creates an instance of it.
// The server has a single endpoint `/send-email` that accepts POST requests with email data in the request body.
// When a request is made to this endpoint, it calls the `send` method of the EmailService instance, passing the request body as the email data.
// The result of the email sending operation is then returned as a JSON response.