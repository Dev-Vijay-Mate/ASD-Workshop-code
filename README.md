# ASD Workshop - Express Caching

## Project Structure

- routes - API routes
- middleware - Cache middleware
- controllers - Request and response handling
- services - Business logic and cache service
- database - Database operations

## Features

- GET /products caching
- GET /products/:id caching
- Cache HIT and MISS headers
- 1 minute TTL
- Cache invalidation after POST, PUT, PATCH and DELETE

## Request Flow

Route → Middleware → Controller → Service → Database