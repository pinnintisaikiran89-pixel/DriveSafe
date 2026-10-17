# DriveSafe

**AI-powered road safety and accident-risk awareness**

DriveSafe is a road-safety application designed to help users explore
accident hotspots, estimate accident severity from contextual inputs,
and review route-safety information. The project combines a React
frontend, a Flask API, and a Python machine-learning service.

> **Project status:** Deployment is being prepared. Public production
> URLs are not listed here because they have not yet been confirmed.

## Features

-   **Accident severity prediction** using contextual details such as
    weather, road type and condition, lighting, traffic control, speed
    limit, driver details, alcohol status, and vehicle type.
-   **Accident hotspot discovery** through the backend hotspot API.
-   **Risk assessment** using prediction and nearby-hotspot information.
-   **Route-safety tools** for exploring safer travel choices.
-   **Interactive maps and location features** using Google Maps and
    browser/device geolocation.
-   **User authentication** through Firebase Authentication.
-   **Mobile app foundation** using Capacitor and an Android project.

Features available at runtime depend on the configured API keys,
environment variables, backend services, and the current implementation.

## Technology stack

### Frontend

-   React
-   JavaScript
-   Tailwind CSS and project-specific CSS
-   React Router
-   Framer Motion
-   Firebase Authentication
-   Google Maps integration
-   Capacitor for Android

### Backend

-   Python
-   Flask
-   Flask-CORS
-   Geopy / OpenStreetMap Nominatim (where configured)

### Machine learning

-   Python
-   Scikit-learn
-   Pandas
-   NumPy
-   Serialized model file (`ml-service/model.pkl`)

## Repository structure

``` text
DriveSafe/
├── backend/                 # Flask API and supporting services
│   ├── app.py
│   ├── routes/               # Prediction, hotspot, risk, route and location APIs
│   └── services/             # Risk, ML, hotspot and route logic
├── database/                 # Database-related project files, if present
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   ├── android/              # Capacitor Android project
│   ├── package.json
│   └── capacitor.config.ts
└── ml-service/               # Machine-learning API and model
    ├── app.py
    ├── train.py
    └── model.pkl
```

Some filenames and directories may change as the project evolves.

## Prerequisites

Install the tools needed for the parts you want to run:

-   Git
-   Node.js and npm
-   Python 3
-   pip
-   Java and Android Studio only if building/running the Android app

## Clone the repository

``` bash
git clone https://github.com/pinnintisaikiran89-pixel/DriveSafe.git
cd DriveSafe
```

## Run locally

The commands below are a starting point. Check the dependencies and
entry points in the current `package.json` and Python files if a command
differs from your local setup.

### 1. Start the ML service

``` bash
cd ml-service
python -m venv .venv
```

Activate the environment:

**Windows PowerShell**

``` powershell
.\.venv\Scripts\Activate.ps1
```

**macOS/Linux**

``` bash
source .venv/bin/activate
```

Install the dependencies listed by the project (for example, from a
`requirements.txt` if present). Then start the service using the entry
point and port configured in `ml-service/app.py`. If the service uses
Flask's development server, a typical command is:

``` bash
python app.py
```

### 2. Start the Flask backend

Open another terminal:

``` bash
cd backend
python -m venv .venv
```

Activate the environment using the instructions above, install the
backend dependencies listed by the project, then start the backend using
its configured entry point. If the app is configured to run directly:

``` bash
python app.py
```

Make sure the backend's ML-service URL points to the ML service address.
A local-only URL such as `127.0.0.1` works only when both services are
running in the same machine/network context.

### 3. Start the React frontend

Open another terminal:

``` bash
cd frontend
npm install
npm start
```

Create and configure the environment variables required by the current
frontend code before starting it. In particular, check the API base URL,
Firebase configuration, and Google Maps configuration. Do not commit
secrets or private credentials to Git.

## Configuration and security

-   Keep API keys, private credentials, service-account JSON files, and
    `.env` files out of source control.
-   Use environment variables for deployment-specific API URLs and
    secrets.
-   Configure Firebase Authentication authorized domains for the
    deployed frontend.
-   Restrict Google Maps API keys to the appropriate APIs and
    websites/apps.
-   Configure Flask CORS to allow only the frontend origins you intend
    to serve.
-   Do not expose development servers or local `127.0.0.1` URLs as
    production endpoints.
-   Review any test scripts and sample data before deploying publicly.

## Deployment overview

DriveSafe has three deployable parts:

1.  **ML service** --- exposes the prediction functionality.
2.  **Flask backend** --- serves the application's API routes and calls
    the ML service.
3.  **React frontend** --- provides the web interface and calls the
    deployed backend.

Deploy the ML service first, then configure and deploy the Flask backend
with the ML service's public/internal URL. Finally, configure the
frontend API base URL and deploy the React app. Update Firebase
authorized domains, Google Maps restrictions, and CORS settings for the
production domains.

No production deployment URLs are included until they are available and
verified.

## Notes

-   Predictions are estimates based on the model and inputs; they are
    not a guarantee of actual road conditions or accident outcomes.
-   Always follow traffic laws and official safety guidance.
-   Location, mapping, authentication, and prediction functionality may
    require valid configuration and network access.

## Author

**Sai Kiran Pinninti**

-   GitHub:
    [@pinnintisaikiran89-pixel](https://github.com/pinnintisaikiran89-pixel)
-   Repository:
    [DriveSafe](https://github.com/pinnintisaikiran89-pixel/DriveSafe)

------------------------------------------------------------------------

*Drive smart. Arrive safe.*
