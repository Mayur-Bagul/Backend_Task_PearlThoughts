class StatusStore {
  constructor() {
    this.statusMap = new Map();
  }

  isProcessed(id) {
    return this.statusMap.has(id);
  }

  get(id) {
    return this.statusMap.get(id);
  }

  set(id, result) {
    this.statusMap.set(id, result);
  }
}
module.exports = StatusStore;
// This code defines a StatusStore class that manages the status of email processing.
// It uses a Map to store the status of each email by its ID, allowing for quick lookups and updates.
// The class provides methods to check if an email has been processed, retrieve its status, and set its status.
// This is useful for preventing duplicate processing of emails and tracking their status throughout the sending process.
// The `isProcessed` method checks if an email with a given ID has already been processed.
// The `get` method retrieves the status of an email by its ID, and the `set` method updates the status of an email in the store.
// This class can be used in an email service to manage the state of email sending operations, preventing duplicate processing and ensuring accurate tracking of email statuses.
// The `StatusStore` class can be integrated into an email service to maintain the state of email sending operations, ensuring that each email is processed only once and its status is accurately tracked.
// This is particularly useful in scenarios where multiple providers are used to send emails, as it helps avoid confusion and ensures that the service can handle retries and failures gracefully.
// The class can be extended or modified to include additional features, such as expiration of old statuses or integration with a database for persistent storage.
// It can also be used in conjunction with other utilities, such as rate limiters or retry mechanisms, to build a robust and resilient email service.