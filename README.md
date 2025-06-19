# 🔐 Next.js Multi-Step Login App with Secure Word, MFA, and Transaction Table

This is a modern full-stack **Next.js 14 App Router** project that demonstrates a **multi-step login flow** with:
- Secure Word Authentication
- Password hashing
- MFA Verification
- JWT-style mock sessions
- Protected dashboard showing a **transaction table** from a mock API

---

## 🚀 Features

- ✅ Multi-step login flow (username → secure word → password → MFA)
- ✅ Secure word expires in 60 seconds and rate-limited to 10 seconds
- ✅ MFA verification (mock TOTP)
- ✅ In-memory auth/session management (no DB)
- ✅ Protected dashboard with a transaction history table
- ✅ Fully styled with Tailwind CSS 3
- ✅ Built with App Router (client components + API routes)

---

## 📁 Folder Structure
├── app/
│ ├── login/ # Multi-step login UI
│ ├── dashboard/ # Protected dashboard with table
│ └── layout.tsx
├── pages/api/ # API routes
│ ├── getSecureWord.ts
│ ├── login.ts
│ └── verifyMfa.ts
├── lib/
│ ├── auth.ts # Secure word, hashing, MFA utils
│ └── store.ts # In-memory session/map storage
├── public/
├── tailwind.config.js
└── README.md


---

## 🧑‍💻 Getting Started

### ✅ Prerequisites

- Node.js 18+
- npm or yarn

---

### 📦 Installation

# Install dependencies
npm install


