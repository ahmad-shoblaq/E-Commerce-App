# E-Commerce App

A REST API for an e-commerce platform, built with NestJS and MongoDB. Supports customer registration with email verification, product/category/brand/coupon management, a shopping cart, and order placement with server-side pricing and coupon validation.

## Features

- Registration with email OTP verification, resend-OTP, and forgot/reset password
- JWT authentication with role-based access (Customer, Seller, Admin)
- Admin-only seller account creation
- Product catalog with categories, brands, and discounts (fixed amount or percentage)
- Shopping cart: add, view, and remove items
- Orders: server-computed pricing, coupon validation, and stock management
- Coupons: date-bounded, optionally restricted to specific customers
- Global validation, structured error responses, and request logging

## Tech Stack

- **Framework:** NestJS (TypeScript)
- **Database:** MongoDB with Mongoose
- **Auth:** JSON Web Tokens, bcrypt password hashing
- **Validation:** class-validator / class-transformer
- **Email:** Nodemailer
- **Package manager:** pnpm
- **Testing:** Jest

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (`npm install -g pnpm`)
- A running MongoDB instance (local or Atlas)
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords) for sending OTP emails

### Installation

```bash
git clone <this-repo-url>
cd e-commerce-app
pnpm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your own values:

```env
# CONFIGS
PORT = 3000
DB_URL = mongodb://127.0.0.1:27017/e-commerce

# EMAIL
EMAIL_USER =
EMAIL_PASS =

# TOKEN
JWT_SECRET =
```

> `.env` is git-ignored — never commit real credentials.

### Running the app

```bash
# development (watch mode)
pnpm run start:dev

# production
pnpm run build
pnpm run start:prod
```

The server runs on `http://localhost:3000` by default (or whatever `PORT` you set).

### Running tests

```bash
pnpm run test        # unit tests
pnpm run test:e2e    # end-to-end tests
pnpm run test:cov    # coverage report
```

## API Endpoints

All responses follow the shape:
```json
{ "success": true, "message": "...", "data": { ... } }
```
Protected routes require an `Authorization` header with a JWT access token.

### Auth — `/auth`

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/auth/register` | Register a new customer account |
| POST | `/auth/confirm-email` | Confirm an account using the emailed OTP |
| POST | `/auth/resend-otp` | Resend a new OTP |
| POST | `/auth/login` | Log in with email + password |
| POST | `/auth/forgot-password` | Request a password reset OTP |
| POST | `/auth/reset-password` | Reset a forgotten password using OTP |
| POST | `/auth/seller` | Create a seller account (Admin only) |

### Customer — `/customer`

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/customer/me` | Get the logged-in user's profile |

### Category — `/category`

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/category` | Create a category (Admin) |
| GET | `/category` | List all categories |
| GET | `/category/:id` | Get a single category |
| PATCH | `/category/:id` | Update a category (Admin) |
| DELETE | `/category/:id` | Delete a category (Admin) |

### Brand — `/brand`

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/brand` | Create a brand (Admin) |
| GET | `/brand` | List all brands |
| GET | `/brand/:id` | Get a single brand |
| PATCH | `/brand/:id` | Update a brand (Admin) |
| DELETE | `/brand/:id` | Delete a brand (Admin) |

### Product — `/product`

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/product` | Create a product (Admin, Seller) |
| GET | `/product` | List products, with search/filter/pagination (`search`, `categoryId`, `brandId`, `minPrice`, `maxPrice`, `sort`, `page`, `limit`) |
| GET | `/product/:id` | Get a single product |
| PATCH | `/product/:id` | Update a product (Admin, or the Seller who owns it) |
| DELETE | `/product/:id` | Delete a product (Admin, or the Seller who owns it) |

### Coupon — `/coupon`

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/coupon` | Create a coupon (Admin, Seller) |
| GET | `/coupon` | List all coupons (Admin, Seller) |
| GET | `/coupon/:id` | Get a single coupon (Admin, Seller) |
| PATCH | `/coupon/:id` | Update a coupon (Admin, Seller) |
| DELETE | `/coupon/:id` | Delete a coupon (Admin, Seller) |

### Cart — `/cart`

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/cart` | Get the logged-in customer's cart |
| POST | `/cart` | Add a product to the cart, or set its quantity (`quantity: 0` removes it) |
| PUT | `/cart/remove/:productId` | Remove a product from the cart |

### Order — `/order`

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/order` | Place an order from the current cart (price and coupon are validated server-side) |
| GET | `/order` | List orders — a customer sees their own, an Admin sees all |
| GET | `/order/:id` | Get a single order |

## Project Structure

```
src/
├── common/
│   ├── constant/           # Shared messages
│   ├── decorators/         # @Auth, @Roles, @Public, @User, validators
│   ├── filters/            # Global HTTP exception filter
│   ├── guards/              # Auth and role guards
│   ├── helpers/              # OTP generation, email sending
│   ├── interceptors/         # Logging, timeout, response transform
│   └── types/                 # Shared enums and types (discount, order status)
├── config/
│   └── env/                   # Environment configuration
├── models/                     # Mongoose schemas and repositories, by entity
│   ├── admin/ brand/ cart/ category/ common/ coupon/
│   ├── customer/ order/ product/ seller/
│   └── abstract.repository.ts
├── modules/                     # Feature modules (controller, service, DTOs, entities, factories)
│   ├── auth/ brand/ cart/ category/
│   ├── coupon/ customer/ order/ product/
├── shared/                       # Shared modules (e.g. user repository access)
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts                       # Entry point
```

## Notes

- Product pricing supports both fixed-amount and percentage discounts; `finalPrice` is computed from `price`, `discountAmount`, and `discountType`.
- Order totals, discounts, and stock changes are always computed and applied server-side — client-submitted prices or coupon discount amounts are never trusted directly.
- A coupon can optionally be restricted to specific customers (`assignedTo`) and tracks usage per customer (`usedBy`) to prevent reuse.
- Sellers can only update or delete their own products; Admins can manage any.