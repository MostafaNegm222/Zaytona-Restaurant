# Zaytona Restaurant

## 1. Description

A restaurant website with online table reservation. Visitors browse the menu and story pages, create an account, and book a table through a step-by-step flow with an optional pre-ordered meal and card payment. Admins manage the menu, reservations and users. The frontend is Nuxt 3; the backend is an Express and MongoDB REST API.

**Credits and origin:** this repository is a copy of a project based on [MohamedRefat7/Zaytouna-Restaurant](https://github.com/MohamedRefat7/Zaytouna-Restaurant); the original project and backend design belong to its authors. This copy adds Mostafa Negm's own changes (responsiveness and styling fixes, reservation and cancel flow fixes, loading states, the delete modal and logout behaviour) plus a Jest test setup for the backend.

## 2. Technologies and Versions

- **Frontend (`Frontend/`)**: Nuxt ^3.16.0 (Vue 3), @nuxt/ui ^3.0.0, Pinia ^3.0.1 with @pinia/nuxt ^0.10.1, Leaflet ^1.9.4 maps with vue-leaflet ^0.1.0, Zod ^3.24.2, TypeScript ^5.8.2
- **Backend (`Backend/`)**: Node.js 22.x with Express ^4.21.2, MongoDB with Mongoose ^8.13.1, JWT ^9.0.2 (access + refresh tokens), bcrypt ^5.1.1, Joi ^17.13.3 (validation), Stripe ^18.0.0 (card payments), Cloudinary ^2.6.0 with Multer ^1.4.5 (image upload), Nodemailer ^6.10.0 (email), Twilio ^5.5.2 (SMS), google-auth-library ^9.15.1 (Google sign-in), crypto-js ^4.2.0, nanoid ^5.1.5, slugify ^1.6.6
- **Tests**: Jest ^30.5.2 (backend), nodemon ^3.1.9 (dev)

## 3. Requirements and Dependencies

- Node.js 22.x (see `Backend/package.json` engines)
- A MongoDB database (local or Atlas)
- Stripe, Cloudinary, Twilio, Google and SMTP credentials for the related features
- Dependencies are installed with `npm install` inside `Backend/` and `Frontend/`

## 4. Installation and Run Steps

```bash
git clone https://github.com/MostafaNegm222/Zaytona-Restaurant.git
cd Zaytona-Restaurant
```

**Backend**

```bash
cd Backend
npm install
# create Backend/src/config/.env with the variables from section 5
npm start          # node ./index.js
# or: npm run start:dev   # nodemon, loads ./src/config/.env automatically
```

**Frontend** (in a second terminal)

```bash
cd Frontend
npm install
npm run dev        # Nuxt dev server
```

## 5. Environment Variables

The backend reads `Backend/src/config/.env` (see the `start:dev` script). No secrets are stored in the repo. Variables used in the code:

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (default 8000) |
| `DB_URI` | MongoDB connection string |
| `USER_ACCESS_TOKEN`, `USER_REFRESH_TOKEN`, `ADMIN_ACCESS_TOKEN`, `ADMIN_REFRESH_TOKEN` | JWT signing secrets per role/token type |
| `ACCESS_TOKEN_EXPIRE`, `REFRESH_TOKEN_EXPIRE` | Token lifetimes |
| `CLIENT_ID` | Google sign-in (OAuth Client ID) |
| `EMAIL`, `PASS` | SMTP account for outgoing email |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` | Twilio SMS |
| `CLOUD_NAME`, `API_KEY`, `API_SECRET` | Cloudinary image storage |

## 6. Usage and Main Features

**Website (`Frontend/`, Nuxt 3)**

- Home, story, contact and menu pages; the menu has search, filter, sort, pagination, item details and related items.
- Sign up with email code (OTP), login, forgot and reset password, Google sign-in.
- Reservation stepper: date, number of guests, meal type, cart, contact info, payment and a final review.
- Profile: view and edit details, change password, delete account, reservation history.
- Admin area: menu items, table reservations and users.
- Route middleware for authentication, and separate layouts for the public site, auth pages, profile, reservation and admin.

**API (`Backend/`)**

- `/auth`: register, confirm email, login, login with Google, refresh token, forgot and reset password.
- `/menu`, `/category`, `/subCategory`: menu items and their categories, with image upload to Cloudinary.
- `/cart` and `/checkOut`: cart handling and checkout, with Stripe for card payments.
- `/orders`: create and update reservations or orders.
- `/user` and `/admin`: profile routes for users, management routes for admins.
- Joi validation on request data, JWT access and refresh tokens, bcrypt hashing, email through Nodemailer, SMS through Twilio, one global error handler.

## 7. Screenshots / Demo

- Live demo: https://zaytona-restaurant.vercel.app

## 8. Running Tests

```bash
cd Backend
npm test
```

Jest tests for the backend live in `Backend/tests/`.
