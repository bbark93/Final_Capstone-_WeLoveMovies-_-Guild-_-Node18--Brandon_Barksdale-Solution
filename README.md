# We Love Movies API

A RESTful movie database API built with Node.js, Express, Knex, and PostgreSQL.

This application provides endpoints for retrieving movie information, theater listings, and critic reviews. It supports movie-theater relationships, review management, and critic data retrieval through a structured relational database.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Docker Support](#docker-support)
- [Error Handling](#error-handling)
- [License](#license)

---

# Overview

We Love Movies is a backend API that powers a movie review and theater discovery application.

The API allows users to:

- Browse movies
- View movies currently showing in theaters
- Retrieve theater information
- Access critic reviews
- Update reviews
- Delete reviews
- View movie-specific theaters and reviews

---

# Features

## Movies

- Retrieve all movies
- Retrieve a single movie
- View theaters showing a movie
- View reviews for a movie
- Filter currently showing movies

## Reviews

- Retrieve reviews
- Include critic information
- Update reviews
- Delete reviews

## Theaters

- Retrieve all theaters
- Include movies currently playing

## API Infrastructure

- Express middleware architecture
- Centralized error handling
- CORS support
- Knex query builder
- Relational database support

---

# Technology Stack

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL
- SQLite3 (development/testing support)

### ORM / Query Builder

- Knex.js

### Testing

- Jest
- Supertest

### Development

- Nodemon
- Docker

---

# Database Schema

## Movies

| Column | Type |
|----------|----------|
| movie_id | Integer (PK) |
| title | String |
| runtime_in_minutes | Integer |
| rating | String |
| description | Text |
| image_url | String |
| created_at | Timestamp |
| updated_at | Timestamp |

---

## Critics

| Column | Type |
|----------|----------|
| critic_id | Integer (PK) |
| preferred_name | String |
| surname | String |
| organization_name | String |
| created_at | Timestamp |
| updated_at | Timestamp |

---

## Reviews

| Column | Type |
|----------|----------|
| review_id | Integer (PK) |
| content | Text |
| score | Integer |
| critic_id | Integer (FK) |
| movie_id | Integer (FK) |
| created_at | Timestamp |
| updated_at | Timestamp |

Relationships:

- Review belongs to one Movie
- Review belongs to one Critic

---

## Theaters

| Column | Type |
|----------|----------|
| theater_id | Integer (PK) |
| name | String |
| address_line_1 | String |
| address_line_2 | String |
| city | String |
| state | String |
| zip | String |
| created_at | Timestamp |
| updated_at | Timestamp |

---

## Movies_Theaters

Join table for movie showings.

| Column | Type |
|----------|----------|
| movie_id | Integer (FK) |
| theater_id | Integer (FK) |
| is_showing | Boolean |

Relationships:

- Many Movies → Many Theaters

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd project-movie-back-end
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=<database_connection_string>
```

Example:

```env
DATABASE_URL=postgres://username:password@localhost:5432/we_love_movies
```

---

# Available Scripts

## Development

```bash
npm run start:dev
```

Runs the server using Nodemon.

---

## Production

```bash
npm start
```

Starts the application.

---

## Database Migration

Run latest migrations:

```bash
npm run migrate
```

Rollback migration:

```bash
npm run rollback
```

Run seeds:

```bash
npm run seed
```

Reset database:

```bash
npm run reset
```

---

## Testing

Run all tests:

```bash
npm test
```

---

# Running the Application

## Start Development Server

```bash
npm run start:dev
```

Default:

```text
http://localhost:5001
```

---

# API Endpoints

## Movies

### Get All Movies

```http
GET /movies
```

---

### Get Movie Details

```http
GET /movies/:movieId
```

---

### Get Reviews for a Movie

```http
GET /movies/:movieId/reviews
```

---

### Get Theaters Showing a Movie

```http
GET /movies/:movieId/theaters
```

---

### Get Currently Showing Movies

```http
GET /movies?is_showing=true
```

---

## Reviews

### Update Review

```http
PUT /reviews/:reviewId
```

Request:

```json
{
  "data": {
    "content": "Updated review",
    "score": 5
  }
}
```

---

### Delete Review

```http
DELETE /reviews/:reviewId
```

Returns:

```http
204 No Content
```

---

## Theaters

### Get All Theaters

```http
GET /theaters
```

---

# Example Response

```json
{
  "data": {
    "movie_id": 1,
    "title": "The Shawshank Redemption",
    "runtime_in_minutes": 142,
    "rating": "R",
    "description": "Two imprisoned men bond over a number of years.",
    "image_url": "https://..."
  }
}
```

---

# Project Structure

```text
src/
│
├── app.js
│
├── movies/
│   ├── movies.controller.js
│   ├── movies.router.js
│   └── movies.service.js
│
├── reviews/
│   ├── reviews.controller.js
│   ├── reviews.router.js
│   └── reviews.service.js
│
├── theaters/
│   ├── theaters.controller.js
│   ├── theaters.router.js
│   └── theaters.service.js
│
├── db/
│   ├── migrations/
│   ├── seeds/
│   └── connection.js
│
└── utils/
```

---

# Testing

The project uses:

- Jest
- Supertest

Run tests:

```bash
npm test
```

---

# Docker Support

Build image:

```bash
npm run docker:build
```

Run container:

```bash
npm run docker:run
```

Run tests inside Docker:

```bash
npm run docker:test
```

Stop running containers:

```bash
npm run docker:stop
```

---

# Error Handling

The API uses centralized Express error handling middleware.

Example response:

```json
{
  "error": "Movie cannot be found."
}
```

Common HTTP statuses:

| Status | Meaning |
|----------|----------|
| 400 | Bad Request |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

# License

ISC License
