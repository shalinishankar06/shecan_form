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

## 3️⃣ Open Terminal

```bash
Ctrl + `
```

or

```bash
View → Terminal
```

---

## 4️⃣ Install Dependencies

```bash
npm install
```

---

## 5️⃣ Start the Application

```bash
npm start
```

---

## 6️⃣ Open in Browser

| Page | URL |
|------|------|
| 🌐 Contact Form | http://localhost:3000 |
| 🔐 Admin Panel | http://localhost:3000/admin.html |

---

# 🔐 Admin Access

| Field | Value |
|------|------|
| Password | `shecan2024` |

---

# ✨ Features

## 📬 Contact Form

- Name input
- Email validation
- Subject dropdown
- Message field
- Real-time validation

---

## 🛡️ Security

- Server-side validation
- Rate limiting protection
- Admin token authentication

---

## 🗄️ Database

- SQLite database
- Automatic database creation
- Persistent submission storage

---

## 📊 Admin Dashboard

- View all submissions
- Search & filter records
- Update submission status
- Delete submissions

---

## 📱 Responsive Design

- Mobile friendly
- Tablet optimized
- Desktop responsive layout

---

# 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Frontend structure |
| CSS3 | Styling & responsiveness |
| JavaScript | Frontend interactivity |
| Node.js | Backend runtime |
| Express.js | Server framework |
| SQLite | Database |
| better-sqlite3 | Database driver |
| express-rate-limit | API protection |

---

# 📁 Project Structure

```bash
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
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/submit` | Submit contact form |
| GET | `/api/admin/submissions` | Fetch all submissions |
| PATCH | `/api/admin/submissions/:id/status` | Update status |
| DELETE | `/api/admin/submissions/:id` | Delete submission |
| GET | `/api/admin/stats` | Fetch dashboard stats |

---
# Screenshot
## 📸 Project Preview
<img width="1123" height="630" alt="image" src="https://github.com/user-attachments/assets/26d41f1d-c6f4-435e-b4f2-11baf09c1444" />

---

## Admin
<img width="948" height="352" alt="image" src="https://github.com/user-attachments/assets/3a723562-518f-4200-be7e-8a58bb4580ca" />


# 📌 Submission Status Flow

```text
New → Reviewed → Resolved
```

---

# 🧪 Testing

1. Open the contact form  
2. Submit sample data  
3. Login to admin panel  
4. Manage submissions  

---

# 👩‍💻 Developed For

She Can Foundation Internship Task
