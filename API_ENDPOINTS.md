# API Endpoints

Base URL: `http://localhost:8080/api`

## Auth

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | Public | Register a user |
| POST | `/auth/login` | Public | Login and receive JWT |
| GET | `/auth/me` | User/Admin | Current user profile |

## Products

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/products` | Public | List products |
| GET | `/products?search=phone` | Public | Search products |
| GET | `/products/{id}` | Public | Product details |
| POST | `/admin/products` | Admin | Create product |
| PUT | `/admin/products/{id}` | Admin | Update product |
| DELETE | `/admin/products/{id}` | Admin | Delete product |

## Cart

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/cart` | User/Admin | View cart |
| POST | `/cart/items` | User/Admin | Add item to cart |
| PUT | `/cart/items/{productId}` | User/Admin | Update quantity |
| DELETE | `/cart/items/{productId}` | User/Admin | Remove item |
| DELETE | `/cart` | User/Admin | Clear cart |

## Orders

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/orders/checkout` | User/Admin | Checkout current cart |
| GET | `/orders` | User/Admin | Current user's order history |
| GET | `/admin/orders` | Admin | All orders |

