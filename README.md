# TEAM X — Student Team Members Management Application

> **Course:** 21CSS301T – Full Stack Development   
> **Institution:** SRM Institute of Science and Technology  

---

## Project Description

A full-stack web application that allows teams to manage their members. It provides a clean dashboard to add team members (with profile photos), view all members in a card grid, and explore detailed member profiles. Built with React.js on the frontend and Node.js + Express + MongoDB on the backend.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router v6, Axios, CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |

---

## Project Structure

```
TEAM-X/
├── backend/
│   ├── server.js           # Express server + all API routes
│   ├── uploads/            # Uploaded profile images stored here
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.js         # Landing page
│   │   │   ├── AddMemberPage.js    # Add member form
│   │   │   ├── ViewMembersPage.js  # Members grid
│   │   │   └── MemberDetailsPage.js# Member detail view
│   │   ├── App.js                  # Routes (React Router)
│   │   ├── index.js
│   │   └── index.css               # Global styles
│   └── package.json
├── .gitignore
└── README.md
```

---

## Installation & Setup

### Prerequisites

- Node.js (v18+)
- MongoDB running locally on port 27017
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/RangaMokshagna/Team-Members-Name-Manager.git
cd Team-Members-Name-Manager
```

### 2. Set up the Backend

```bash
cd backend
npm install
npm start
```

The backend runs on **http://localhost:5000**

### 3. Set up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend runs on **http://localhost:3000**

### 4. Start MongoDB

Make sure MongoDB is running:

```bash
# On Windows
net start MongoDB

# On Mac/Linux
sudo systemctl start mongod
# or
mongod
```

---

## API Endpoints

### Members

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/members` | Add a new team member (with image upload) |
| `GET` | `/members` | Retrieve all team members |
| `GET` | `/members/:id` | Get a single member by ID |
| `DELETE` | `/members/:id` | Delete a member |

### Alias Routes (Browser Testable)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/members` | Retrieve all members |
| `GET` | `/api/members/:id` | Get single member |

### Testing GET requests in browser

- All members: `http://localhost:5000/api/members`
- Single member: `http://localhost:5000/api/members/<MEMBER_ID>`

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home Page | Landing page with team intro and navigation |
| `/add` | Add Member | Form to register a new team member with photo |
| `/view` | View Members | Grid of all team members with search |
| `/members/:id` | Member Details | Full detail view of a single member |

---

## Form Fields (Add Member)

- Name *(required)*
- Roll Number *(required)*
- Year *(required)*
- Degree *(required)*
- Email
- Role
- About Project
- Hobbies *(comma separated)*
- Certificate
- Internship
- About Your Aim
- Profile Image *(file upload)*

---



