# CareerConnect - MERN Job Portal

CareerConnect is a full-stack job portal built with React, Node.js, Express, and MongoDB. It supports separate job seeker and employer workflows, including authentication, job posting, job browsing, saved jobs, resume uploads, and application management.

## Live Demo

- Frontend: https://react-job-portal-wic3.vercel.app
- Backend API: https://react-job-portal-backend-hvst.onrender.com/api/v1

## Features

### Job Seekers

- Register and log in as a job seeker
- Browse available jobs
- Search and filter jobs by keyword, category, location, and salary range
- Save jobs locally for later
- Apply to jobs with resume upload
- View submitted applications
- Access a personal dashboard and profile page

### Employers

- Register and log in as an employer
- Post new jobs
- View and manage posted jobs
- Review applications submitted for jobs

### Technical Features

- JWT authentication with HTTP-only cookies
- Role-based protected routes
- Centralized Axios API client
- Cloudinary resume upload support
- Responsive React UI built with Tailwind CSS
- Dark mode support
- Vercel frontend deployment and Render backend deployment

## Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- React Icons
- Vitest and React Testing Library

### Backend

- Node.js
- Express.js
- MongoDB and Mongoose
- JSON Web Token
- Bcrypt
- Cookie Parser
- Express File Upload
- Cloudinary
- CORS

## Project Structure

```text
react-job-portal/
  backend/
    controllers/
    database/
    middlewares/
    models/
    routes/
    utils/
    app.js
    server.js
  frontend/
    public/
    src/
      api/
      components/
      test/
    index.html
    vite.config.js
  render.yaml
  README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB Atlas database
- Cloudinary account

### Clone The Repository

```bash
git clone https://github.com/kratianu11/react-job-portal.git
cd react-job-portal
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `backend/.env`:

```env
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:4000
```

### Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Fill in `frontend/.env`:

```env
VITE_API_URL=http://localhost:4000/api/v1
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Available Scripts

### Backend

```bash
npm start
```

Starts the Express server.

```bash
npm run dev
```

Starts the Express server for local development.

### Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the frontend for production.

```bash
npm test
```

Runs frontend tests with Vitest.

## Environment Variables

### Backend

| Variable | Description |
| --- | --- |
| `PORT` | Backend server port |
| `NODE_ENV` | `development` or `production` |
| `FRONTEND_URL` | Allowed frontend origin. Use comma-separated URLs for multiple deployments. |
| `DB_URL` | MongoDB connection string |
| `JWT_SECRET_KEY` | Secret used to sign JWTs |
| `JWT_EXPIRE` | JWT expiry value, for example `7d` |
| `COOKIE_EXPIRE` | Cookie expiry in days |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Frontend

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Backend API base URL, for example `http://localhost:4000/api/v1` |

## Deployment

### Frontend On Vercel

1. Import the GitHub repository into Vercel.
2. Set the project root directory to `frontend`.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Add this environment variable:

```env
VITE_API_URL=https://react-job-portal-backend-hvst.onrender.com/api/v1
```

### Backend On Render

This repository includes `render.yaml`.

Render settings:

```text
Build Command: cd backend && npm install
Start Command: cd backend && npm start
```

Required Render environment variables:

```env
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://react-job-portal-wic3.vercel.app
DB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

For production cookies to work between Vercel and Render, keep `NODE_ENV=production` on Render and make sure `FRONTEND_URL` exactly matches the deployed Vercel URL.

## API Routes

Base URL:

```text
/api/v1
```

Main route groups:

- `/user` - registration, login, logout, current user
- `/job` - job listing, posting, updating, deleting
- `/application` - job applications and resume uploads

## Notes

- Do not commit real `.env` files.
- Use `.env.example` files as templates only.
- Rotate credentials immediately if real database, JWT, or Cloudinary secrets were ever pushed to a public repository.

## License

This project is licensed under the MIT License.

## Author

Anukriti

Project Link: https://github.com/kratianu11/react-job-portal
