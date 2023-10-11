# Smart Contract Audit System

This project implements a web platform for auditing Solidity smart contracts using Slither static analysis.

## Architecture

- **Frontend**: React + Tailwind CSS
- **Backend**: Python FastAPI
- **Smart Contract Analysis**: Slither API
- **Database**: MySQL

## Project folder structure

```bash
group2-25/
├── backend/                 # Backend application folder
│   ├── slither.wiki/        # folder containing documentation clone from slither.wiki 
│   │   └── Detector-Documentation.md  # Documentation file
│   ├── uploads/             # folder to store uploaded contract files
│   ├── __init__.py          # Python package initialiser
│   ├── crud.py              # CRUD operations for database interactions
│   ├── database.py          # Database connection and session management
│   ├── main.py              # Main entry point for the backend application
│   ├── models.py            # Database models using SQLAlchemy's declarative base
│   ├── services.py          # Utility functions and services for the application logic
│   └── requirements.txt     # List of required Python packages for the backend
├── frontend/                # Frontend application folder
│   ├── node_modules/        # dependencies for the frontend
│   ├── public/             
│   └── src/                 # Source code folder for the frontend
│       ├── assets/          # static assets folder for the frontend
│       ├── components/      # Reusable React components
│       ├── pages/           # React components representing pages of the application
│       ├── api.js           # handles API calls from the frontend
│       ├── App.js           
│       ├── constant.js      # defining constants that are used across the frontend application
│       ├── index.css        
│       ├── index.js         
│       ├── package-lock.json  
│       ├── package.json      # Node.js package file
│       └── tailwind.config.js  # Configuration file for Tailwind CSS
└── README.md                # Project README file
```

## Setup

### Prerequisites

- Node.js
- Python 3

#### Frontend

```bash
cd frontend
npm install
npm start
```

#### Backend

```bash
cd backend
pip3 install virtualenv
virtualenv venv
venv\Scripts\activate
pip3 install -r requirements.txt
uvicorn main:app --reload
```

On wins: Set-ExecutionPolicy Unrestricted -Scope Process (only if have error: cannot run scripts due to restricted permissions)

**Note:** 
- MacOS use: ```source venv/bin/activate```
- Windows use: ```venv\Scripts\activate```


### Usage

The frontend will be available at http://localhost:3000

Use the upload form to submit a solidity smart contract file (.sol) for auditing.

The backend will run static analysis via Slither and save results to the database.

Audit reports for each submission can be viewed on the **Report History** page.

### Running Slither

Slither analyse cmd in CLI

```
solc-select install 0.8.4
solc-select use 0.8.4 
slither contract.sol --checklist > result.md
```

### Documentation

- Backend API is documented at http://localhost:8000/docs
