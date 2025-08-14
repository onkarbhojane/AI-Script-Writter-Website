
# AI Script Writer 🎬

A web-based SaaS platform that allows users to generate full scripts automatically using AI, based on either their own story ideas or built-in AI-generated story templates. Built with React, Node.js, and powered by DeepSeek R1 via Ollama for local AI processing.

## 📋 Table of Contents

* [Overview](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#overview)
* [Features](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#features)
* [Tech Stack](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#tech-stack)
* [Architecture](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#architecture)
* [Prerequisites](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#prerequisites)
* [Installation](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#installation)
* [Configuration](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#configuration)
* [Usage](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#usage)
* [API Documentation](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#api-documentation)
* [Deployment](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#deployment)
* [Contributing](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#contributing)
* [License](https://claude.ai/chat/1bb5ee39-7d8d-4a16-8d17-0724bd75bfc7#license)

## 🎯 Overview

AI Script Writer is a comprehensive SaaS platform that democratizes script writing by leveraging AI technology. Users can generate professional scripts either from their custom story ideas or by selecting from pre-built AI-generated story templates. The platform features a robust subscription model, script management system, and multi-format export capabilities.

**Key Differentiators:**

* Local AI processing using DeepSeek R1 via Ollama for enhanced privacy and performance
* Dual script generation modes (Custom Story & AI Story templates)
* Multi-format export (PDF, TXT, DOCX)
* Subscription-based monetization with Stripe integration
* Responsive, modern UI with TailwindCSS

## ✨ Features

### 🔐 User Management

* **Secure Authentication** : JWT-based authentication system
* **Persistent Sessions** : Local storage for seamless user experience
* **Account Dashboard** : Comprehensive user profile and subscription management

### 📝 Script Generation

* **Custom Story Mode** : Input your story idea and generate complete scripts
* **AI Story Mode** : Select from pre-built AI-generated story templates
* **Real-time Processing** : Instant script generation powered by DeepSeek R1
* **Script Customization** : Edit and refine generated scripts

### 📚 Script Management

* **Save & Organize** : Store scripts in your personal library
* **CRUD Operations** : View, edit, delete, and manage all saved scripts
* **Search & Filter** : Find scripts quickly with built-in search functionality
* **Version History** : Track changes and maintain script versions

### 📤 Export & Sharing

* **Multi-format Export** : Download scripts in PDF, TXT, and DOCX formats
* **Easy Sharing** : Share scripts with collaborators and production teams
* **Professional Formatting** : Industry-standard script formatting

### 💳 Subscription System

* **Free Tier** : 5 scripts per month for new users
* **Paid Plans** : Unlimited script generation and premium features
* **Stripe Integration** : Secure payment processing
* **Usage Analytics** : Track script generation and subscription metrics

## 🛠 Tech Stack

### Frontend

* **Framework** : React.js 18+
* **Styling** : TailwindCSS
* **Routing** : React Router DOM
* **UI Components** : ShadCN UI / Radix UI
* **State Management** : React Query
* **HTTP Client** : Axios
* **Payment** : Stripe.js

### Backend

* **Runtime** : Node.js
* **Framework** : Express.js
* **Database** : MongoDB with Mongoose ODM
* **Authentication** : JWT (JSON Web Tokens)
* **AI Integration** : LangChain.js + DeepSeek R1 (via Ollama)
* **Payment Processing** : Stripe API
* **File Processing** : PDFKit, Docx, File-saver

### AI & Processing

* **AI Model** : DeepSeek R1 (locally hosted via Ollama)
* **AI Framework** : LangChain.js
* **Local Processing** : Ollama server for privacy and performance

### DevOps & Deployment

* **Frontend Hosting** : Vercel / Netlify
* **Backend Hosting** : Render / Railway / AWS EC2
* **Database** : MongoDB Atlas
* **CDN** : Cloudflare
* **Process Management** : PM2

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Layer      │
│   (React)       │───▶│   (Node.js)     │───▶│   (DeepSeek R1) │
│                 │    │                 │    │   via Ollama    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   TailwindCSS   │    │   MongoDB       │    │   LangChain.js  │
│   ShadCN UI     │    │   JWT Auth      │    │   Local Models  │
│   Stripe.js     │    │   Stripe API    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js** (v18.0.0 or higher)
* **npm** or **yarn**
* **MongoDB** (local installation or MongoDB Atlas account)
* **Ollama** (for local AI processing)
* **Git**

### Ollama Setup

1. Install Ollama from [https://ollama.ai](https://ollama.ai/)
2. Pull DeepSeek R1 model:
   ```bash
   ollama pull deepseek-r1
   ```
3. Start Ollama server:
   ```bash
   ollama serve
   ```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-script-writer.git
cd ai-script-writer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ai-script-writer
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-script-writer

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=deepseek-r1

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_ID_BASIC=price_basic_plan_id
STRIPE_PRICE_ID_PRO=price_pro_plan_id

# CORS
FRONTEND_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=5000000
ALLOWED_FILE_TYPES=pdf,txt,docx

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables

Create a `.env` file in the frontend directory:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_API_VERSION=v1

# Stripe Configuration
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key

# App Configuration
REACT_APP_APP_NAME=AI Script Writer
REACT_APP_MAX_FREE_SCRIPTS=5
REACT_APP_SUPPORTED_FORMATS=pdf,txt,docx

# Development
REACT_APP_DEBUG=true
```

## 🏃‍♂️ Usage

### Development Mode

1. **Start MongoDB** (if using local installation)

   ```bash
   mongod
   ```
2. **Start Ollama Server**

   ```bash
   ollama serve
   ```
3. **Start Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will run on `http://localhost:5000`
4. **Start Frontend Development Server**

   ```bash
   cd frontend
   npm start
   ```

   The frontend will run on `http://localhost:3000`

### Production Mode

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```
2. **Start Backend in Production**
   ```bash
   cd backend
   npm start
   ```

## 📁 Project Structure

```
ai-script-writer/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── ui/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ScriptEditor.jsx
│   │   │   ├── SubscriptionPlans.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Workspace.jsx
│   │   │   ├── MyScripts.jsx
│   │   │   └── PaymentSuccess.jsx
│   │   ├── api/
│   │   │   ├── authApi.js
│   │   │   ├── scriptApi.js
│   │   │   └── paymentApi.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useScripts.js
│   │   ├── utils/
│   │   │   ├── formatDate.js
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── ollama.js
│   │   │   └── stripe.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Script.js
│   │   │   └── Subscription.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── scriptRoutes.js
│   │   │   └── paymentRoutes.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── scriptController.js
│   │   │   └── paymentController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   ├── rateLimiter.js
│   │   │   └── validation.js
│   │   ├── services/
│   │   │   ├── aiService.js
│   │   │   ├── subscriptionService.js
│   │   │   └── emailService.js
│   │   ├── utils/
│   │   │   ├── tokenUtils.js
│   │   │   ├── fileExport.js
│   │   │   └── logger.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
├── .gitignore
├── README.md
└── package.json
```

## 🔌 API Documentation

### Authentication Endpoints

#### POST /api/auth/register

Register a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "subscription": {
      "plan": "free",
      "scriptsRemaining": 5
    }
  }
}
```

#### POST /api/auth/login

Authenticate user and receive JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Script Endpoints

#### POST /api/scripts/generate

Generate a new script using AI.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Request Body:**

```json
{
  "mode": "custom", // or "template"
  "storyIdea": "A story about...",
  "templateId": "template_id", // if mode is "template"
  "genre": "drama",
  "length": "short" // short, medium, long
}
```

#### GET /api/scripts

Get all user scripts.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Query Parameters:**

* `page`: Page number (default: 1)
* `limit`: Items per page (default: 10)
* `search`: Search term

### Payment Endpoints

#### POST /api/payments/create-subscription

Create a new subscription.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Request Body:**

```json
{
  "priceId": "price_basic_plan_id",
  "paymentMethodId": "pm_stripe_payment_method_id"
}
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Connect Repository**
   * Connect your GitHub repository to Vercel
   * Set build command: `npm run build`
   * Set output directory: `build`
2. **Environment Variables**
   * Add all `REACT_APP_*` variables from your `.env` file

### Backend Deployment (Render/Railway)

1. **Prepare for Production**
   ```bash
   cd backend
   npm run build
   ```
2. **Environment Variables**
   * Add all environment variables from your `.env` file
   * Ensure `MONGODB_URI` points to MongoDB Atlas
   * Update `FRONTEND_URL` to your deployed frontend URL
3. **Ollama in Production**
   For production deployment with Ollama:
   * Use a dedicated server or VPS with Ollama installed
   * Configure `OLLAMA_BASE_URL` to point to your Ollama server
   * Ensure proper security and access controls

### Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Create a database user
3. Add your deployment IPs to the whitelist
4. Update `MONGODB_URI` in your environment variables

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/yourusername/ai-script-writer.git
   ```
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

* Follow ESLint and Prettier configurations
* Write unit tests for new features
* Update documentation for API changes
* Use conventional commit messages

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://claude.ai/chat/LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Ollama Connection Issues**
   ```bash
   # Check if Ollama is running
   curl http://localhost:11434/api/version

   # Restart Ollama
   ollama serve
   ```
2. **MongoDB Connection Issues**
   * Verify MongoDB is running locally or Atlas connection string is correct
   * Check network connectivity and firewall settings
3. **Stripe Webhook Issues**
   * Use Stripe CLI for local testing:
     ```bash
     stripe listen --forward-to localhost:5000/api/payments/webhook
     ```
4. **Build Issues**
   * Clear node_modules and reinstall:
     ```bash
     rm -rf node_modules package-lock.jsonnpm install
     ```

## 📞 Support

For support and questions:

* Create an issue on GitHub
* Email: support@aiscriptwriter.com
* Documentation: [docs.aiscriptwriter.com](https://docs.aiscriptwriter.com/)

## 🙏 Acknowledgments

* DeepSeek team for the excellent R1 model
* Ollama team for local AI hosting solution
* React and Node.js communities
* All contributors and users

---

**Made with ❤️ by [Your Name]**

*Transform your stories into professional scripts with the power of AI*
