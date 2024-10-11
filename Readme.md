# Medium Blogging Website

The Blogging Platform is a modern web application designed to mimic the functionality of popular platforms like Medium, allowing users to create, update, and manage blog posts. The project utilizes a comprehensive tech stack including **React** for the frontend, **Cloudflare Workers** for serverless backend processing, and **PostgreSQL** as the database, all tied together with **Prisma ORM** for efficient database interactions. It ensures secure user authentication through **JWT (JSON Web Tokens)**, while **Zod** is employed to validate incoming data and infer types for better type safety with **TypeScript**. The project emphasizes a clean, scalable structure by separating frontend, backend, and shared modules into different parts. Key features include user signup, login, blog post creation, editing, and retrieval. This project demonstrates best practices in serverless architecture, database management, and type-safe development, making it a valuable learning experience for developers aiming to build robust, scalable web applications.

## Project Overview

The stack used for building the application is:

- **Frontend**: React
- **Backend**: Cloudflare Workers
- **Validation**: Zod (with type inference)
- **Language**: TypeScript
- **ORM**: Prisma (with connection pooling)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

The project is divided into two main sections:

1. **Backend**: Implements APIs and handles requests using Cloudflare Workers.
2. **Frontend**: Provides the user interface built with React.

## Features

1. **User Authentication**: 
   - Sign-up and sign-in functionality with JWT-based authentication.
   - Passwords are securely stored using hashing.
2. **Blog Management**:
   - Users can create, update, and retrieve blogs.
   - Protected routes ensure only authenticated users can create or edit blogs.

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- PostgreSQL database

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/miravanisri/MediumBloggingApp.git
    cd MEDIUM_BLOGGING_APP/backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Initialize the project with Cloudflare Workers and Hono framework:
    ```bash
    npm create hono@latest
    ```

4. Configure environment variables:
    - Create an `.env` file in the `backend` directory:
    ```bash
    DATABASE_URL="postgres://yourusername:yourpassword@host/db"
    JWT_SECRET="your_jwt_secret"
    ```

5. Initialize the Prisma ORM:
    ```bash
    npx prisma init
    ```

6. Migrate the Prisma schema:
    ```bash
    npx prisma migrate dev --name init_schema
    ```

7. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend folder:
    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

### API Endpoints

- `POST /api/v1/user/signup`: Sign up a new user.
- `POST /api/v1/user/signin`: Sign in an existing user.
- `POST /api/v1/blog`: Create a new blog post.
- `PUT /api/v1/blog`: Update an existing blog post.
- `GET /api/v1/blog/:id`: Get a single blog post by ID.
- `GET /api/v1/blog/bulk`: Get all blog posts.

### Prisma Schema

The database schema for users and blogs is defined using Prisma:

```prisma
model User {
  id       String   @id @default(uuid())
  email    String   @unique
  name     String?
  password String
  posts    Post[]
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
}

```
### Deployment
1. Log into Cloudfare
```
wrangler login
```
2. Deploy the Application
```
npm run deploy
```
3. Test the production URL using Postman or any other API client.


