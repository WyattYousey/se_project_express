# WTWR Backend

## Overview

WTWR (What To Wear Right) is a Node.js and Express-based backend that supports a weather-driven wardrobe application. This service is responsible for managing users and clothing items, persisting data with MongoDB, and exposing a RESTful API that enables the frontend to surface optimal clothing options based on weather categories (`hot`, `warm`, `cold`).

The backend emphasizes clean data modeling, predictable API behavior, and scalability, making it a strong foundation for future enhancements such as authentication, third-party weather API integration, and production deployment.

---

## Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – HTTP server and routing framework
- **MongoDB** – NoSQL document database
- **Mongoose** – Object Data Modeling (ODM) library
- **Validator.js** – Schema-level input validation

---

## Core Features

- Create, retrieve, and delete clothing items
- Associate clothing items with specific users
- Like and dislike clothing items
- Categorize clothing by weather type (`hot`, `warm`, `cold`)
- Create and retrieve users
- Centralized error handling for consistent API responses

---

## API Architecture

The backend follows RESTful conventions and maintains a clear separation of concerns:

- **Routes** define endpoint structure
- **Controllers** encapsulate request and response logic
- **Models** enforce schema definitions and validation rules

This structure improves maintainability and makes the codebase easier to extend as the application grows.

---

## Data Models

### User

- `name` – Required string with length constraints
- `avatar` – Required URL with schema-level validation

### Clothing Item

- `name` – Required string with length constraints
- `weather` – Enum-based categorization (`hot`, `warm`, `cold`)
- `imageUrl` – Required, validated URL
- `owner` – Reference to a user document
- `likes` – Array of user references
- `createdAt` – Automatically generated timestamp

Mongoose schemas are used to enforce data integrity at the database layer, reducing the need for excessive validation logic in controllers.

---

## Notable Practices & Techniques

- Schema-driven validation using Mongoose and Validator.js
- Controller abstraction to keep route handlers concise
- Centralized error handling for predictable API responses
- MongoDB document relationships via ObjectId references
- Express middleware for request preprocessing
- Atomic update operators (`$addToSet`, `$pull`) to manage likes safely

These practices reflect real-world backend patterns commonly used in production Express applications.

---

## Current Limitations

- Authentication is mocked via middleware (no JWT or sessions yet)
- Weather data is user-provided (no external weather API integration)
- Configured for local MongoDB usage only

These limitations are intentional and leave clear room for future iterations.

---

## Future Improvements

- Implement authentication and authorization (JWT-based)
- Integrate a real-time weather API
- Add request-level validation (e.g., Joi or Celebrate)
- Introduce pagination and query-based filtering
- Prepare environment configuration for production deployment

---

## Purpose

This backend was built as a learning-focused yet portfolio-ready project. It demonstrates mid-level backend development concepts such as API architecture, data modeling, and database interactions while remaining readable, maintainable, and extensible.
