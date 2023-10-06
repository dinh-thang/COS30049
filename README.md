# Smart Contract Audit System

This project implements a web platform for auditing Solidity smart contracts using Slither static analysis.

## Architecture

- **Frontend**: React + Tailwind CSS
- **Backend**: Python FastAPI
- **Smart Contract Analysis**: Slither API
- **Database**: MySQL

## Setup

### Prerequisites

- Node.js
- Python 3

### Installation

Clone the repo

```bash 
git clone https://github.com/dinh-thang/COS30049-Smart-Contract-Audit-System.git
```

#### Frontend

```bash
cd client
npm install
npm start
```

#### Backend

```bash
cd server
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
