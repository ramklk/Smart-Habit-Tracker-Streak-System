## Smart Habit Tracker

A full-stack habit tracking web application that helps users build consistency using streak tracking, weekly visualization, and analytics.

Built using the MERN stack with a modern animated SaaS-style UI.

---

##  Features

### 🔐 Authentication
- User Registration & Login
- JWT-based Authentication
- Protected Routes

### 📝 Habit Management
- Create Habits
- Delete Habits
- Mark Habit as Done
- Prevent Duplicate Check-ins

### 🔥 Streak System
- Automatic Streak Calculation
- Longest Streak Tracking
- Streak Reset on Missed Day

### 📅 Weekly View
- Monday–Sunday habit tracking
- Completed (Green)
- Missed (Red)
- Future Days (Gray)

### 📊 Analytics Dashboard
- Total Habits
- Weekly Completions
- Monthly Completions
- Success Rate
- Bar Chart Visualization (Chart.js)

### 🔔 Reminder System
- Daily Email Reminders (Node Cron + Nodemailer)
- Automated background scheduling

### 🎨 UI/UX
- Modern SaaS Dashboard
- Dark / Light Mode
- Framer Motion Animations
- Toast Notifications
- Responsive Design

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Chart.js
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Node Cron
- Nodemailer

---

## 📂 Project Structure

habit-tracker/
│
├── backend/
│   │
│   ├── config/
│   │     └── db.js
│   │
│   ├── controllers/
│   │     ├── authController.js
│   │     └── habitController.js
│   │
│   ├── middleware/
│   │     ├── authMiddleware.js
│   │     ├── validate.js
│   │     └── errorHandler.js
│   │
│   ├── models/
│   │     ├── User.js
│   │     └── Habit.js
│   │
│   ├── routes/
│   │     ├── authRoutes.js
│   │     └── habitRoutes.js
│   │
│   ├── utils/
│   │     └── sendEmail.js
│   │
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── public/
│   │     ├── index.html
│   │     ├── favicon.ico
│   │     └── manifest.json
│   │
│   ├── src/
│   │     │
│   │     ├── assets/
│   │     │     └── logo.png (optional)
│   │     │
│   │     ├── components/
│   │     │     ├── AddHabitModal.jsx
│   │     │     ├── Navbar.jsx
│   │     │     ├── Sidebar.jsx
│   │     │     └── ThemeToggle.jsx
│   │     │
│   │     ├── context/
│   │     │     ├── AuthContext.jsx
│   │     │     └── ThemeContext.jsx
│   │     │
│   │     ├── hooks/
│   │     │     └── useHabits.js (optional)
│   │     │
│   │     ├── layouts/
│   │     │     └── DashboardLayout.jsx
│   │     │
│   │     ├── pages/
│   │     │     ├── Dashboard.jsx
│   │     │     ├── Login.jsx
│   │     │     ├── Signup.jsx
│   │     │     └── Stats.jsx
│   │     │
│   │     ├── services/
│   │     │     └── api.js
│   │     │
│   │     ├── utils/
│   │     │     ├── weekUtils.js
│   │     │     └── streakUtils.js (optional)
│   │     │
│   │     ├── App.js
│   │     ├── index.js
│   │     └── index.css
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md



---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ramklk/Smart-Habit-Tracker-Streak-System.git
cd habit-tracker



### 2️⃣ Backend Setup
cd backend
npm install

Create .env file inside backend/:
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
Start backend:

npm start


### 3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs at:
http://localhost:3000

Backend runs at:
http://localhost:5000


### 📌 How It Works

User registers/login

JWT token stored in localStorage

User creates habits

When marking done:

Backend checks previous date

Updates current streak

Updates longest streak

Cron job runs daily:

Checks missed habits

Sends reminder email

### 🔐 Security Features

JWT Authentication

Protected API Routes

Input Validation

Rate Limiting

Ownership Checks

Environment Variable Protection

### 📈 Future Improvements
Calendar Heatmap

Streak Milestone Confetti

Mobile App Version

Push Notifications

Deployment to Production