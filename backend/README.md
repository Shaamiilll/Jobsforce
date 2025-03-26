# 🚀 Jobsforce Backend

## 📋 Project Overview
Jobsforce Backend is a powerful RESTful API service designed to streamline job skills extraction and management. employee can get the recommented job within seconds

## 🔧 Technology Stack
- **Language & Runtime:** Node.js
- **Web Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Logging:** Morgan
- **Environment Management:** Dotenv
- **Cloud Storage:** AWS S3
- **API Documentation:** 

## 🌟 Key Features
- Secure user authentication
- Resume upload and skills extraction
- Intelligent job recommendation system
- Scalable and modular architecture
- Comprehensive error handling
- Advanced security mechanisms

## 📂 Project Structure
```
backend/
│
├── config/          # Configuration and environment settings
├── controllers/     # Business logic and request handlers
├── middleware/      # Custom middleware for authentication, validation
├── models/          # Mongoose database schemas
├── routes/          # API route definitions
├── services/        # External service integrations (S3, ML)
├── utils/           # Utility functions and helpers
│
├── .env             # Environment configuration
├── app.js           # Express application setup
└── server.js        # Application entry point
```

## 🛠 Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4+)
- npm (v6+)
- AWS S3 Account
- Machine Learning Service Access

## 🚀 Local Development Setup

### Installation
```bash
# Clone the repository
git clone https://github.com/Shaamiilll/Jobsforce.git
cd Jobsforce/backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Configure environment variables
```

### Environment Configuration
```
# Server Settings
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobsforce

# Machine Learning Service
ML_HOST=http://ml-service-endpoint

# Authentication
JWT_SECRET=your_secure_secret_key
JWT_EXPIRES_IN=7d

# AWS S3 Credentials
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=jobsforce-resumes
```

## 🖥️ Running the Application

### Development Mode
```bash
# Start with hot-reloading
npm run dev
```

### Production Mode
```bash
# Build and start production server
npm start
```

## 📡 API Endpoints

### Authentication
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/auth/register` | POST | User Registration | Public |
| `/api/auth/login` | POST | User Authentication | Public |

### Resume Management
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/resume/upload` | POST | Upload Resume to S3 | Authenticated |
| `/api/resume/skills` | GET | Extract Resume Skills | Authenticated |

### Job Recommendations
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/jobs/recommended` | GET | Personalized Job Suggestions | Authenticated |

## 📊 API Documentation
- **Postman Collection:** [Jobforce API Collection](https://www.postman.com/altimetry-explorer-5764060/jobforce/request/8e35qgx/job-force-api?action=share&creator=30488120&ctx=documentation)

## 🔒 Security Features
- JWT-based authentication
- Password hashing
- Input validation
- Rate limiting
- CORS protection
- Secure HTTP headers

## 🌐 Deployment
- **Platform:** Amazon EC2
- **Domain Routing:** Amazon Route 53
- **Continuous Integration:** GitHub Actions

## 🐛 Reporting Issues
Please report issues on the [GitHub Issues](https://github.com/Shaamiilll/Jobsforce/issues) page.

## 📞 Contact
**Shaamil**
- 📧 Email: shamilamiyan@gmail.com
- 🔗 GitHub: [Shaamiilll](https://github.com/Shaamiilll)
- 🌐 Project: [Jobsforce Repository](https://github.com/Shaamiilll/Jobsforce)

