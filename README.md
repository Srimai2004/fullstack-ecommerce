# Full Stack E-Commerce Application

Complete React + Spring Boot + MySQL e-commerce application with JWT authentication, role-based access, cart, checkout, order history, and admin product management.

## Tech Stack

- Frontend: React, HTML, CSS, JavaScript, Vite
- Backend: Spring Boot, Spring Security, Spring Data JPA, REST APIs
- Database: MySQL
- Authentication: JWT

## Project Structure

```text
fullstack-ecommerce/
  backend/                  Spring Boot REST API
  frontend/                 React client
  database/                 MySQL schema and sample data
  API_ENDPOINTS.md          REST API reference
```

## Prerequisites

- Java 17+
- Maven 3.9+
- Node.js 18+
- MySQL 8+

## Database Setup

```sql
CREATE DATABASE ecommerce_db;
```

Then run:

```bash
mysql -u root -p ecommerce_db < database/schema.sql
```

The backend also seeds default users and products from `backend/src/main/resources/data.sql`.

Default accounts:

- Admin: `admin@example.com` / `Admin@123`
- User: `user@example.com` / `User@123`

## Backend Setup

Update MySQL credentials in:

```text
backend/src/main/resources/application.properties
```

Run:

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## File Explanation

### Backend

- `pom.xml`: Maven dependencies for Spring Boot, Security, JPA, MySQL, validation, and JWT.
- `EcommerceApplication.java`: Spring Boot application entry point.
- `config/SecurityConfig.java`: Stateless Spring Security setup with JWT filter and role rules.
- `config/JwtAuthenticationFilter.java`: Reads Bearer tokens and authenticates requests.
- `config/DataSeeder.java`: Creates default admin/user accounts and sample products.
- `security/JwtService.java`: Generates and validates JWT tokens.
- `entity/*`: JPA entities for users, roles, products, carts, orders, and order items.
- `repository/*`: Spring Data JPA repositories.
- `service/*`: Business logic for auth, products, cart, and orders.
- `controller/*`: REST API endpoints.
- `dto/*`: Request and response objects used by controllers.
- `exception/*`: Centralized exception handling.
- `resources/application.properties`: Database, JPA, CORS, and JWT settings.
- `resources/data.sql`: Optional sample SQL data.

### Frontend

- `package.json`: React/Vite dependencies and scripts.
- `src/main.jsx`: React app bootstrap.
- `src/App.jsx`: Route definitions.
- `src/api/api.js`: Central fetch wrapper with JWT support.
- `src/context/AuthContext.jsx`: Auth state, login, register, logout.
- `src/context/CartContext.jsx`: Cart state and cart API actions.
- `src/components/*`: Navbar, route guards, reusable product card.
- `src/pages/*`: Login, register, products, cart, checkout, orders, and admin dashboard.
- `src/styles.css`: Complete responsive styling.

## Roles

- `ROLE_USER`: Browse products, search, add to cart, checkout, view order history.
- `ROLE_ADMIN`: All user permissions plus admin dashboard and product CRUD.

