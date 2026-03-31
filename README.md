# WTWR Backend

## Project Pitch Video

-Watch the project overview here:  
[https://www.loom.com/share/ab6db5eeb10d4ab0b9f7ada20378a089](https://www.loom.com/share/ab6db5eeb10d4ab0b9f7ada20378a089)

-Check out the frontend repo here:
[https://github.com/WyattYousey/se_project_react_WTWR](https://github.com/WyattYousey/se_project_react_WTWR)

-Check out the live demo here:
[https://whatstheweather.flowtemp.ro/](https://whatstheweather.flowtemp.ro/)

---

## Overview

WTWR (What To Wear Right) is a Node.js and Express backend for a weather-based wardrobe application. It manages users and clothing items, stores data in MongoDB, and exposes a REST API used by the frontend to suggest clothing based on weather categories (`hot`, `warm`, `cold`).

The project focuses on clean API design, clear data modeling, and maintainable backend architecture.

---

## Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Server framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **Validator.js** – Schema validation

---

## Core Features

- Create, retrieve, and delete clothing items
- Associate clothing items with users
- Like and dislike clothing items
- Categorize clothing by weather (`hot`, `warm`, `cold`)
- Create and retrieve users
- Consistent API error handling

---

## API Structure

The backend follows a clear REST architecture:

- **Routes** – Define API endpoints
- **Controllers** – Handle request and response logic
- **Models** – Define database schemas and validation

This separation keeps the project organized and easy to extend.

---

## Data Models

### User

- `name` – Required string with length constraints
- `avatar` – Required URL with validation

### Clothing Item

- `name` – Required string with length constraints
- `weather` – Enum: `hot`, `warm`, `cold`
- `imageUrl` – Required URL
- `owner` – Reference to a user
- `likes` – Array of user references
- `createdAt` – Automatically generated timestamp

Mongoose schemas help enforce validation and maintain data integrity.

---

## Development Practices

- Schema validation with Mongoose and Validator.js
- Controller-based route logic
- Centralized error handling
- MongoDB document relationships using ObjectIds
- Express middleware for request processing
- Atomic MongoDB operators (`$addToSet`, `$pull`) for managing likes safely

---

## Current Limitations

- Authentication is currently mocked via middleware
- Weather data is manually provided
- Configured for local MongoDB usage

---

## Future Improvements

- Add JWT-based authentication
- Integrate a real weather API
- Add request validation (Joi / Celebrate)
- Implement pagination and filtering
- Prepare environment configuration for production

---

## Purpose

This project was built to practice backend development using modern Node.js tools. It demonstrates REST API design, database modeling, and scalable backend structure while remaining simple and readable.
