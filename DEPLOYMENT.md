# Product Management System - Deployment Guide

## Deploying to Vercel

This is a full-stack application with a React frontend and Node.js backend. Follow these steps to deploy both to Vercel.

### Prerequisites
- GitHub account with your repository
- Vercel account (free tier works)
- Environment variables from your development setup

### Step 1: Prepare Environment Variables

#### Server-side (.env in server folder)
Copy `server/.env.example` and fill in your values:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

#### Client-side (.env in client folder)
Create `.env.production`:
```
VITE_API_BASE_URL=https://your-app.vercel.app/api
```

### Step 2: Deploy Backend First
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select "Server" as root directory (or configure with vercel.json)
5. Add environment variables from `server/.env.example`
6. Click Deploy
7. Note your backend URL (e.g., `https://your-app.vercel.app`)

### Step 3: Deploy Full-Stack Using Root vercel.json
The `vercel.json` at the root already handles both:
- Server API routes at `/api/*`
- Client static files for all other routes

**Recommended approach:**
1. Push your full repository to GitHub
2. In Vercel, import the GitHub repo
3. **Don't select a root directory** - let Vercel read the root `vercel.json`
4. Set environment variables for both backend and frontend
5. Deploy

### Step 4: Configure Environment Variables in Vercel

In Vercel Dashboard → Project Settings → Environment Variables, add:

**For Backend:**
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `PORT` (5000)

**For Frontend:**
- `VITE_API_BASE_URL=https://your-vercel-deployment.vercel.app/api`

### Step 5: Update API URL
Update the API base URL in `client/src/services/api.js`:
```javascript
baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
```

This automatically uses the environment variable if available, falls back to localhost for development.

### Step 6: Deploy

```bash
# Push to GitHub
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main

# Then trigger Vercel deployment via dashboard or GitHub webhook
```

## Vercel Configuration Files

### Root `vercel.json`
Manages both frontend and backend deployment:
- Routes API calls to Node.js server
- Serves React app for other routes
- Handles static file serving from build output

### Server `vercel.json` 
(Kept for reference, but root config takes precedence)

## Troubleshooting

### API connection issues
- Check `VITE_API_BASE_URL` environment variable matches your deployment URL
- Verify CORS is enabled in server (already configured)
- Check Network tab in browser DevTools for actual API call URL

### Build failures
- Ensure Node modules are installed: `npm install` in both `client/` and `server/`
- Check build logs in Vercel Dashboard for specific errors
- Verify all required environment variables are set

### MongoDB connection
- Ensure IP whitelist in MongoDB Atlas includes Vercel IPs (use 0.0.0.0/0 for testing)
- Verify connection string uses proper authentication

## Local Development

```bash
# Terminal 1 - Backend
cd server
npm install
npm start

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` for the app.

## Production vs Development

- **Development**: API calls use `http://localhost:5000/api`
- **Production**: API calls use environment variable `VITE_API_BASE_URL`
- **Build**: Client builds to `client/dist/` and is served as static files

## Useful Commands

```bash
# Build client for production
cd client && npm run build

# Test build locally
npm run preview

# Check Vercel logs
vercel logs

# Redeploy
vercel --prod
```
