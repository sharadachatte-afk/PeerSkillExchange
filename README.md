# Peer Skills Exchange System

## 📌 Project Overview

The **Peer Skills Exchange System** is a web-based platform designed to help college students learn from each other by sharing their skills and knowledge.

Every student has different skills. Some students may be good at programming, while others may be good at design, communication, mathematics, or other areas.

This system allows students to:

- Create an account
- Add skills they can teach
- Add skills they want to learn
- Search for other students based on skills
- Send connection requests
- Accept or reject connection requests
- View recommended peer matches
- Update their profile

The main goal of this project is to create a simple **peer-to-peer learning environment** where students can **Learn, Teach, Connect and Grow together**.

---

## 🎯 Objectives

The main objectives of the Peer Skills Exchange System are:

1. To create a platform for students to exchange skills.
2. To help students find peers who can teach the skills they want to learn.
3. To allow students to share their own knowledge with others.
4. To provide a simple system for sending and managing connection requests.
5. To recommend peers based on matching skills.
6. To encourage collaboration and peer learning among college students.

---

## 🚀 Features

### 👤 User Registration

Students can create an account by providing:

- Full Name
- College Email
- Password
- Department
- Year
- Skills they can teach
- Skills they want to learn

### 🔐 Login

Registered students can securely log in using their email and password.

### 🏠 Dashboard

The dashboard displays:

- Student information
- Skills they can teach
- Skills they want to learn
- Quick actions
- Recommended peer matches

### 🔍 Find Peers

Students can search for other students based on the skills they can teach.

### 🤝 Connection Requests

Students can:

- Send connection requests
- View received requests
- Accept requests
- Reject requests

### 🎯 Skill Matching

The system compares the logged-in student's learning skills with other students' teaching skills and recommends suitable peers.

### 👤 Profile Management

Students can update:

- Name
- Department
- Year
- Teaching skills
- Learning skills

### 🚪 Logout

Users can securely log out of the application.

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- GitHub
- Render

---

## 📂 Project Structure

The project uses a simple root-folder structure:

```text
PeerSkillExchange/
│
├── index.html
├── Register.html
├── login.html
├── dashboard.html
├── find-peers.html
├── requests.html
├── profile.html
│
├── style.css
│
├── Register.js
├── login.js
├── dashboard.js
├── find-peers.js
├── requests.js
├── profile.js
│
├── server.js
├── User.js
├── Request.js
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
⚙️ **How the System Works**
Student Registration
        ↓
      Login
        ↓
    Dashboard
        ↓
   Add / Edit Skills
        ↓
    Find Peers
        ↓
 Send Connection Request
        ↓
 Receiver Views Request
        ↓
   Accept / Reject
        ↓
    Skill Matching

The application uses MongoDB Atlas to store user and connection request information.

User Collection

The User model stores:

Name
Email
Password
Department
Year
Teaching Skills
Learning Skills
Request Collection

The Request model stores:

Sender
Receiver
Request Status
Created Date
Updated Date

Request status can be:

pending
accepted
rejected


The deployed project is available at:


## 👨‍💻 Author

**Developed by:** Sharda Rajendra Chatte  
**Project:** Peer Skills Exchange System  
**Academic Mini Project – 2026**

### Tagline
**Learn • Teach • Connect • Grow**
