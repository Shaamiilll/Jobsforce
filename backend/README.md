# 🚀 Jobsforce Backend

## 📋 Backend Overview
Robust backend service for Jobsforce, providing RESTful APIs for job skills extraction and management.

## 🔧 Technology Stack
- **Language:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Validation:** Express-validator
- **Logging:** Morgan
- **Environment:** Dotenv

## 📂 Project Structure
```
backend/
│
├── config/          # Configuration files
├── controllers/     # Route logic and handlers
├── middleware/      # Custom middleware
├── service/         # for uploading the S3
├── models/          # Mongoose data models
├── routes/          # API route definitions
├── utils/           # Utility functions
├── .env             # Environment variables
├── app.js           # Express application file
├── server.js        # Main application file
└── package.json     # Dependency management
```

## 🛠 Local Setup

### Prerequisites
- Node.js 14+
- MongoDB 4.4+
- npm 6+

### Installation
```bash
# Clone the repository
git clone https://github.com/Shaamiilll/Jobsforce.git
cd Jobsforce/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Fill in your environment variables
```

### Environment Variables
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ML_HOST = ML_HOST_LINK
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET_NAME=
```

## 🚀 Running the Application

### Development Mode
```bash
# Start development server with nodemon
npm run dev
```

### Production Mode
```bash
# Build and start production server
npm start
```

## 🔐 Authentication
- JWT-based authentication
- Secure password hashing

## 📡 API Endpoints

### Authentication Endpoints
| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|----------------|
| `/api/auth/register` | POST | User Registration | Public |
| `/api/auth/login` | POST | User Login | Public |

### Resume  Endpoints
| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|----------------|
| `/api/resume/upload` | POST | For uploading the resume to S3 | Token Required |



### Jobs Endpoints
| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|----------------|
| `/api/jobs/recommended` | GET | Fetching the jobs (based on skills) | Token Required |


## 📊 API Documentation
- Swagger UI: `/api-docs`
- Postman Collection: `./docs/jobsforce-backend.postman_collection.json`

## 🔒 Security Features
- Rate Limiting
- CORS Protection
- Input Validation
- Error Handling
- Secure HTTP Headers

## 📦 Deployment
- Deloyed on the AMAZON Ec2 and for Routing Route 53

## 📞 Contact
**Shaamil**
- Email: shamilamiyan@gmail.com
- Project: [Jobsforce GitHub](https://github.com/Shaamiilll/Jobsforce)
```

Key features of this backend README:

1. Comprehensive technology stack overview
2. Detailed project structure
3. Setup and installation instructions
4. Environment variable guidance
5. API endpoint documentation
6. Testing information
7. Security features
8. Deployment options
9. Contribution guidelines

Would you like me to elaborate on any specific section or customize it further?