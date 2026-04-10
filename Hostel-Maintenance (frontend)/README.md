# Smart Hostel Complaint and Maintenance Management System

A centralized React frontend application for managing complaints across multiple college hostels (Hostel A, B, C, D).

## Features

- **Student Portal**: Login, dashboard with complaint stats, raise new complaints, view personal complaints
- **Admin Portal**: Login, dashboard with all complaints stats, manage and filter complaints, update status
- **Complaint Management**: Submit complaints with categories (Electricity, Plumbing, Water, Wi-Fi, Furniture, Cleanliness, Other)
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Data persists in browser localStorage (frontend only)

## Tech Stack

- React 19
- React Router DOM
- Vite
- CSS (no external libraries for styling)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/     # Reusable components (Navbar, Sidebar, etc.)
├── pages/          # Page components
├── data/           # Mock data
├── styles/         # CSS files
├── App.jsx         # Main app with routing
└── main.jsx        # Entry point
```

## Usage

- Visit the home page and choose Student Login or Admin Login
- Any username/password works for demo purposes
- Students can raise complaints and view their history
- Admins can view all complaints, filter by hostel/status, and update statuses

## Notes

- This is a frontend-only application with no backend
- Data is stored in localStorage for persistence
- Mock login: any credentials are accepted
