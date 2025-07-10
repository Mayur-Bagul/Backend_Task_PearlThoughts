const MockProviderA = require('./providers/MockProviderA');
const MockProviderB = require('./providers/MockProviderB');
const RateLimiter = require('../utils/RateLimiter');
const StatusStore = require('../store/StatusStore');
const CircuitBreaker = require('../utils/CircuitBreaker');
const Logger = require('../utils/Logger');

class EmailService {
  constructor() {
    this.providers = [new MockProviderA(), new MockProviderB()];
    this.statusStore = new StatusStore();
    this.rateLimiter = new RateLimiter(5, 10000); // 5 emails per 10 seconds
    this.circuitBreakers = this.providers.map(() => new CircuitBreaker());
  }

  async send(email) {
    const emailId = email.id;

    // Idempotency check
    if (this.statusStore.isProcessed(emailId)) {
      Logger.info(`Duplicate email attempt detected for ID: ${emailId}`);
      return { status: 'duplicate', info: this.statusStore.get(emailId) };
    }

    // Rate limit check
    if (!this.rateLimiter.allow()) {
      Logger.error('Rate limit exceeded');
      return { status: 'rate_limited', error: 'Too many requests' };
    }

    // Iterate through providers with circuit breaker and retry
    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      const breaker = this.circuitBreakers[i];

      if (!breaker.canRequest()) {
        Logger.info(`Skipping Provider ${i + 1} due to open circuit`);
        continue;
      }

      try {
        const result = await this.retryWithBackoff(() =>
          provider.sendEmail(email)
        );
        breaker.success();
        this.statusStore.set(emailId, result);
        Logger.info(`Email sent via Provider ${i + 1}`);
        return { status: 'sent', result };
      } catch (error) {
        breaker.failure();
        Logger.error(`Provider ${i + 1} failed: ${error.message}`);
        if (i === this.providers.length - 1) {
          this.statusStore.set(emailId, { error: error.message });
          return { status: 'failed', error: error.message };
        }
      }
    }
  }

  async retryWithBackoff(fn, retries = 3) {
    let delay = 500;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        if (attempt === retries) throw err;
        Logger.info(`Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      }
    }
  }
}

module.exports = EmailService;

// This code defines an EmailService class that manages email sending through multiple providers.
// It includes methods for sending emails, handling retries with exponential backoff, and rate limiting.
// The service uses mock providers for testing purposes, simulating email sending with random success and failure rates.
// The service also maintains a status store to track the status of each email sent, preventing duplicate processing.
// The `send` method checks if the email has already been processed, applies rate limiting, and attempts to send the email through each provider in sequence until one succeeds or all fail.
// The `retryWithBackoff` method implements a retry mechanism with exponential backoff, allowing the service to handle transient errors gracefully.
// The service logs the status of each email sent, including successes and failures, using a Logger utility.
// The `StatusStore` utility is used to keep track of the status of each email, ensuring that duplicate emails are not processed multiple times.
// The `RateLimiter` utility is used to limit the number of email requests within a specified time frame, preventing abuse of the service.
// This implementation is useful for building a resilient email service that can handle failures and retries effectively, while also providing a clear status of each email sent.
// The service can be extended to include more providers or additional features such as email templates, attachments, or advanced error handling as needed.
// The EmailService class can be instantiated and used in other parts of the application to send emails, manage provider failures, and ensure that email sending is resilient and efficient.
// The class is designed to be easily testable, allowing developers to mock providers and test different scenarios without relying on actual email sending.
// This implementation is suitable for applications that require reliable email delivery, such as notification systems, user communications, or transactional email services.
// The EmailService class can be integrated into larger applications, providing a robust solution for email management and delivery.