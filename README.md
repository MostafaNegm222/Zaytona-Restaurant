# Zaytona Restaurant

A restaurant website with online table reservation. Visitors browse the menu and story pages, create an account, and book a table through a step-by-step flow with an optional pre-ordered meal and card payment. Admins manage the menu, reservations and users. The frontend is Nuxt 3, the backend is an Express and MongoDB REST API.

**Live demo:** https://zaytona-restaurant.vercel.app

## Credits and origin

This repository is a second copy of a project that is based on [MohamedRefat7/Zaytouna-Restaurant](https://github.com/MohamedRefat7/Zaytouna-Restaurant). The Express and MongoDB backend here is the same code as in that repository. Only `Backend/package.json` differs, where the Jest test script and dev dependency were added. The original project and its backend design belong to its authors. This copy was taken by Mostafa Negm to deploy the application, with his own changes to responsiveness and styling.

Mostafa's own work in this copy, as recorded in the commit history of `Frontend/`: fixes to responsive layout issues, logo and footer image paths, the reservation and cancel flows, loading states on the confirm and delete actions, the delete modal and logout behaviour. The 16 backend tests were added later and are described below.

## What it does

**Website (`Frontend/`, Nuxt 3)**
- Home, story, contact and menu pages. The menu has search, filter, sort, pagination, item details and related items.
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

## Tech stack

- **Frontend:** Nuxt 3, Vue 3, Pinia, Nuxt UI, Leaflet maps, Zod
- **Backend:** Node.js 22 (ES modules), Express 4, MongoDB with Mongoose 8, Joi, JWT, bcrypt, Stripe, Cloudinary and Multer, Nodemailer, Twilio, google-auth-library
- **Tests:** Jest on the backend
- **Deployment file:** `Backend/vercel.json`

## Project structure

```
├── Backend/
│   ├── index.js            # Entry point
│   ├── src/app.controller.js   # Middleware and routes
│   ├── src/Modules/        # One folder per feature: controller, service, validation
│   ├── src/DB/             # Mongoose connection and models
│   ├── src/middleware/  src/utils/
│   └── tests/              # Jest tests
└── Frontend/
    ├── pages/  components/  layouts/  middleware/
    ├── composables/        # API and auth helpers
    └── nuxt.config.ts
```

## Run it locally

You need Node.js 22 and a MongoDB database.

**Backend**

```bash
cd Backend
npm install
```

Create `Backend/src/config/.env` with these variables (all are read by the code): `PORT`, `DB_URI`, `SALT`, `EMAIL`, `PASS`, `CLIENT_ID` (Google), `CLOUD_NAME`, `API_KEY`, `API_SECRET` (Cloudinary), `STRIPE_SECRET_KEY`, `SUCCESS_URL`, `CANCEL_URL`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `ACCESS_TOKEN_EXPIRE`, `REFRESH_TOKEN_EXPIRE`, `USER_ACCESS_TOKEN`, `USER_REFRESH_TOKEN`, `ADMIN_ACCESS_TOKEN`, `ADMIN_REFRESH_TOKEN` (the token signing secrets).

```bash
npm run start:dev    # nodemon with the .env file above
# or: npm start      # node index.js, needs the variables in your environment
```

The API listens on `PORT` (default 8000) and answers `GET /` with a hello message.

**Frontend**

```bash
cd Frontend
npm install
cp .env.example .env   # BASE_URL (the backend address), GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, USER_ACCESS_TOKEN
npm run dev
```

## Tests

```bash
cd Backend
npm test
```

16 Jest tests cover the shared validation rules (password strength, Egyptian phone numbers, email domains, six digit codes, ObjectId), the auth request schemas, the validation middleware, the hash and token helpers, and the error handlers. They do not need a database or any external service.

## Limits

- Services that call MongoDB, Stripe, Cloudinary, Twilio or email are not covered by tests.
- There are no automated tests for the Nuxt frontend.
