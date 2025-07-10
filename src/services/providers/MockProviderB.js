class MockProviderB {
  async sendEmail(email) {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Simulate random failure with 60% success rate
    const isSuccess = Math.random() < 0.6;

    if (isSuccess) {
      return {
        success: true,
        provider: 'ProviderB',
        message: `Email sent to ${email.to} using ProviderB`,
      };
    } else {
      throw new Error('ProviderB failed to send email');
    }
  }
}

module.exports = MockProviderB;
// This code defines a mock email provider that simulates sending an email.
// It randomly succeeds 60% of the time and fails 40% of the time, 
// throwing an error in the latter case.
// This is useful for testing the resilience of the email service against provider failures.
// The class is exported so it can be used in tests or other parts of the application.
// The `sendEmail` method simulates the email sending process and returns a success response or throws an error based on a random condition.
// This mock provider can be used in unit tests to simulate different scenarios, such as successful email sending or failures, allowing developers to test the resilience and error handling of the email service without relying on an actual email provider.
// The method also simulates network latency by introducing a delay of 300 milliseconds before sending the email, which can help in testing how the email service handles delays and timeouts in real-world scenarios.
