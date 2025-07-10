const EmailService = require('../services/EmailService');
const Logger = require('../utils/Logger');

class EmailQueue {
  constructor(intervalMs = 1000) {
    this.queue = [];
    this.emailService = new EmailService();
    this.intervalMs = intervalMs;
    this.isProcessing = false;

    // Start queue processing loop
    setInterval(() => this.processQueue(), this.intervalMs);
  }

  enqueue(email) {
    Logger.info(`Enqueued email: ${email.id}`);
    this.queue.push(email);
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const email = this.queue.shift();

    try {
      const result = await this.emailService.send(email);
      Logger.info(`Email processed from queue: ${email.id}, Status: ${result.status}`);
    } catch (err) {
      Logger.error(`Failed to process queued email ${email.id}: ${err.message}`);
    } finally {
      this.isProcessing = false;
    }
  }
}

module.exports = EmailQueue;
// This code defines an EmailQueue class that manages a queue of emails to be sent.
// It uses an instance of EmailService to handle the actual sending of emails. 
// The queue processes emails at a specified interval (default is 1000 milliseconds).
// The `enqueue` method adds an email to the queue, and the `processQueue` method processes the queue by sending emails one at a time.
// The queue processing is done in a loop that runs at the specified interval, ensuring that emails are sent in the order they were added.
// The class also includes logging to track the status of email processing, including successful sends and errors.