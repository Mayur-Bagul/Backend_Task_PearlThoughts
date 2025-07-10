const EmailService = require('../src/services/EmailService');

describe('EmailService', () => {
  it('should send email successfully', async () => {
    const service = new EmailService();
    const response = await service.send({ id: '1', to: 'a@test.com' });
    expect(response.status).toBe('sent');
  });

  it('should return duplicate if already sent', async () => {
    const service = new EmailService();
    await service.send({ id: '2', to: 'b@test.com' });
    const response = await service.send({ id: '2', to: 'b@test.com' });
    expect(response.status).toBe('duplicate');
  });
});