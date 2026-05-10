# Liverr - Web Programming Project

Final project submission for roll numbers `22i-0908` and `22i-1007`.

Liverr is a freelance marketplace web application inspired by service platforms where clients can browse gigs, place orders, message freelancers, and review completed work. Freelancers can create gigs, manage orders, and complete account verification. Admin users can monitor platform activity and manage users, gigs, and orders.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT with HTTP-only cookie support and bearer token authorization
- Security: bcrypt password hashing, JWT route guards, role-based access control, validation/sanitization middleware

## Project Structure

```text
22i-0908_22i-1007_project_B/
├── backend/              Express API and MongoDB models
├── frontend/             React client application
├── docs/                 Rubric and project report
├── README.md             Main project documentation
└── .gitignore            Repository ignore rules
```

## Main Features

- User signup and login with hashed passwords
- JWT-based session handling and logout
- Password reset using secure time-limited tokens
- Client, freelancer, and admin roles
- Backend role guards for admin-only actions
- Admin user management: view users, change roles, activate/deactivate accounts
- Gig creation, browsing, search, budget filtering, and approval
- Order placement, cancellation, and completion
- Messaging and review modules
- Account verification and freelancer profile information
- Responsive frontend layout with dynamic navigation

## Local Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Set these values in `backend/.env`:

```text
ConnectionString=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Important Routes

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:3000/`
- API base path: `/api/auth`

## MongoDB Atlas and Vercel Deployment

### MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user and password.
3. In Network Access, allow Vercel to connect. For coursework deployment, `0.0.0.0/0` is commonly used.
4. Copy the Atlas connection string and replace the username, password, and database name.

### Backend on Vercel

Deploy the `backend/` folder as a Vercel project.

Set these environment variables in the backend Vercel project:

```text
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secure_secret
FRONTEND_URL=https://your-frontend.vercel.app
```

The backend also supports `ConnectionString` for local compatibility, but `MONGODB_URI` is recommended for deployment.

### Frontend on Vercel

Deploy the `frontend/` folder as a separate Vercel project.

Use these settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Set this environment variable in the frontend Vercel project:

```text
VITE_API_BASE_URL=https://your-backend.vercel.app/api/auth
```

After both deployments are live, update `FRONTEND_URL` in the backend Vercel project to match the final frontend URL.

## Submission Notes

- Real environment secrets are not committed.
- Use `backend/.env.example` as the environment template.
- The project rubric is stored in `docs/WebProgramming_ProjectRubrics.pdf`.
- A feature report is stored in `docs/PROJECT_REPORT.md`.
