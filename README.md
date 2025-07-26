
# Aamira Courier Package Tracker - Frontend (Dispatcher Dashboard)

This repository contains the frontend application for the Aamira Courier Package Tracker. It serves as the real-time dashboard for dispatchers to monitor package statuses, locations, and alerts.

## live link : https://aamira-courier-frontend.vercel.app/

## Table of Contents

- [Aamira Courier Package Tracker - Frontend (Dispatcher Dashboard)](#aamira-courier-package-tracker---frontend-dispatcher-dashboard)
  - [live link : https://aamira-courier-frontend.vercel.app/](#live-link--httpsaamira-courier-frontendvercelapp)
  - [Table of Contents](#table-of-contents)
  - [1. Project Overview](#1-project-overview)
  - [2. Technology Stack](#2-technology-stack)
  - [3. Features Implemented](#3-features-implemented)
  - [4. Getting Started](#4-getting-started)
    - [Prerequisites](#prerequisites)
    - [Backend Setup (Crucial!)](#backend-setup-crucial)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Running the Application](#running-the-application)
  - [5. Key Components](#5-key-components)
  - [6. Assumptions \& Trade-offs](#6-assumptions--trade-offs)
  - [7. Known Limitations \& Future Improvements](#7-known-limitations--future-improvements)
  - [8. Folder Structure](#8-folder-structure)
  - [9. License](#9-license)

---

## 1. Project Overview

The Aamira Courier Frontend provides a real-time web interface for dispatchers. It consumes data from the Aamira Courier Backend API, displaying active package information, historical events, and alerting dispatchers to packages that are experiencing delays. It also includes a simple form to simulate courier updates for testing purposes.

## 2. Technology Stack

* **Framework:** React (with Hooks)
* **Language:** TypeScript
* **Build Tool:** Vite
* **Real-time Communication:** Socket.IO Client
* **Styling:** Tailwind CSS

## 3. Features Implemented

* **Real-time Package List:** Displays all active packages (not `DELIVERED` or `CANCELLED`) that have been updated within the last 24 hours. Updates automatically and instantly via WebSockets.
* **Search and Filter:** Allows dispatchers to search packages by ID and filter by status.
* **Package Detail View:** Clicking on a package in the list navigates to a detailed view showing its current status, location, ETA, and a chronological history of all recorded events.
* **Stuck Package Visualization:** Packages flagged as "stuck" by the backend (no updates for >30 minutes) are visually highlighted in the list and detail view.
* **Simulate Courier Updates Form:** A form is provided on the main dashboard to simulate courier actions.
    * If `Package ID` is left empty, a new package is created with an auto-generated ID.
    * If an existing `Package ID` is provided, a new event is added to that package's history.
* **Real-time Alerts Display:** A banner displays recent "stuck package" alerts received from the backend via WebSockets.
* **API Key Authentication:** All API requests include an `X-API-Key` header for basic security.

## 4. Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* npm (Node Package Manager)
* **A running Aamira Courier Backend instance.**

### Backend Setup (Crucial!)

**This frontend application requires the backend server to be running.** For local development and to fully utilize the real-time WebSocket features, please ensure your backend project is set up and running locally.

1.  **Clone the backend repository:** If you haven't already, clone the [Aamira Courier Backend repository](https://github.com/your-repo/aamira-courier-server) (replace with your actual backend repo URL).
2.  **Follow the backend's `README.md` instructions** to install dependencies, configure its `.env` (especially `API_KEY` and `MONGO_URI`), and start the server (`npm run dev`).
3.  **Verify the backend is accessible:** Confirm it's running on `http://localhost:5000` (or your configured port).

### Installation

1.  **Clone this frontend repository:**
    ```bash
    git clone https://github.com/abujaforhadi/Aamira-Courier-Package-Tracker-Frontend
    
    cd aamira-courier-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root of the project (`aamira-courier-frontend/`) and configure the following:

```ini
VITE_API_BASE_URL=http://localhost:5000/api # Points to your local backend API
VITE_WS_URL=ws://localhost:5000           # Points to your local backend WebSocket server
VITE_API_KEY=your_secure_api_key_here     # IMPORTANT: Must exactly match the API_KEY in your backend's .env
````

  * **Note:** If you choose to deploy your backend to a different URL (e.g., Vercel), you would update `VITE_API_BASE_URL` to `https://your-backend-url.vercel.app/api` and `VITE_WS_URL` to `wss://your-backend-url.vercel.app`. However, for WebSocket functionality, a dedicated WebSocket service is often required for serverless deployments. For this challenge, **local execution of the backend is recommended.**

### Running the Application

1.  **Ensure your backend server is running** (as per [Backend Setup](https://www.google.com/search?q=%23backend-setup-crucial)).
2.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    This will compile TypeScript and start the Vite dev server. It will typically open your browser to `http://localhost:5173` (or another available port).

## 5\. Key Components

  * `App.tsx`: The main application component, managing routing between the package list and detail views. It also handles form submission logic.
  * `usePackages.ts` (Hook): A custom React Hook responsible for fetching initial package data, establishing and managing the Socket.IO connection, and updating package/alert states in real-time.
  * `PackageList.tsx`: Displays a searchable and filterable list of active packages, showing key information and highlighting stuck packages.
  * `PackageDetails.tsx`: Renders the detailed view of a single package, including its full event history and current status/location.
  * `PackageForm.tsx`: Provides a user interface to simulate courier updates, allowing new package creation or existing package updates.
  * `AlertDisplay.tsx`: Shows a temporary banner for new alerts received from the backend.
  * `src/interfaces/package.ts`: TypeScript interfaces defining the data structures for packages, events, and alerts, mirroring the backend's models.

## 6\. Assumptions & Trade-offs

  * **API Key Handling:** The API key is stored directly in the frontend's `.env` file for simplicity in this internal demo. In a production environment, it would typically be fetched securely or managed via more robust authentication flows.
  * **Map Visualization:** A basic "Map Placeholder" is used in the `PackageDetails` component. Full interactive map integration (e.g., using Leaflet or Google Maps API) is omitted due to time constraints.
  * **UI Polish:** The UI uses Tailwind CSS for rapid styling, focusing on functionality over extensive visual polish or advanced UX features.
  * **Error Display:** Basic error messages are displayed for API failures and WebSocket connection issues.
  * **Frontend Authentication:** The frontend assumes the backend handles authentication purely via the API key. There's no separate login/user management interface in the frontend itself.

## 7\. Known Limitations & Future Improvements

  * **Advanced Mapping:** Integrate a proper map library to visualize package locations and routes.
  * **Dispatcher Actions:** Allow dispatchers to "resolve" alerts, add private notes, or manually update package ETAs from the UI.
  * **User Interface Enhancements:** More refined filtering, sorting, pagination for large datasets, and a more interactive dashboard layout.
  * **Notifications:** Implement browser push notifications for alerts to ensure dispatchers are immediately aware.
  * **Responsive Design:** Further optimize the UI for various screen sizes and devices.
  * **Frontend Testing:** Add comprehensive unit and integration tests for React components and hooks.

## 8\. Folder Structure

```
aamira-courier-frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons
│   ├── components/         # Reusable React components
│   ├── hooks/              # Custom React Hooks for logic encapsulation
│   ├── interfaces/         # TypeScript interfaces for data models
│   ├── App.css             # Component-specific (or general) CSS (minimal if using Tailwind)
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global CSS (Tailwind directives here)
│   └── main.tsx            # Entry point for React application
├── .env.example            # Example environment variables file
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration for the app
├── tsconfig.node.json      # TypeScript configuration for Node.js-specific files (like vite.config.ts)
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration for Tailwind
└── README.md               # This file
```

## 9\. License

This project is licensed under the MIT License - see the `LICENSE` file for details (if you create one).

-----

```
```