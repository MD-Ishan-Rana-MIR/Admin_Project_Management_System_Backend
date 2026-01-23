# Admin Project Management System - Backend

## Project Overview

This is a **RESTful API backend** for an Admin Project Management System built with Node.js and TypeScript. The system provides comprehensive user management, role-based access control, project management, and team invitation features. It is designed to support administrative operations for managing users, projects, and team collaboration through a secure and scalable API.

**Application Type:** REST API Backend for SaaS/Admin Dashboard

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt
- **Email Service:** Nodemailer (Gmail)
- **Environment Management:** dotenv
- **CORS:** cors middleware

---

## Key Features

### Authentication & Authorization
- JWT-based authentication with token expiration
- Secure password hashing using bcrypt
- Role-based access control (RBAC) with three roles: ADMIN, MANAGER, STAFF
- Protected routes with authentication middleware
- Role-specific permissions enforcement

### User Management
- User registration and login
- User status management (ACTIVE/INACTIVE)
- Role assignment and updates (Admin only)
- User pagination and filtering
- Single user retrieval by ID

### Project Management
- Create, read, update projects
- Project status tracking (ACTIVE, ARCHIVED, DELETED)
- Soft delete functionality
- Project ownership tracking
- User-project association

### Team Invitation System
- Email-based team invitations
- Token-based invite acceptance
- Role assignment during invitation
- Invite expiration management
- Email notifications with custom templates

### Security Features
- CORS configuration for frontend integration
- JWT token verification
- Password encryption
- Protected API endpoints
- Environment variable configuration for sensitive data

### Error Handling
- Centralized error response formatting
- HTTP status code management
- Validation error handling
- Database error handling

---

## Project Structure

```
src/
├── app.ts                      # Express app configuration and middleware setup
├── server.ts                   # Server entry point and database connection
├── config/                     # Configuration files
│   ├── config.ts              # Environment variables and app config
│   ├── db.ts                  # MongoDB connection setup
│   ├── response.ts            # Standardized API response handlers
│   └── token.ts               # JWT token generation and verification
├── middlewares/                # Custom middleware functions
│   ├── authMiddleware.ts      # JWT authentication middleware
│   └── roleMiddleware.ts      # Role-based authorization middleware
├── modules/                    # Feature modules
│   ├── auth/                  # Authentication module
│   │   ├── auth.controller.ts # Login and user creation logic
│   │   ├── auth.model.ts      # User schema and model
│   │   └── auth.route.ts      # Auth routes
│   ├── user/                  # User management module
│   │   ├── user.controller.ts # User CRUD operations
│   │   └── user.route.ts      # User routes
│   ├── project/               # Project management module
│   │   ├── project.controller.ts
│   │   ├── project.model.ts
│   │   └── project.route.ts
│   └── invite/                # Team invitation module
│       ├── invite.controller.ts
│       ├── invite.model.ts
│       └── invite.route.ts
├── utility/                    # Utility functions
│   ├── mailer.ts              # Email service configuration
│   └── inviteEmailTemplate.ts # Email templates for invitations
└── types/                      # TypeScript type definitions
```

---

## Setup & Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Gmail account** (for email notifications)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Admin_Project_Management_System_Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Copy the contents from `.env.example` (see below)
   - Fill in your actual values

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=

# Database
DB_URL=

# JWT Configuration
JWT_SECRET=
EXPIRE_DAY=

# Frontend URL (for CORS)
FRONTEND_URL=

# Email Configuration (Gmail)
EMAIL_USER=
EMAIL_PASS=
```

### Example Values (for reference only):
- `PORT`: 5500
- `DB_URL`: mongodb://localhost:27017/admin_project_db or MongoDB Atlas connection string
- `JWT_SECRET`: your-super-secret-jwt-key-here
- `EXPIRE_DAY`: 5d (token expiration period)
- `FRONTEND_URL`: http://localhost:3000
- `EMAIL_USER`: your-email@gmail.com
- `EMAIL_PASS`: your-gmail-app-password (not your regular password)

> **Note:** For Gmail, you need to generate an App Password from your Google Account settings if 2FA is enabled.

---

## Running the Project

### Development Mode
```bash
npm run dev
```
This will start the server with hot-reload using nodemon and ts-node.

### Production Build
```bash
npm run build
npm start
```
This compiles TypeScript to JavaScript in the `dist/` folder and runs the compiled code.

### Server URL
Once running, the server will be available at:
```
http://localhost:<PORT>
```
Default: `https://admin-project-management-system-bac.vercel.app/api/v1`

---

## API Documentation

### Base URL
```
https://admin-project-management-system-bac.vercel.app/api/v1
```

### Available Endpoints

#### Authentication
- `POST /create-user` - Register a new user
- `POST /auth/login` - User login

#### User Management (Admin only)
- `GET /users-pagination` - Get all users with pagination
- `GET /single-user/:id` - Get user by ID
- `PATCH /users/:id/status` - Update user status
- `PATCH /users/:id/role` - Update user role

#### Project Management
- Project routes (authentication required)

#### Invitations
- Invite routes (authentication required)

### Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Postman Collection
_(Add your Postman collection link here if available)_

### Swagger Documentation
_(Add Swagger documentation link here if implemented)_

---

## Screenshots

_Add screenshots of API responses, Postman collections, or admin dashboard here_

---

## Author & License

**Author:** [Your Name]

**License:** MIT

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## Support

For issues or questions, please open an issue in the repository.
