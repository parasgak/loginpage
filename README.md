# 🛡️ Secure User Authentication System (MERN)

This project features a secure user authentication system with Email OTP verification, a premium dashboard, and a glassmorphism UI.

## 🔗 Deployment Details
- **Frontend (Local):** `http://localhost:5179`
- **Backend (Render):** `https://loginpage-lwbk.onrender.com`

## ⚙️ MongoDB Atlas Setup (FOR RENDER)
To allow your live backend to connect to your database securely, add the following IP ranges to your **MongoDB Atlas "Network Access"** tab:

1. `74.220.48.0/24`
2. `74.220.56.0/24`
3. `0.0.0.0/0` (Optional: Use this if the above ranges don't cover everything, for maximum compatibility).

## 🛠️ Local Development
To run this project locally:
1. **Backend:** `cd backend && node server.js`
2. **Frontend:** `cd frontend && npm run dev`
