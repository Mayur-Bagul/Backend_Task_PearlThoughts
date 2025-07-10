class MockProviderA {
  async sendEmail(email) {
  if (Math.random() < 0.7) {
     return { success: true, provider: 'ProviderA' };
    } 
    throw new Error('ProviderA failed');
  }
}
module.exports = MockProviderA;
// This code defines a mock email provider that simulates sending an email.
// It randomly succeeds 70% of the time and fails 30% of the time, throwing an error in the latter case.
// This is useful for testing the resilience of the email service against provider failures.
// The class is exported so it can be used in tests or other parts of the application.  
// The `sendEmail` method simulates the email sending process and returns a success response or throws an error based on a random condition.
// This mock provider can be used in unit tests to simulate different scenarios, such as successful email sending or failures, allowing developers to test the resilience and error handling of the email service without relying on an actual email provider.
