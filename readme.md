# ProductHub - Product Management System

A full-stack web application for managing products with authentication, image uploads, and publish/unpublish functionality. Built with React, Node.js/Express, and MongoDB.

## 🌟 Features

- **User Authentication**: Secure login/signup with OTP verification via email
- **Product Management**: Create, read, update, and delete products
- **Image Uploads**: Upload product images to Cloudinary
- **Publish/Unpublish**: Toggle product visibility with instant UI updates
- **Product Catalog**: Display products with detailed information
- **Responsive Design**: Mobile-friendly UI with collapsible sidebar
- **Search & Filter**: Search products by name or category
- **Statistics Dashboard**: View total products, published count, and drafts
- **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (navigation)
- Axios (HTTP client)
- React Icons (icons)

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT (JSON Web Tokens) for authentication
- Cloudinary (image hosting)
- Nodemailer (email sending)

**Deployment:**
- Vercel (serverless functions for backend & static hosting for frontend)

## 📋 Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (free tier available)
- Cloudinary account (free tier available)
- Gmail account (for email OTP sending)
- Vercel account (optional, for deployment)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd product-manage
```

### 2. Install backend dependencies
```bash
cd server
npm install
```

### 3. Create `.env` file in server folder
```bash
cp .env.example .env
```

Fill in your environment variables in `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### 4. Install frontend dependencies
```bash
cd ../client
npm install
```

### 5. Create `.env.development` file in client folder (optional for local dev)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 💻 Running Locally

### Start the backend server
```bash
cd server
npm start
```
Server runs on `http://localhost:5000`

### Start the frontend dev server
In a new terminal:
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

Visit `http://localhost:5173` and log in with your account.

## 📁 Project Structure

```
product-manage/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/               # Login & OTP forms
│   │   │   ├── Products/           # Product card, form, modals
│   │   │   ├── Layout/             # Header, sidebar, main layout
│   │   │   └── Common/             # Reusable UI components
│   │   ├── pages/                  # Page components (Home, Products, Login)
│   │   ├── services/               # API client & services
│   │   ├── utils/                  # Validation, image handling
│   │   ├── context/                # Auth context
│   │   └── main.jsx
│   └── package.json
├── server/                          # Express backend
│   ├── config/                     # Database & Cloudinary config
│   ├── controllers/                # Route handlers (auth, products)
│   ├── models/                     # MongoDB schemas (User, Product)
│   ├── routes/                     # API routes
│   ├── middleware/                 # Auth middleware
│   ├── utils/                      # Helper functions
│   ├── server.js                   # Main server file
│   └── package.json
├── vercel.json                      # Vercel deployment config
├── DEPLOYMENT.md                    # Detailed deployment guide
└── README.md                        # This file
```

## 🔐 Authentication Flow

1. User signs up with email and password
2. Backend sends OTP to email via Nodemailer
3. User enters 6-digit OTP
4. Backend verifies OTP and creates account
5. User logs in with email/password
6. Backend generates JWT token
7. Token stored in localStorage (client-side)
8. All subsequent API requests include JWT in Authorization header

## 📦 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all user's products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🎨 Key Features Explained

### Product Form Validation
- Product name, category, stock, MRP, price, brand name all required
- Stock, MRP, and price must be positive numbers
- Selling price cannot exceed MRP
- Product image is required (validated for size & format)

### Image Handling
- Images converted to Base64 before submission
- Cloudinary stores images in `products` folder
- Old images automatically deleted when updated

### Publish/Unpublish
- Click the Publish/Unpublish button on product card
- Toggles `isPublished` status immediately
- Updates product statistics in dashboard

### Responsive Design
- Desktop: Sidebar always visible, full product grid
- Mobile: Hamburger menu, sidebar slides in from left
- Tailwind's responsive classes (`md:`) handle breakpoints

## 🔧 Environment Variables Guide

### Server (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secure_secret` |
| `CLOUDINARY_NAME` | Cloudinary cloud name | `dxyz1234` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abc123xyz` |
| `EMAIL_USER` | Gmail address | `your_email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password | `xxxx xxxx xxxx xxxx` |
| `FRONTEND_URL` | Frontend domain (for CORS) | `http://localhost:5173` |
| `PORT` | Server port | `5000` |

### Client (.env.production)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://your-app.vercel.app/api` |


**Quick steps:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel Dashboard
4. Deploy automatically or manually trigger

## 🐛 Troubleshooting

### CORS Error on Login
- Ensure `FRONTEND_URL` is set in server `.env`
- Check CORS configuration in `server/server.js`
- Frontend must match the `FRONTEND_URL` exactly

### Images Not Uploading
- Verify Cloudinary credentials are correct
- Check image file size (default 50MB limit)
- Ensure image format is supported (JPG, PNG, WebP, etc.)

### OTP Not Received
- Check Gmail credentials are correct
- Enable "Less secure app access" or use app password
- Check spam folder

### MongoDB Connection Failed
- Verify connection string is correct
- Check MongoDB Atlas IP whitelist (allow all IPs or Vercel IPs)
- Ensure database exists

### API Calls Failing in Production
- Verify `VITE_API_BASE_URL` matches deployed domain
- Check backend environment variables are set
- Review Vercel function logs: `vercel logs <deployment>`

## 📝 Development Tips

### Add New Product Fields
1. Update Product model in `server/models/Product.js`
2. Update ProductForm in `client/src/components/Products/ProductForm.jsx`
3. Update validation in `client/src/utils/validation.js`
4. Update productService if field mapping needed
5. Update ProductCard to display new field

### Customize Styling
- Tailwind CSS classes in all components
- Global styles in `client/src/index.css`
- Color palette uses indigo/blue theme (can be changed)

### Add New Routes
1. Create controller in `server/controllers/`
2. Create route file in `server/routes/`
3. Add route to `server.js` with `app.use('/api/path', require('./routes/file'))`
4. Use auth middleware for protected routes

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📧 Support

For issues or questions, please open a GitHub issue or contact the maintainer.

---

**Built with ❤️ using React, Node.js, and MongoDB**
