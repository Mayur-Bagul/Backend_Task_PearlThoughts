# Resilient Email Sending Service

## Features
- Retry with exponential backoff
- Provider fallback
- Idempotency
- Rate limiting
- Status tracking
- Logging

## 🏗️ Folder Structure
resilient-email-service/
├── src/
│ ├── index.js
│ ├── services/
│ │ ├── EmailService.js
│ │ └── providers/
│ │ ├── MockProviderA.js
│ │ └── MockProviderB.js
│ ├── utils/
│ │ ├── Logger.js
│ │ ├── RateLimiter.js
│ │ └── CircuitBreaker.js
│ ├── queue/
│ │ └── EmailQueue.js
│ └── store/
│ └── StatusStore.js
├── test/
│ └── EmailService.test.js
├── package.json
├── jest.config.js
└── README.md

---

## 📦 Installation

```bash
git clone https://github.com/Mayur-Bagul/resilient-email-service.git
cd resilient-email-service
npm install
💻 Running the Server
bash
npm run dev
Server runs at: http://localhost:3000

🧪 API Usage
Endpoint
bash
POST /send-email
Request
json
{
  "id": "email-001",
  "to": "user1@gmail.com"
}
Response (Queued)
json
{
  "status": "queued",
  "id": "email-001"
}
🧠 How It Works
Emails are queued and processed one by one.

Each send is:

Rate-limited

Checked for duplicates (idempotent)

Attempted with retry + exponential backoff

Switched to fallback provider on failure

Tracked with status (stored in memory)

Logged for observability

🧪 Running Tests
bash
npm test
Tests located in /test folder using Jest.

🌐 Deployment
You can deploy on:

Railway

Render

Heroku

Set entry point as src/index.js and use port 3000.

📋 Assumptions
Only mock providers used; real emails are not sent.

Status & rate limiting are stored in memory.

Each email must include a unique id.



📄 License
MIT © 2025 Mayur Bagul
