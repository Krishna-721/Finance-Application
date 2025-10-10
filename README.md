# 💰 Financial Chatbot - Full Stack Application

A secure, full-stack personal finance tracking application with an intelligent chatbot that helps users manage expenses, track income, and receive personalized financial advice.

**Project Status**: 🚧 Active Development (Backend: Complete ✅ | Frontend: 60% Complete 🚧)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Security Features](#-security-features)
- [Chatbot Capabilities](#-chatbot-capabilities)
- [Testing](#-testing)
- [Known Issues](#-known-issues)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

### Backend (Complete ✅)

#### 🔐 Authentication & Security
- **JWT Token-based Authentication** - Secure session management with automatic token expiration
- **Bcrypt Password Hashing** - Industry-standard password encryption
- **Protected Routes** - User data isolation ensuring users only access their own information
- **Token Verification Middleware** - Automatic authentication on protected endpoints

#### 💳 Transaction Management (Full CRUD)
- **Create** - Add income and expense transactions with categories
- **Read** - Retrieve all transactions with filtering by type, category, and pagination
- **Update** - Modify existing transaction details
- **Delete** - Remove transactions securely
- **Financial Summary** - Real-time calculation of total income, expenses, and net savings

#### 🤖 Intelligent Chatbot
Natural language processing for financial queries:
- **Balance Inquiries** - "What's my balance?"
- **Category Spending** - "How much did I spend on food?"
- **Income Tracking** - "Show my total income"
- **Recent Activity** - "Show my recent transactions"
- **Savings Advice** - Personalized tips based on spending patterns
- **Expense Analysis** - Identify biggest expenses and spending trends

#### 📊 Analytics & Insights
- Transaction summaries with category breakdowns
- Spending percentage calculations
- Savings rate analysis
- Top spending categories identification

### Frontend (60% Complete 🚧)

#### ✅ Completed Features
- **Authentication System**
  - User registration with validation
  - Login/logout functionality
  - JWT token management
  - Protected routes with authentication guards
  - AuthContext for global state management

- **Dashboard Page**
  - Welcome screen with user information
  - Navigation to transactions page
  - Logout functionality

- **Transactions Page**
  - View all user transactions in a table
  - Add new transactions (income/expense)
  - Delete transactions
  - Financial summary cards (Income, Expenses, Net Savings)
  - Form validation

- **API Integration**
  - Axios setup with JWT token injection
  - Auth API calls (register, login, profile)
  - Transaction CRUD operations
  - Error handling

#### 🚧 In Development
- Chat interface for the intelligent chatbot
- Data visualizations (charts/graphs with Recharts)
- Transaction filtering and search
- Edit transaction functionality
- Category management
- Responsive mobile design improvements
- Loading states and error boundaries
- Budget tracking features

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.104.1
- **Database**: MySQL with SQLAlchemy ORM
- **Authentication**: JWT (python-jose) + Bcrypt
- **Validation**: Pydantic v2
- **Server**: Uvicorn (ASGI)

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.3
- **HTTP Client**: Axios 1.12.2
- **Charts**: Recharts 3.2.1 (pending implementation)
- **Styling**: Inline CSS (planned migration to CSS modules/Tailwind)

---

## 📁 Project Structure

```
Finance-Bot/
│
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI app initialization & CORS
│   │   ├── config.py          # Environment configuration
│   │   ├── database.py        # Database connection & session management
│   │   ├── create_tables.py   # Database initialization script
│   │   │
│   │   ├── models/            # SQLAlchemy database models
│   │   │   ├── user.py
│   │   │   ├── transaction.py
│   │   │   └── chat.py
│   │   │
│   │   ├── schemas/           # Pydantic validation schemas
│   │   │   ├── user.py
│   │   │   ├── transaction.py
│   │   │   └── chat.py
│   │   │
│   │   ├── routes/            # API endpoints
│   │   │   ├── auth.py
│   │   │   ├── transactions.py
│   │   │   └── chat.py
│   │   │
│   │   ├── services/          # Business logic layer
│   │   │   ├── auth_service.py
│   │   │   ├── transaction_service.py
│   │   │   └── chatbot_service.py
│   │   │
│   │   └── utils/             # Utility functions
│   │       ├── security.py
│   │       └── dependencies.py
│   │
│   ├── .env.example           # Environment variables template
│   ├── requirements.txt       # Python dependencies
│   └── seed_data.py          # Sample data generation script
│
└── frontend/                  # React Frontend
    ├── public/
    │   └── vite.svg
    │
    ├── src/
    │   ├── assets/           # Static assets
    │   │   └── react.svg
    │   │
    │   ├── context/          # React Context
    │   │   └── AuthContext.jsx
    │   │
    │   ├── pages/            # Main pages
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Transactions.jsx
    │   │
    │   ├── services/         # API integration
    │   │   └── api.js
    │   │
    │   ├── App.jsx           # Main app component
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    │
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🔧 Backend Setup

### Prerequisites
- Python 3.8+
- MySQL Server
- pip (Python package manager)

### Installation Steps

#### 1. Navigate to Backend Directory
```bash
cd backend
```

#### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 4. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/finance_bot

SECRET_KEY=your-super-secret-key-generate-random-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

ENVIRONMENT=development
```

**Generate a secure SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

#### 5. Create Database
```sql
CREATE DATABASE finance_bot;
```

#### 6. Initialize Database Tables
```bash
python -m app.create_tables
```

#### 7. Run the Server
```bash
uvicorn app.main:app --reload
```

Backend server will start at: **http://127.0.0.1:8000**

#### 8. (Optional) Seed Sample Data
```bash
python seed_data.py
```

Creates 5 sample users with 10-15 transactions each.

**Sample Credentials:**
- alice@example.com / alice123
- bob@example.com / smithysmudge
- charlie@example.com / charlie123

---

## 🌐 Frontend Setup

### Prerequisites
- Node.js 16+ and npm
- Backend server running at `http://localhost:8000`

### Installation Steps

#### 1. Navigate to Frontend Directory
```bash
cd frontend
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start Development Server
```bash
npm run dev
```

Frontend will run at: **http://localhost:5173**

#### 4. Other Commands
```bash
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📚 API Documentation

Once the backend server is running, access interactive API documentation:

- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

### Key Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and receive JWT token
- `GET /auth/me` - Get current user profile (Protected)

#### Transactions
- `POST /transactions/` - Create new transaction (Protected)
- `GET /transactions/` - Get all user transactions with filters (Protected)
- `GET /transactions/summary` - Get financial summary (Protected)
- `GET /transactions/{id}` - Get specific transaction (Protected)
- `PUT /transactions/{id}` - Update transaction (Protected)
- `DELETE /transactions/{id}` - Delete transaction (Protected)

#### Chatbot
- `POST /chat/` - Send message to chatbot (Protected)
- `GET /chat/history` - Get chat history (Protected)

### Example API Requests

**Register User:**
```bash
curl -X POST "http://127.0.0.1:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepass123",
    "full_name": "John Doe"
  }'
```

**Login:**
```bash
curl -X POST "http://127.0.0.1:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepass123"
  }'
```

**Create Transaction (Protected):**
```bash
curl -X POST "http://127.0.0.1:8000/transactions/" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 150.00,
    "type": "expense",
    "category": "Food",
    "description": "Grocery shopping",
    "date": "2025-10-10T10:30:00"
  }'
```

**Chat with Bot (Protected):**
```bash
curl -X POST "http://127.0.0.1:8000/chat/" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What's my balance?"
  }'
```

---

## 📦 Database Schema

### Users Table
```sql
- id (PK, Auto-increment)
- email (Unique, Indexed)
- hashed_password
- full_name
- is_active
- created_at
```

### Transactions Table
```sql
- id (PK, Auto-increment)
- user_id (FK → users.id)
- amount
- type (ENUM: income/expense)
- category
- description
- date
- created_at
- updated_at
```

### Chat Messages Table
```sql
- id (PK, Auto-increment)
- user_id (FK → users.id)
- user_message
- bot_response
- intent
- created_at
```

---

## 🔒 Security Features

- **Password Security**: Bcrypt hashing with salt (never store plain text)
- **JWT Tokens**: Stateless authentication with configurable expiration
- **CORS Protection**: Configured for frontend at `http://localhost:5173`
- **SQL Injection Prevention**: SQLAlchemy ORM parameterized queries
- **User Data Isolation**: Database queries filtered by user_id
- **Input Validation**: Pydantic schemas validate all inputs

### Authentication Flow

```
1. User visits "/" → Redirected to Login page
2. User registers/logs in → Receives JWT token
3. Token stored in localStorage
4. Token included in all API requests (via Axios interceptor)
5. Protected routes check token validity
6. Invalid/missing token → Redirect to login
```

---

## 🤖 Chatbot Capabilities

The chatbot understands various intents and provides intelligent responses:

| Intent | Example Queries | Response |
|--------|----------------|----------|
| Balance | "What's my balance?", "Show summary" | Total income, expenses, net savings |
| Category Spending | "How much did I spend on food?" | Category-specific totals & averages |
| Total Spending | "How much have I spent?" | Total expenses + top 3 categories |
| Income | "Show my income", "How much did I earn?" | Total income summary |
| Recent Transactions | "Show recent transactions" | Last 5 transactions |
| Savings Advice | "Give me savings tips" | Personalized advice based on spending |
| Biggest Expense | "What's my biggest expense?" | Largest single transaction |

**Response Features:**
- 📊 Formatted text with emojis
- 💰 Percentage-based insights
- 📈 Trend analysis
- 💡 Actionable recommendations

---

## 🧪 Testing

### Backend Testing

#### Manual Testing with Sample Data
```bash
cd backend
python seed_data.py
```

Creates 5 sample users with 10-15 transactions each.

#### API Testing
Use the interactive Swagger UI at `/docs` or tools like:
- Postman
- Thunder Client (VS Code)
- curl commands

### Frontend Testing

#### Manual Testing Workflow

1. **Start Backend Server**
```bash
cd backend
uvicorn app.main:app --reload
```

2. **Seed Test Data** (Optional)
```bash
python seed_data.py
```

3. **Start Frontend**
```bash
cd frontend
npm run dev
```

4. **Test Authentication**
   - Register a new account
   - Login with credentials
   - Verify redirect to dashboard

5. **Test Transactions**
   - Add income transaction
   - Add expense transaction
   - View financial summary
   - Delete transaction

### Sample Test Credentials
If you ran `seed_data.py`:
- alice@example.com / alice123
- bob@example.com / smithysmudge
- charlie@example.com / charlie123

---

## 🐛 Known Issues

### Backend
✅ **No known critical issues** - Backend is production-ready

### Frontend

1. **Summary Display Bug** ⚠️
   - **Location**: `frontend/src/pages/Transactions.jsx` line 36
   - **Issue**: `transactionAPI(summaryRes.data)` called instead of `setSummary(summaryRes.data)`
   - **Impact**: Financial summary cards don't display
   - **Fix**: 
   ```javascript
   // Change this:
   transactionAPI(summaryRes.data);
   
   // To this:
   setSummary(summaryRes.data);
   ```

2. **No Edit Functionality** - Users can only delete, not update transactions

3. **Limited Styling** - Inline CSS makes maintenance difficult

4. **No Loading States** - Poor UX during API calls

5. **No Error Boundaries** - App crashes on unexpected errors

6. **Chat Not Implemented** - Chatbot feature missing despite backend API being ready

---

## 🚀 Deployment

### Backend Deployment

#### Production Checklist
- [ ] Set `echo=False` in database.py
- [ ] Generate strong SECRET_KEY
- [ ] Update CORS origins for production domain
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure proper logging
- [ ] Use production-grade ASGI server (Gunicorn)

#### Environment Variables for Production
```env
DATABASE_URL=mysql+pymysql://user:pass@production-db:3306/finance_bot
SECRET_KEY=production-secret-key-at-least-32-characters
ENVIRONMENT=production
```

#### Deployment Options
- **AWS EC2** - Full control with Linux server
- **Heroku** - Simple deployment with add-ons
- **Railway** - Modern platform with automatic deployments
- **DigitalOcean** - Affordable VPS hosting

### Frontend Deployment

#### Production Build
```bash
cd frontend
npm run build
```

Generates optimized files in `dist/` folder.

#### Environment Variables
Create `.env` file for production:
```env
VITE_API_BASE_URL=https://your-backend-api.com
```

Update `src/services/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
```

#### Deployment Options
- **Vercel** - Zero-config deployment for React apps
- **Netlify** - Continuous deployment from Git
- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Scalable hosting with CDN

---

## 🗺️ Development Roadmap

### Phase 1: Frontend Completion (Current)
- [x] Authentication system
- [x] Transaction CRUD (partial)
- [ ] Fix summary display bug
- [ ] Add loading indicators
- [ ] Implement error boundaries
- [ ] Chat interface implementation

### Phase 2: Enhanced Features
- [ ] Transaction edit functionality
- [ ] Filtering and search
- [ ] Data visualizations with Recharts
- [ ] Category management with icons
- [ ] Mobile responsive design

### Phase 3: Polish & UX
- [ ] Migrate to Tailwind CSS
- [ ] Animations and transitions
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Performance optimization
- [ ] Dark/light theme toggle

### Phase 4: Advanced Features
- [ ] Budget tracking and alerts
- [ ] Recurring transactions
- [ ] Export data (CSV, PDF)
- [ ] Multi-currency support
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] ML-based spending predictions

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

**Backend:**
- Follow PEP 8 style guide
- Add docstrings to all functions
- Write unit tests for new features
- Update API documentation

**Frontend:**
- Keep components small and focused
- Use functional components with hooks
- Follow ESLint rules
- Write meaningful commit messages

---

## 🔧 Troubleshooting

### Common Issues

**Cannot connect to backend**
```
Solution: Ensure backend is running at http://localhost:8000
Check: curl http://localhost:8000/health
```

**Token expired errors**
```
Solution: Logout and login again to refresh token
```

**CORS errors**
```
Solution: Verify backend CORS settings allow http://localhost:5173
Check: backend/app/main.py allow_origins configuration
```

**Database connection errors**
```
Solution: Verify MySQL is running and credentials are correct
Check: backend/.env DATABASE_URL configuration
```

**Frontend changes not reflecting**
```
Solution: Hard refresh browser (Ctrl+Shift+R)
Clear localStorage and restart dev server
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Vamshi Krishna Gourwar**

- **GitHub**: [@Krishna-721](https://github.com/Krishna-721)
- **LinkedIn**: [vamshi-krishna-gourwar](https://linkedin.com/in/vamshi-krishna-gourwar-9a11712b2)
- **Email**: vamshikrishnagourwar@gmail.com

---

## 🙏 Acknowledgments

- FastAPI for the amazing Python framework
- SQLAlchemy for robust database ORM
- React and Vite for modern frontend development
- The Python and JavaScript communities for excellent libraries and support

---

## 📊 Project Statistics

- **Backend**: 100% Complete ✅
- **Frontend**: 60% Complete 🚧
- **Overall Progress**: ~80%
- **Lines of Code**: ~3,500+
- **API Endpoints**: 11
- **Database Tables**: 3
- **React Components**: 5

---

**⭐ If you find this project helpful, please give it a star!**

**Last Updated**: October 2025 | **Status**: Active Development
