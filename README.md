# 🌸 She Can Foundation – Contact Form

A modern full-stack contact form application built for **She Can Foundation** with secure form handling, SQLite database integration, admin dashboard, and responsive UI.

---

# 🚀 Quick Start

## 1️⃣ Install Node.js

Download and install the LTS version:

https://nodejs.org

---

## 2️⃣ Open Project in VS Code

```bash
File → Open Folder → she-can-foundation
```

---
##Open Terminal
```
Ctrl + `
```
---

##Install Dependencies
npm install

---
##Start the Application
npm start

---
##Open in Browser
Page	URL
🌐 Contact Form	http://localhost:3000
🔐 Admin Panel	http://localhost:3000/admin.html

---

##Admin Access
Field	Value
Password	shecan2024
---

###Features
📬 Contact Form
Name input
Email validation
Subject dropdown
Message field
Real-time validation
🛡️ Security
Server-side validation
Rate limiting protection
Admin token authentication
🗄️ Database
SQLite database
Automatic database creation
Persistent submission storage
📊 Admin Dashboard
View all submissions
Search & filter records
Update submission status
Delete submissions
📱 Responsive Design
Mobile friendly
Tablet optimized
Desktop responsive layout

---
##🛠️ Tech Stack
Technology	Usage
HTML5	- Frontend structure
CSS3 -	Styling & responsiveness
JavaScript-	Frontend interactivity
Node.js-	Backend runtime
Express.js-	Server framework
SQLite-	Database
better-sqlite3	Database driver
express-rate-limit	API protection

---
##📁 Project Structure
she-can-foundation/
│
├── server.js
├── package.json
├── data/
│   └── submissions.db
│
└── public/
    ├── index.html
    └── admin.html
---

##📡 API Endpoints
POST	/api/submit	Submit contact form
GET	/api/admin/submissions	Fetch all submissions
PATCH	/api/admin/submissions/:id/status	Update status
DELETE	/api/admin/submissions/:id	Delete submission
GET	/api/admin/stats	Fetch dashboard stats

---

##📌 Submission Status Flow
New → Reviewed → Resolved
🧪 Testing
Open the contact form
Submit sample data
Login to admin panel
Manage submissions
---
##👩‍💻 Developed For
She Can Foundation Internship Task
