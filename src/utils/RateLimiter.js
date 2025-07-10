class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.timestamps = [];
  }

  allow() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(ts => now - ts < this.windowMs);
    if (this.timestamps.length >= this.limit) return false;
    this.timestamps.push(now);
    return true;
  }
}
module.exports = RateLimiter;
// This code defines a RateLimiter class that implements a simple rate limiting mechanism.
// The class constructor takes two parameters: `limit`, which is the maximum number of requests allowed within a specified time window, and `windowMs`, which is the duration of that time window in milliseconds.
// The `allow` method checks if a new request can be allowed based on the current timestamps of previous requests.
// It filters out timestamps that are older than the specified time window, and if the number of remaining timestamps is less than the limit, it allows the new request by adding the current timestamp to the list.
// If the limit is reached, it returns false, indicating that the request should be denied.