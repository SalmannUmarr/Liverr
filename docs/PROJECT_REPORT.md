# Project Report

## Project Name

Liverr - Freelance Marketplace Web Application

## Team

- 22i-0908
- 22i-1007

## Overview

Liverr is a full-stack web programming project that implements a freelance service marketplace. The system supports clients, freelancers, and administrators through separate role-based workflows. Clients can browse gigs, place orders, message freelancers, and submit reviews. Freelancers can create gigs, verify their profile, manage orders, and communicate with clients. Admins can monitor the platform, approve gigs, manage users, change roles, and activate or deactivate accounts.

## Architecture

The project is divided into two main applications:

- `frontend/`: React + Vite single page application.
- `backend/`: Express API connected to MongoDB through Mongoose.

The frontend sends requests to the backend API and stores the logged-in user's JWT for authenticated requests. The backend validates JWTs, checks user roles, and performs database operations.

## Implemented Modules

### Authentication and Sessions

- Signup and login endpoints
- Password hashing with bcrypt
- JWT generation on login
- JWT verification middleware
- Logout endpoint and frontend logout handling
- Expired and invalid token handling

### Password Security

- Passwords are hashed before storage
- Password comparison uses bcrypt
- Password reset uses random token generation
- Reset tokens are stored as hashes
- Reset tokens expire after 15 minutes

### Role-Based Access Control

- Roles: `client`, `freelancer`, `admin`
- Admin route guards on backend
- Frontend admin route protection
- Admin-only user, gig approval, and order overview actions

### Admin User Management

- View all users
- Change user roles
- Activate/deactivate accounts
- Deactivated accounts cannot login or use old JWTs

### Marketplace Features

- Gig creation
- Gig listing and detail view
- Gig search and filtering
- Admin gig approval
- Order placement and management
- Review submission
- Messaging between users
- Freelancer profile verification

### Validation and Sanitization

- Central request body sanitization middleware
- Signup, login, password reset, gig, and order validation
- Frontend password strength validation
- Inline user-facing form errors in authentication screens

## Security Notes

- Environment secrets are excluded from Git.
- `backend/.env.example` documents required environment variables.
- Sensitive backend actions use JWT verification.
- Admin-only actions use role guards.

## Known Setup Requirements

1. Create a MongoDB database.
2. Copy `backend/.env.example` to `backend/.env`.
3. Set `ConnectionString`, `JWT_SECRET`, and `PORT`.
4. Install backend dependencies and run `npm run dev`.
5. Install frontend dependencies and run `npm run dev`.

## Rubric Coverage

The project includes authentication, password hashing, password reset, RBAC, admin management, CRUD/API integration, validation, role-aware frontend navigation, responsive UI components, footer content, images/icons, and documentation.
