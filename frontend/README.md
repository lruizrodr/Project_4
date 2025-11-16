# eCloud Software FAQ & Help Forum  
A 3-Tier Architecture Web Application  
Project 4 — Full Stack Forum System

## Overview
eCloud Software FAQ & Help Forum is a full stack single-page application built using the 3-tier architecture model.  
Users can register, log in, browse support categories, view example questions, and read answers.

This project demonstrates:
- Database layer (MySQL)
- Application layer (Node.js + Express.js REST API)
- Presentation layer (React single-page application)
- Secure password storage using bcrypt
- JSON communication across layers
- Category → Questions → Answers hierarchical navigation

## Features
### ✅ User Authentication
- Register new users  
- Login with hashed passwords  
- Server-side validation  
- Logout and return to Login page  

### ✅ Categories
- Predefined support categories:
  - JavaScript
  - React
  - Node

### ✅ Questions
- Loads questions for selected category  
- Shows question title, body, username, timestamp  
- Click a question to expand answers  

### ✅ Answers
- Loads all answers for the selected question  
- Shows answer author and timestamp  

### ✅ 3-Tier Architecture
1. **Database Layer**  
   - MySQL schema  
   - Users, categories, questions, answers  
   - Example seed data  

2. **Application Layer (API)**  
   - Node.js + Express.js  
   - Endpoints:
     - `/api/register`
     - `/api/login`
     - `/api/categories`
     - `/api/questions`
     - `/api/answers`
   - Uses MySQL2 (promise) and bcrypt  

3. **Presentation Layer (SPA)**  
   - React single-page application  
   - Routing using React Router  
   - Fetch API to communicate with backend  
   - Styled UI with clean forum layout  

## Technology Stack

### **Backend**
- Node.js  
- Express.js  
- bcrypt  
- dotenv  
- mysql2 (promise-based)  

### **Frontend**
- React  
- React Router  
- Vite (build & dev server)  

### **Database**
- MySQL  
- Example data included  

## Project Structure

Project_4/
│
├── backend/
│ ├── db.js
│ ├── server.js
│ ├── package.json
│ └── routes/
│ ├── auth.js
│ ├── categories.js
│ ├── questions.js
│ └── answers.js
│
└── frontend/
├── index.html
├── src/
│ ├── main.jsx
│ ├── App.jsx
│ └── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ └── Dashboard.jsx
├── style.css
└── package.json

## Future Improvements

### 🔹 Question Entry Form
Add a form that allows authenticated users to submit a new question.  
This would send a POST request to `/api/questions`.

### 🔹 Answer Submission Form
Allow users to add answers underneath any question.  
This would send a POST request to `/api/answers`.

### 🔹 User Profiles
Pages showing:
- User information
- Questions asked
- Answers posted

### 🔹 Search Functionality
Add a global search bar to filter questions by:
- Title text
- Body text
- Category

### 🔹 Admin Tools
Administrative features such as:
- Delete questions
- Remove answers
- Manage categories

### 🔹 UI/UX Enhancements
- Add dark mode
- Improve spacing and card design
- Add animations and transitions
- Improve mobile layout and responsiveness

## Database Schema (SQL)

```sql
create database project_4;
use project_4;

create table users (
  user_id int auto_increment primary key,
  username varchar(50) not null unique,
  password_hash varchar(255) not null,
  created_at timestamp default current_timestamp
);

create table categories (
  category_id int auto_increment primary key,
  name varchar(50) not null unique
);

create table questions (
  question_id int auto_increment primary key,
  user_id int not null,
  category_id int not null,
  title varchar(150) not null,
  body text not null,
  created_at timestamp default current_timestamp,
  foreign key (user_id) references users(user_id),
  foreign key (category_id) references categories(category_id)
);

create table answers (
  answer_id int auto_increment primary key,
  question_id int not null,
  user_id int not null,
  body text not null,
  created_at timestamp default current_timestamp,
  foreign key (question_id) references questions(question_id),
  foreign key (user_id) references users(user_id)
);

insert into categories (name) values ('javascript'), ('react'), ('node');
show tables;

use project_4;

insert into users (username, password_hash)
values
('admin',  '$2b$10$N0UMOCKHASHQYyqVb9n9iJOiqs284lK0ZQ'), 
('techguru', '$2b$10$NXzMOCKHASHqpHkH6x3erU.0SXYx'),    
('supportbot', '$2b$10$RANDOMMOCKHASHrT6jY3KCd5Uao'); 

insert into questions (user_id, category_id, title, body)
values
(1, 1, 'Why is my eCloud dashboard not loading in Chrome?',
'The eCloud app freezes when loading the dashboard page in Chrome. Works in Firefox. Is there a known fix?'),

(2, 1, 'How do I enable debugging mode in eCloud script widgets?',
'I am trying to debug custom JS widgets inside eCloud. Is there a built-in debug flag?'),

(3, 1, 'eCloud script throws “undefined configuration” error',
'After updating my app template, the embedded script for forms no longer loads. Error says undefined config.');

insert into answers (question_id, user_id, body)
values
(1, 3, 'Try clearing browser cache. eCloud caches widget bundles aggressively in Chrome.'),
(2, 1, 'Yes — set window.ecloudDebug = true before loading the widget script.'),
(3, 2, 'This usually happens when environment variables are not passed to the JS bundle after a template update.');

insert into questions (user_id, category_id, title, body)
values
(1, 2, 'React component in eCloud freezes after prop update',
'My eCloud React widget rerenders infinitely when a prop changes. Is this expected behavior?'),

(2, 2, 'How to integrate eCloud API with React useEffect?',
'I want to auto-refresh ticket data using eCloud''s REST API. What is the recommended pattern?'),

(3, 2, 'React build fails when deploying eCloud Extension',
'Production build fails only when uploading to eCloud Extensions. Works locally.');

insert into answers (question_id, user_id, body)
values
(4, 3, 'Check your useEffect dependencies — eCloud pushes new props on every tick.'),
(5, 1, 'Use abort controllers to avoid race conditions. eCloud returns fast sequential responses.'),
(6, 2, 'Remove source maps; eCloud''s bundler rejects them unless configured.');

insert into questions (user_id, category_id, title, body)
values
(1, 3, 'eCloud API returns 401 when calling from Node server',
'I added the API key in headers but still seeing unauthorized. Anyone know why?'),

(2, 3, 'Node cron job not triggering automated eCloud backups',
'I scheduled hourly backups but the Node cron script never fires in production.'),

(3, 3, 'How to fix ECONNRESET when uploading files to eCloud Storage?',
'Large file uploads fail with ECONNRESET. Small files upload fine.');

insert into answers (question_id, user_id, body)
values
(7, 3, 'Ensure your server time is synced. eCloud requires timestamp drift < 10 seconds.'),
(8, 1, 'If you host on Render or Vercel, cron is disabled. Use the eCloud Scheduled Tasks API instead.'),
(9, 2, 'You need to increase the upload timeout. eCloud Storage takes longer for files >100MB.');

