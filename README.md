# 🤝 Peer Skills Exchange System

## 📌 Project Overview

This project focuses on creating a web-based platform where students can **teach and learn skills from each other**. The system allows students to create their profiles, add the skills they can teach and the skills they want to learn, search for suitable peers, and send connection requests.

The project uses a frontend built with **HTML, CSS, and JavaScript**, a backend developed using **Node.js and Express.js**, and **MongoDB Atlas** for storing user and connection request data.

The system also provides skill-based matching to help students find peers whose teaching skills match their learning requirements.

---

## 🎯 Objectives

* Create a platform for peer-to-peer skill exchange.
* Allow students to register and create their profiles.
* Allow users to specify the skills they can teach.
* Allow users to specify the skills they want to learn.
* Search for peers based on specific skills.
* Send connection requests to other students.
* Accept or reject connection requests.
* Update user profile information.
* Find suitable skill-based matches.
* Store user and request information in MongoDB Atlas.
* Provide a simple and user-friendly web interface.

---

## 👤 User Information

The system stores the following information for each registered user:

| Field        | Description                         |
| ------------ | ----------------------------------- |
| Name         | Name of the student                 |
| Email        | Email address of the student        |
| Password     | Account password                    |
| Department   | Student's department                |
| Year         | Academic year of the student       |
| TeachSkills  | Skills the student can teach       |
| LearnSkills  | Skills the student wants to learn   |

---

## 🤝 Connection Requests

The system allows users to send connection requests to other students.

Each request contains:

| Field       | Description                    |
| ----------- | ------------------------------ |
| Sender      | User who sends the request     |
| Receiver    | User who receives the request  |
| Status      | Current request status         |
| CreatedAt   | Request creation time          |
| UpdatedAt   | Request update time            |

### Request Status

* `pending` → Request is waiting for a response
* `accepted` → Request has been accepted
* `rejected` → Request has been rejected

---

## 🎯 Skill Matching

The system provides skill-based matching between students.

The user's **learning skills** are compared with other users' **teaching skills**.

For example:

```text
User A wants to learn:
Python

User B can teach:
Python

Result:
User B is a suitable skill match for User A.

---

# 🌟 Project Highlights

The Peer Skills Exchange System is designed to make peer-to-peer learning simple and accessible for students.

Instead of learning only through traditional methods, students can use this platform to:

- Share their existing knowledge with others.
- Discover students who can teach useful skills.
- Find people who want to learn the skills they know.
- Build connections with other students.
- Exchange knowledge in a collaborative environment.

The main idea of the project is to create a community where **every student can be both a learner and a teacher**.

---

# 💡 Problem Statement

Students often have useful skills but may not know which other students are interested in learning those skills.

For example, a student may know:

- Python
- Web Development
- JavaScript

while another student may want to learn these skills but does not know whom to approach.

There is a need for a simple platform that can connect students based on their teaching and learning requirements.

The **Peer Skills Exchange System** solves this problem by providing a platform where students can list their skills, search for peers, and send connection requests.

---

# ✅ Proposed Solution

The proposed system provides a centralized web platform for peer skill exchange.

Each student creates a profile containing:

- Personal information
- Department
- Academic year
- Skills they can teach
- Skills they want to learn

The system then allows students to search for peers and identify potential matches.

This makes it easier for students to find suitable learning partners and exchange knowledge.

---

# 🔄 User Journey

```text
Register
   ↓
Login
   ↓
Create/View Profile
   ↓
Add Teaching & Learning Skills
   ↓
Search for Peers
   ↓
Find Suitable Match
   ↓
Send Connection Request
   ↓
Request Accepted
   ↓
Connect & Exchange Skills
**
👩‍💻 Author**

Sharda Rajendra Chatte

Academic Mini Project – 2026

Project: Peer Skills Exchange System

Learn • Teach • Connect • Grow
