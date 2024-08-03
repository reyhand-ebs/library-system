# Library System Backend
The Library System Backend provides APIs for managing books, borrowers, and library transactions. It is built using Node.js, Express, Sequelize (for database management), and Swagger for API documentation.

## Installation
### 1. Clone this repository to your local machine:
git clone https://github.com/reyhand-ebs/library-system

### 2. Navigate to the project directory:
cd library-system-backend

### 3. Install dependencies:
npm install

### 4. Create a .env file and set environment variables (e.g., database connection details, secret keys).

### 5. Run database migrations:
npx sequelize-cli db:migrate

### 6. Run database seeders:
npx sequelize-cli db:seed:all

## Usage
- ### Start the server in development mode:
npm run start
- ### Run tests (using Jest):
npm test

## API Documentation
- Access the Swagger documentation at: http://localhost:3000/api-docs

## Dependencies
- Express: Web framework for handling routes and middleware.
- Sequelize: SQL ORM for managing database models and migrations.
- Swagger: For API documentation.
- dotenv: For managing environment variables.
- pg and pg-hstore: PostgreSQL database driver and hstore support.
- body-parser: Middleware for parsing request bodies.
- jest: Testing framework.
- nodemon: Development tool for auto-reloading the server during development.
- supertest: For testing HTTP endpoints.

## Author
Mohamad Reyhand Fatturrahman