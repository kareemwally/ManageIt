# ManageIt - To-Do Web Application

## Description

**ManageIt** is a simple, user-friendly to-do web application built with a Node.js backend and a React.js frontend. It allows users to manage their tasks, register and log in securely, and keep track of their productivity.

### Features

- User authentication (register, login)
- Manage tasks (add, view, delete)
- Real-time updates to tasks
- Secure password storage with bcrypt
- Responsive frontend built with React.js
- REST API for backend operations using Express.js

## Table of Contents

1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [API Endpoints](#api-endpoints)
4. [Environment Variables](#environment-variables)
5. [Deployment](#deployment)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)

## Installation

### 1. Clone the repository

bash

Copy code

`git clone https://github.com/kareemwally/ManageIt.git cd ManageIt`

### 2. Backend Setup

- Install backend dependencies:

bash

Copy code

`npm install`

- Configure the database connection:
    - Create a `.env` file in the root of the project:

makefile

Copy code

`DB_USER=<your-db-username> DB_PASSWORD=<your-db-password> DB_HOST=<your-db-host> DB_DATABASE=to_do`

- Ensure MySQL is running and you have created the `to_do` database.
    - You can create the database by logging into MySQL and running:

sql

Copy code

`CREATE DATABASE to_do;`

- Migrate the database structure (ensure you have tables for users and tasks).

### 3. Frontend Setup

- Navigate to the frontend folder:

bash

Copy code

`cd todo-frontend`

- Install frontend dependencies:

bash

Copy code

`npm install`

- Build the React app for production:

bash

Copy code

`npm run build`

This will create a `build/` folder inside the `todo-frontend` directory, which will be served by the backend.

## Running the Application

### 1. Start the backend server

In the root of the project, run:

bash

Copy code

`node index.js`

This will start the server, and it will serve the frontend and backend on the designated IP and port (default: port `3000`).

You can access the application by visiting:

arduino

Copy code

`http://localhost:3000`

or if deployed:

arduino

Copy code

`http://<your-server-ip>:3000`

## API Endpoints

### User Authentication

- **POST** `/api/register`
    
    - Registers a new user.
    - Payload: `{ "username": "user", "email": "user@email.com", "password": "password" }`
- **POST** `/api/login`
    
    - Logs in a user and returns the user ID.
    - Payload: `{ "username": "user", "password": "password" }`

### Task Management

- **GET** `/api/todos/:userId`
    
    - Fetches all tasks for the logged-in user.
- **POST** `/api/todos`
    
    - Adds a new task for the user.
    - Payload: `{ "user_id": "1", "title": "Task title", "description": "Task description" }`
- **DELETE** `/api/todos/:taskId`
    
    - Deletes a task by its ID.

## Environment Variables

Make sure you configure the following environment variables in a `.env` file:

makefile

Copy code

`DB_USER=<your-db-username> DB_PASSWORD=<your-db-password> DB_HOST=<your-db-host> DB_DATABASE=to_do PORT=3000`

## Deployment

### 1. Setup the server

Deploy the application on a server (e.g., AWS, DigitalOcean) and ensure the following:

- Node.js is installed.
- MySQL is installed and running.
- The necessary ports (3000 for Node.js and 80 for HTTP) are open.

### 2. Build the frontend and start the backend

After building the frontend and setting up the backend as described in the [Installation](#installation) section, start the Node.js server on your cloud server using:

bash

Copy code

`node index.js`

## Technologies Used

- **Backend**: Node.js, Express.js, MySQL, bcrypt
- **Frontend**: React.js, Axios
- **Deployment**: Nginx/Apache, MySQL

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.
	
