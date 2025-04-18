# Backend Event Management System

## Project Overview
This is a robust backend event management system built using **Node.js + Express**, with **MongoDB** as the database. The system is designed to handle events with features including user authentication, event management, file uploads, and automated scheduling.

### Core Features
- **JWT-based Authentication**: Secure user registration and login
- **Complete Event Management**: Create, view, update, and delete events
- **File Upload System**: Support for event banner images
- **Automated Scheduling**: Cron jobs for event reminders and status updates

## Tech Stack
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Handling**: Multer for file uploads
- **Scheduling**: Node-cron for automated tasks

## File Structure
```
project-folder/
│
├── controllers/         # Logic for handling routes
│   ├── authController.js
│   ├── eventController.js
│
├── models/              # MongoDB models
│   ├── user.js
│   ├── event.js
│
├── middleware/          # Middleware functions
│   ├── authMiddleware.js
│   ├── loggerMiddleware.js
│
├── cronjobs/            # Cron job logic
│   ├── eventReminder.js
│   ├── eventStatusUpdater.js
│
├── uploads/             # Folder for event banners
│
├── routes/              # Express routes
│   ├── authRoutes.js
│   ├── eventRoutes.js
│
├── config/              # Configuration files
│   ├── db.js
│   ├── cron.js
│
├── .env                 # Environment variables
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend-event-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   The server will start on http://localhost:5000

## API Endpoints Summary

### Authentication
- **POST /auth/register** - Register a new user
- **POST /auth/login** - Login and get JWT token

### Event Management
- **GET /events** - List all events
- **GET /events/:id** - Get a specific event
- **POST /events** - Create a new event (authenticated)
- **PUT /events/:id** - Update an event (creator only)
- **DELETE /events/:id** - Delete an event
- **POST /events/:id/upload** - Upload a banner for an event

## Cron Jobs
The system includes two automated cron jobs:

1. **Event Reminder**: Runs every minute to check for events starting in the next 5 minutes
2. **Event Status Updater**: Runs every 10 minutes to update event statuses based on time

## License
This project is licensed under the MIT License - see the LICENSE file for details.