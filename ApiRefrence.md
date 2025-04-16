# API Reference

## Authentication Endpoints

### Register a New User
**Endpoint:** `POST /auth/register`

**Input Schema:**
```json
{
  "username": "string", // Required
  "email": "string", // Required, must be valid email format
  "password": "string" // Required, minimum 6 characters
}
```

**Success Response (200 OK):**
```json
{
  "message": "User registered successfully"
}
```

**Error Responses:**
- `400 Bad Request`: Missing or invalid fields
  ```json
  {
    "message": "Validation error: Email is required"
  }
  ```
- `409 Conflict`: User already exists
  ```json
  {
    "message": "User with this email already exists"
  }
  ```

---

### Login User
**Endpoint:** `POST /auth/login`

**Input Schema:**
```json
{
  "username": "string", // Required
  "password": "string" // Required
}
```

**Success Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT token
}
```

**Error Responses:**
- `400 Bad Request`: Missing fields
  ```json
  {
    "message": "Username and password are required"
  }
  ```
- `401 Unauthorized`: Invalid credentials
  ```json
  {
    "message": "Invalid username or password"
  }
  ```

## Event Endpoints

### List All Events
**Endpoint:** `GET /events`

**Query Parameters:**
- `limit`: Number of events to return (default: 10)
- `page`: Page number for pagination (default: 1)
- `status`: Filter by event status (optional: "upcoming", "ongoing", "completed")

**Success Response (200 OK):**
```json
{
  "events": [
    {
      "_id": "67ffe2df28a954575e92f173",
      "title": "AI Seminar",
      "description": "A seminar on AI and ML trends",
      "location": "Rizvi College, Bandra",
      "startTime": "2025-04-20T10:00:00.000Z",
      "endTime": "2025-04-20T12:00:00.000Z",
      "status": "upcoming",
      "maxParticipants": 50,
      "creator": "67ffe25a28a954575e92f16e",
      "bannerUrl": "/uploads/1744823152777-New Project.png",
      "createdAt": "2025-04-16T10:12:32.777Z",
      "updatedAt": "2025-04-16T10:12:32.777Z"
    }
    // More events
  ],
  "total": 15,
  "page": 1,
  "pages": 2
}
```

---

### Get Specific Event
**Endpoint:** `GET /events/:id`

**Success Response (200 OK):**
```json
{
  "event": {
    "_id": "67ffe2df28a954575e92f173",
    "title": "AI Seminar",
    "description": "A seminar on AI and ML trends",
    "location": "Rizvi College, Bandra",
    "startTime": "2025-04-20T10:00:00.000Z",
    "endTime": "2025-04-20T12:00:00.000Z",
    "status": "upcoming",
    "maxParticipants": 50,
    "creator": {
      "_id": "67ffe25a28a954575e92f16e",
      "username": "Juned Khan"
    },
    "bannerUrl": "/uploads/1744823152777-New Project.png",
    "createdAt": "2025-04-16T10:12:32.777Z",
    "updatedAt": "2025-04-16T10:12:32.777Z"
  }
}
```

**Error Responses:**
- `404 Not Found`: Event not found
  ```json
  {
    "message": "Event not found"
  }
  ```

---

### Create Event
**Endpoint:** `POST /events`  
**Authentication:** Required (JWT Bearer Token)

**Input Schema:**
```json
{
  "title": "string", // Required
  "description": "string", // Required
  "location": "string", // Required
  "startTime": "ISO8601 Date", // Required, must be future date
  "endTime": "ISO8601 Date", // Required, must be after startTime
  "maxParticipants": "number" // Optional, default is null (unlimited)
}
```

**Success Response (201 Created):**
```json
{
  "message": "Event created successfully",
  "event": {
    "_id": "67ffe2df28a954575e92f173",
    "title": "AI Seminar",
    "description": "A seminar on AI and ML trends",
    "location": "Rizvi College, Bandra",
    "startTime": "2025-04-20T10:00:00.000Z",
    "endTime": "2025-04-20T12:00:00.000Z",
    "status": "upcoming",
    "maxParticipants": 50,
    "creator": "67ffe25a28a954575e92f16e",
    "createdAt": "2025-04-16T10:12:32.777Z",
    "updatedAt": "2025-04-16T10:12:32.777Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors
  ```json
  {
    "message": "Validation error: Title is required"
  }
  ```
- `401 Unauthorized`: Missing or invalid token
  ```json
  {
    "message": "Unauthorized access"
  }
  ```

---

### Update Event
**Endpoint:** `PUT /events/:id`  
**Authentication:** Required (JWT Bearer Token)

**Input Schema:**
```json
{
  "title": "string", // Optional
  "description": "string", // Optional
  "location": "string", // Optional
  "startTime": "ISO8601 Date", // Optional
  "endTime": "ISO8601 Date", // Optional
  "maxParticipants": "number" // Optional
}
```

**Success Response (200 OK):**
```json
{
  "message": "Event updated successfully",
  "event": {
    "_id": "67ffe2df28a954575e92f173",
    "title": "Updated AI Seminar",
    // Other updated fields
    "updatedAt": "2025-04-16T11:15:22.123Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
  ```json
  {
    "message": "Unauthorized access"
  }
  ```
- `403 Forbidden`: User is not the creator
  ```json
  {
    "message": "Access denied: You are not the creator of this event"
  }
  ```
- `404 Not Found`: Event not found
  ```json
  {
    "message": "Event not found"
  }
  ```

---

### Delete Event
**Endpoint:** `DELETE /events/:id`  
**Authentication:** Required (JWT Bearer Token)

**Success Response (200 OK):**
```json
{
  "message": "Event deleted successfully"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
  ```json
  {
    "message": "Unauthorized access"
  }
  ```
- `403 Forbidden`: User is not the creator
  ```json
  {
    "message": "Access denied: You are not the creator of this event"
  }
  ```
- `404 Not Found`: Event not found
  ```json
  {
    "message": "Event not found"
  }
  ```

---

### Upload Event Banner
**Endpoint:** `POST /events/:id/upload`  
**Authentication:** Required (JWT Bearer Token)

**Request Format:** Form Data  
- Key: `banner`  
- Value: File (JPEG/PNG, max 2MB)

**Success Response (200 OK):**
```json
{
  "message": "Banner uploaded",
  "bannerUrl": "/uploads/1744823152777-New Project.png"
}
```

**Error Responses:**
- `400 Bad Request`: File validation errors
  ```json
  {
    "message": "Invalid file type. Only JPG, JPEG, and PNG files are allowed"
  }
  ```
  ```json
  {
    "message": "File size too large. Maximum size is 2MB"
  }
  ```
- `401 Unauthorized`: Missing or invalid token
  ```json
  {
    "message": "Unauthorized access"
  }
  ```
- `403 Forbidden`: User is not the creator
  ```json
  {
    "message": "Access denied: You are not the creator of this event"
  }
  ```
- `404 Not Found`: Event not found
  ```json
  {
    "message": "Event not found"
  }
  ```

## Error Handling

All API endpoints use consistent error handling patterns:

### Common Error Responses

1. **Server Error (500 Internal Server Error)**
   ```json
   {
     "message": "Internal server error"
   }
   ```

2. **Rate Limiting (429 Too Many Requests)**
   ```json
   {
     "message": "Too many requests, please try again later"
   }
   ```

3. **Authentication Errors**
   - Token Expired (401 Unauthorized)
     ```json
     {
       "message": "Token expired"
     }
     ```
   - Invalid Token Format (401 Unauthorized)
     ```json
     {
       "message": "Invalid token format"
     }
     ```

## Cron Jobs

The system includes two automated background tasks:

### Event Reminder
- **Schedule**: Runs every minute
- **Function**: Finds events starting in the next 5 minutes and logs reminders
- **Implementation**: Located in `cronjobs/eventReminder.js`

### Event Status Updater
- **Schedule**: Runs every 10 minutes
- **Function**: Updates event statuses based on the current time:
  - `upcoming` → `ongoing` when current time crosses start time
  - `ongoing` → `completed` when current time crosses end time
- **Implementation**: Located in `cronjobs/eventStatusUpdater.js`