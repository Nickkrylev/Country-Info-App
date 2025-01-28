# Project Setup

## Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Clone the Repository
```sh
git clone https://github.com/your-repo/Country-Info-App.git
cd Country-Info-App
```

---

## Backend Setup (NestJS)
Navigate to the `backend` directory and install dependencies:
```sh
cd backend
npm install  # or yarn install
```

### Environment Configuration
Create a `.env` file in the `backend` directory and configure your environment variables as needed:
```
PORT=3000

```

### Run the Backend Server
Start the NestJS server with:
```sh
npm run start:dev  # or yarn start:dev
```
The backend will run on `http://localhost:3000` (or the port specified in `.env`).

---

## Frontend Setup (React)
Navigate to the `frontend` directory and install dependencies:
```sh
cd ../frontend
npm install  # or yarn install
```

### Run the Frontend App
Start the React application with:
```sh
npm start  # or yarn start
```
The frontend will be available at `http://localhost:3000`.

---

## Running Both Services
For development convenience, you can run both frontend and backend simultaneously:
```sh
# Start backend in one terminal
cd backend
npm run start:dev

# Start frontend in another terminal
cd ../frontend
npm start
```

---

## Build and Deploy
### Backend Build
```sh
cd backend
npm run build
```
### Frontend Build
```sh
cd frontend
npm run build
```
The frontend build files will be in the `frontend/build` directory.

---


