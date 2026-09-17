# Student Marketplace

Student Marketplace is a full-stack web application for university students to buy and sell items within their campus community. It includes a React frontend, a Node.js/Express API, Prisma data access, and real-time messaging for buyer-seller communication.

## Overview

This project is designed to help students:

- create and manage product listings
- browse used items by category and price
- save favorite listings
- chat with sellers in real time
- verify accounts via email
- manage profiles and account status

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios or fetch-based API integration

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- Socket.IO
- Zod validation
- Nodemailer
- Cloudinary for image hosting

### Additional Tools

- Helmet and rate limiting for API security
- bcrypt for password hashing
- Cookie-based session handling
- Docker for local infrastructure

## Features

- User registration and login
- Student email verification flow
- Password reset flow
- Protected routes with JWT auth
- Product listing creation, update, and deletion
- Listing search and filtering
- Category management
- Favorites system
- User profile updates with avatar upload
- Real-time messaging between users
- Admin controls for users and content

## Project Structure

```bash
student-marketplace/
├── client/
│   ├── public/
│   └── src/
├── server/
│   ├── prisma/
│   ├── src/
│   ├── uploads/
│   └── tsconfig.json
├── docker-compose.yml
├── package.json
├── README.md
├── .env
└── .env.example
```

## Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm or yarn
- PostgreSQL
- Docker (optional, if using the provided compose setup)
- Cloudinary account
- SMTP email provider or Gmail app password

## Installation

1. Clone the repository

```bash
git clone <your-repository-url>
cd student-marketplace
```

2. Install dependencies for the root project

```bash
npm install
```

3. Install frontend dependencies if the client app is configured separately

```bash
cd client
npm install
cd ..
```

4. Create a `.env` file at the project root with the following values:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/student_marketplace"
SECRET_KEY="your_super_secret_key"
SECRET_EXP="1h"
BASE_URL="http://localhost:3000"
FRONTEND_URL="http://localhost:5173"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your_email@example.com"
EMAIL_PASS="your_email_password"
```

## Database Setup

Run Prisma migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Open Prisma Studio if needed:

```bash
npx prisma studio
```

## Running the Application

### Backend

```bash
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

### Production build

```bash
npm run build
npm start
```

## API Overview

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/verify-email/:token`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password/:token`

### Users

- `GET /api/user/me`
- `GET /api/user/:id`
- `GET /api/user/`
- `PATCH /api/user/update`
- `DELETE /api/user/delete`
- `DELETE /api/user/delete/:id`

### Listings

- `GET /api/listings`
- `GET /api/listings/:id`
- `POST /api/listings`
- `PATCH /api/listings/:id`
- `DELETE /api/listings/:id`

### Categories

- `GET /api/category`
- `POST /api/category`

### Favorites

- `GET /api/favorites`
- `POST /api/favorites`
- `DELETE /api/favorites/:listingId`

## Notes

- The frontend should send credentials for protected API requests because auth uses cookies.
- Listing images are uploaded to Cloudinary and stored as URLs in the database.
- Prisma migrations are the source of truth for the database schema.
- Admin-only routes are protected via role-based checks.

## Future Improvements

- add tests for auth, listings, and user flows
- improve frontend state management and API caching
- add a stronger dashboard for admins
- improve search and recommendation logic
- add pagination and sorting refinements
- document API endpoints with Swagger/OpenAPI

## License

This project is intended for educational and personal use unless a different license is added later.
