# ASD Workshop - Express Caching

## Project Structure

- Routes - API routes
- Middleware - Cache middleware
- Controllers - Request and response handling
- Services - Business logic and cache service
- Database - Database operations 

## Features

- GET /products caching
- GET /products/:id caching
- Cache HIT and MISS headers
- 1 minute TTL
- Cache invalidation after POST, PUT, PATCH and DELETE

## Request Flow

Route → Middleware → Controller → Service → Database
