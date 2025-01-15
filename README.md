# Interview_Scheduler_Project_Assignment

Here's a professional README template for your project:

---

# Interview Scheduler

## Overview

This project is a functional React application that allows HR/Recruiters to efficiently schedule, manage, and view interviews. The application enables scheduling, rescheduling, and deleting interviews, as well as providing an interactive calendar view of the interviews. Additionally, it includes features like interview conflict validation, filtering, and notifications.

---

## Core Features

- **Interview Scheduling**:  
  - Display available time slots.  
  - Schedule interviews with candidate name, interviewer name, date, time slot, and interview type.  
  - Conflict validation for overlapping interviews.

- **Interview Dashboard**:  
  - Display a calendar or timeline view of all scheduled interviews.  
  - Filter interviews by date, interviewer, or candidate.

- **Rescheduling/Editing Interviews**:  
  - Allow updates to interview details (e.g., time, interviewer).  
  - Persist changes to the backend.

- **Deleting Interviews**:  
  - Enable interview deletion with confirmation.

- **Notifications**:  
  - Show success/error messages for scheduling, updating, or deleting interviews.

---

## Bonus Features

- **Drag-and-Drop Scheduling**:  
  Reschedule interviews by dragging events on the calendar.

- **Library Integration**:  
  Integrated `react-big-calendar` for an interactive timeline view.

- **Time Zone Handling**:  
  Support for scheduling interviews across different time zones.

- **Email/Notification Mock API**:  
  Simulate notifications for scheduled interviews.

---

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the backend server:

    ```bash
    npm run dev
    ```

   The backend will run on `http://localhost:5000` (or the specified port in your environment).

---

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm run dev
    ```

   The frontend will run on `http://localhost:3000`.

---

## Assumptions

- The backend is assumed to have mock data for interview scheduling.
- LocalStorage is used for persisting data in the frontend.
- No real-time notifications are implemented for this project.

---

## Challenges

- Integrating `react-big-calendar` into the project for a seamless calendar view.
- Handling time zone issues during interview scheduling.
- Ensuring the responsive design across multiple devices.

---

## Conclusion

This project aims to streamline the interview scheduling process for HR/Recruiters with a user-friendly interface and powerful features. The drag-and-drop scheduling and calendar integration make the platform more intuitive and efficient.

---

