# Zaytona Restaurant

A full-stack restaurant web application: a Nuxt 3 frontend backed by an Express + MongoDB REST API.

## Tech Stack

- **Frontend (`Frontend/`):** Nuxt 3, Pinia, Nuxt UI, Leaflet maps, Zod
- **Backend (`Backend/`):** Node.js, Express, MongoDB with Mongoose
- **Auth:** JWT + bcrypt, Google sign-in (google-auth-library)
- **Payments:** Stripe
- **Validation:** Joi
- **Uploads:** Multer + Cloudinary
- **Other:** Twilio (SMS), Nodemailer (email), slugify

## Project Structure

```
├── Backend/    # Express REST API
└── Frontend/   # Nuxt 3 application
```

## Getting Started

```bash
# Backend
cd Backend && npm install && npm start

# Frontend (new terminal)
cd Frontend && npm install && npm run dev
```

The backend needs environment variables (MongoDB, JWT, Stripe, Cloudinary, Twilio, email).
