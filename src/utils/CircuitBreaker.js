class CircuitBreaker {
  constructor(failureThreshold = 3, cooldownTime = 10000) {
    this.failureThreshold = failureThreshold; // e.g., fail 3 times before opening
    this.cooldownTime = cooldownTime;         // cooldown period in ms

    this.failureCount = 0;
    this.state = 'CLOSED'; // CLOSED -> OPEN -> HALF-OPEN -> CLOSED
    this.lastFailureTime = null;
  }

  canRequest() {
    if (this.state === 'OPEN') {
      const now = Date.now();
      if (now - this.lastFailureTime > this.cooldownTime) {
        this.state = 'HALF_OPEN';
        return true;
      }
      return false;
    }
    return true;
  }

  success() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  failure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      console.log('[CircuitBreaker] OPEN - too many failures');
    }
  }

  getState() {
    return this.state;
  }
}

module.exports = CircuitBreaker;
// This code defines a CircuitBreaker class that implements a circuit breaker pattern.
// The class constructor takes two parameters: `failureThreshold`, which is the number of consecutive failures required to open the circuit, and `cooldownTime`, which is the time in milliseconds before the circuit can transition from OPEN to HALF-OPEN.
// The `canRequest` method checks if a request can be made based on the current state of the circuit breaker.
// If the circuit is OPEN, it checks if the cooldown period has passed; if so, it transitions to HALF-OPEN and allows the request.
// The `success` method resets the failure count and sets the state back to CLOSED when a request is successful.
// The `failure` method increments the failure count and updates the last failure time when a request fails.
// If the failure count reaches the threshold, it transitions the state to OPEN and logs a message indicating that the circuit is open due to too many failures.
// The `getState` method returns the current state of the circuit breaker, which can be used to monitor its status.
// This implementation is useful for managing external service calls, preventing excessive load on services that are experiencing failures, and allowing the system to recover gracefully.
// The CircuitBreaker class can be used in various scenarios, such as API calls, database connections, or any other external dependencies that may fail intermittently.
// It can be integrated into larger systems to provide resilience and fault tolerance, ensuring that the application can handle failures gracefully without overwhelming the external services.
// The class can be extended to include additional features, such as logging, metrics collection, or integration with monitoring tools to track the performance and health of the circuit breaker.
// This implementation is suitable for applications that require robust error handling and resilience, such as microservices architectures.