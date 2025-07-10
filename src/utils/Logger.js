class Logger {
  static info(msg) {
    console.log(`[INFO] ${msg}`);
  }

  static error(msg) {
    console.error(`[ERROR] ${msg}`);
  }
}
module.exports = Logger;
// This code defines a Logger class with static methods for logging informational and error messages.
// The `info` method logs messages with an `[INFO]` prefix, while the `error` method logs messages with an `[ERROR]` prefix.
// This is useful for debugging and monitoring the application, allowing developers to easily distinguish between different types of log messages.
// The class can be extended to include additional logging levels or features, such as logging to a file or external service.
// The Logger class can be used throughout the application to provide consistent logging functionality, making it easier to track application behavior and diagnose issues.
// It can be integrated with other utilities or frameworks to enhance logging capabilities, such as adding timestamps, log levels, or formatting options.
// The Logger class can be imported and used in other parts of the application to log messages, errors, or other important information, providing a centralized logging solution.
// This implementation is suitable for applications that require logging, such as web servers, background jobs, or any other components that need to track events or errors.
// The Logger class can be easily extended or modified to include additional features, such as log rotation, filtering, or integration with logging frameworks like Winston or Bunyan.
// It can also be used in conjunction with monitoring tools to provide insights into application performance and behavior