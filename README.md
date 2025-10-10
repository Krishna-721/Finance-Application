# 💰 Financial Chatbot - Backend API

A secure, full-stack personal finance tracking application with an intelligent chatbot that helps users manage expenses, track income, and receive personalized financial advice.

## 🚀 Features

### 🔐 Authentication & Security
- **JWT Token-based Authentication** - Secure session management with automatic token expiration
- **Bcrypt Password Hashing** - Industry-standard password encryption
- **Protected Routes** - User data isolation ensuring users only access their own information
- **Token Verification Middleware** - Automatic authentication on protected endpoints

### 💳 Transaction Management (Full CRUD)
- **Create** - Add income and expense transactions with categories
- **Read** - Retrieve all transactions with filtering by type, category, and pagination
- **Update** - Modify existing transaction details
- **Delete** - Remove transactions securely
- **Financial Summary** - Real-time calculation of total income, expenses, and net savings

### 🤖 Intelligent Chatbot
Natural language processing for financial queries:
- **Balance Inquiries** - "What's my balance?"
- **Category Spending** - "How much did I spend on food?"
- **Income Tracking** - "Show my total income"
- **Recent Activity** - "Show my recent transactions"
- **Savings Advice** - Personalized tips based on spending patterns
- **Expense Analysis** - Identify biggest expenses and spending trends

### 📊 Analytics & Insights
- Transaction summaries with category breakdowns
- Spending percentage calculations
- Savings rate analysis
- Top spending categories identification

## 🛠️ Tech Stack

- **Framework**: FastAPI 0.104.1
- **Database**: MySQL with SQLAlchemy ORM
- **Authentication**: JWT (python-jose) + Bcrypt
- **Validation**: Pydantic v2
- **Server**: Uvicorn (ASGI)

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app initialization & CORS
│   ├── config.py               # Environment configuration
│   ├── database.py             # Database connection & session management
│   ├── create_tables.py        # Database initialization script
│   │
│   ├── models/                 # SQLAlchemy database models
│   │   ├── user.py            # User model
│   │   ├── transaction.py     # Transaction model
│   │   └── chat.py            # ChatMessage model
│   │
│   ├── schemas/                # Pydantic validation schemas
│   │   ├── user.py            # User validation schemas
│   │   ├── transaction.py     # Transaction schemas
│   │   └── chat.py            # Chat schemas
│   │
│   ├── routes/                 # API endpoints
│   │   ├── auth.py            # /auth/* - Registration, login, profile
│   │   ├── transactions.py    # /transactions/* - CRUD operations
│   │   └── chat.py            # /chat/* - Chatbot interactions
│   │
│   ├── services/               # Business logic layer
│   │   ├── auth_service.py    # Authentication logic
│   │   ├── transaction_service.py  # Transaction operations
│   │   └── chatbot_service.py # NLP & response generation
│   │
│   └── utils/                  # Utility functions
│       ├── security.py         # JWT & password hashing
│       └── dependencies.py     # Dependency injection helpers
│
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── requirements.txt            # Python dependencies
└── seed_data.py               # Sample data generation script
```

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.8+
- MySQL Server
- pip (Python package manager)

### 1. Clone the Repository
```bash
git clone https://github.com/Krishna-721/Finance-Bot.git
cd Finance-Bot/backend
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
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

### 5. Create Database
```sql
CREATE DATABASE finance_bot;
```

### 6. Initialize Database Tables
```bash
python -m app.create_tables
```

### 7. Run the Server
```bash
uvicorn app.main:app --reload
```

Server will start at: `http://127.0.0.1:8000`

### 8. (Optional) Seed Sample Data
```bash
python seed_data.py
```

## 📚 API Documentation

Once the server is running, access interactive API documentation:

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

### Example Requests

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

## 🔒 Security Features

- **Password Security**: Bcrypt hashing with salt (never store plain text)
- **JWT Tokens**: Stateless authentication with configurable expiration
- **CORS Protection**: Configured for frontend at `http://localhost:5173`
- **SQL Injection Prevention**: SQLAlchemy ORM parameterized queries
- **User Data Isolation**: Database queries filtered by user_id
- **Input Validation**: Pydantic schemas validate all inputs

## 🤖 Chatbot Capabilities

The chatbot understands various intents:

| Intent | Example Queries | Response |
|--------|----------------|----------|
| Balance | "What's my balance?", "Show summary" | Total income, expenses, net savings |
| Category Spending | "How much did I spend on food?" | Category-specific totals & averages |
| Total Spending | "How much have I spent?" | Total expenses + top 3 categories |
| Income | "Show my income", "How much did I earn?" | Total income summary |
| Recent Transactions | "Show recent transactions" | Last 5 transactions |
| Savings Advice | "Give me savings tips" | Personalized advice based on spending |
| Biggest Expense | "What's my biggest expense?" | Largest single transaction |

## 🧪 Testing

### Manual Testing with Sample Data
```bash
python seed_data.py
```

Creates 5 sample users with 10-15 transactions each.

**Sample Credentials:**
- alice@example.com / alice123
- bob@example.com / smithysmudge
- charlie@example.com / charlie123

### API Testing
Use the interactive Swagger UI at `/docs` or tools like:
- Postman
- Thunder Client (VS Code)
- curl commands

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

## 🚀 Deployment

### Production Checklist
- [ ] Set `echo=False` in database.py
- [ ] Generate strong SECRET_KEY
- [ ] Update CORS origins for production domain
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure proper logging
- [ ] Use production-grade ASGI server (Gunicorn)

### Environment Variables for Production
```env
DATABASE_URL=mysql+pymysql://user:pass@production-db:3306/finance_bot
SECRET_KEY=production-secret-key-at-least-32-characters
ENVIRONMENT=production
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Budget setting and alerts
- [ ] Recurring transaction support
- [ ] Export data to CSV/PDF
- [ ] Multi-currency support
- [ ] Data visualization endpoints
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Advanced ML-based predictions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Vamshi Krishna Gourwar**
- GitHub: [@Krishna-721](https://github.com/Krishna-721)
- LinkedIn: [vamshi-krishna-gourwar](https://linkedin.com/in/vamshi-krishna-gourwar-9a11712b2)
- Email: vamshikrishnagourwar@gmail.com

## 🙏 Acknowledgments

- FastAPI for the amazing framework
- SQLAlchemy for robust ORM
- The Python community for excellent libraries

---

**⭐ If you find this project helpful, please give it a star!**
