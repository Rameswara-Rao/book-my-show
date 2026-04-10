# BookMyShow - MERN Stack Clone

A full-stack movie ticket booking application built with MongoDB, Express, React, and Node.js.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account
- A [Stripe](https://stripe.com) account (for payments)
- A [SendGrid](https://sendgrid.com) account (for emails)

---

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd BookMyShow
```

---

## 2. MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) and sign up
2. Create a free **M0** cluster
3. Go to **Security → Database & Network Access**
   - **Database Access tab** → Add a database user (set username & password)
   - **Network Access tab** → Add IP → Allow access from anywhere (`0.0.0.0/0`)
4. Go to **Database → Clusters → Connect → Drivers**
5. Copy the connection string — it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```
6. Replace `<username>` and `<password>` with your database user credentials

---

## 3. Stripe Setup

1. Sign up at [stripe.com](https://stripe.com)
2. Go to **Developers → API Keys**
3. Copy:
   - **Publishable key** (`pk_test_...`) — for the client
   - **Secret key** (`sk_test_...`) — for the server

---

## 4. SendGrid Setup

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Go to **Settings → API Keys → Create API Key**
3. Copy the API key
4. Go to **Settings → Sender Authentication** and verify your sender email
5. Update the `from` email in `server/utils/emailHelper.js` to your verified sender email

---

## 5. Server Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
DB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bookmyshow?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_any_random_secret_string
STRIPE_KEY=sk_test_your_stripe_secret_key
SENDGRID_API_KEY=your_sendgrid_api_key
```

Start the server:

```bash
node server.js
```

You should see:
```
Server is Running
connected to db
```

---

## 6. Client Setup

```bash
cd client
npm install
```

Create a `.env` file inside the `client/` folder:

```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

Start the client:

```bash
npm start
```

The app opens at `http://localhost:3000`

---

## 7. First Time Setup (After Running)

### Create an Admin User
1. Register a new account on the app
2. Go to MongoDB Atlas → **Data Explorer** → `bookmyshow` → `users` collection
3. Find your user → Edit → set:
   ```json
   "isAdmin": true,
   "role": "admin"
   ```
4. Save and log in again — you'll have access to the Admin panel at `/admin`

### Add Movies (Admin)
1. Login as admin → go to `/admin` → **Movies** tab
2. Click **Add Movie** and fill in the details

### Add a Theatre (Partner)
1. Register a new account and select **"Yes"** for Partner role
2. Login as partner → go to `/partner` → click **Add Theatre**
3. Login as admin → `/admin` → **Theatres** tab → click **Approve**

### Add Shows (Partner)
1. Login as partner → `/partner`
2. Click **"+ Shows"** next to an approved theatre
3. Add a show with movie, date, time, ticket price, and total seats

---

## 8. Project Structure

```
BookMyShow/
├── client/                  # React frontend (port 3000)
│   ├── src/
│   │   ├── api/             # Axios API calls
│   │   ├── components/      # Shared components (ProtectedRoute)
│   │   ├── pages/           # All page components
│   │   └── redux/           # Redux store, slices
│   └── .env                 # Client environment variables
│
└── server/                  # Express backend (port 8082)
    ├── config/              # Database connection
    ├── middlewares/         # Auth middleware
    ├── models/              # Mongoose schemas
    ├── routes/              # API routes
    ├── utils/               # Email helper & templates
    └── .env                 # Server environment variables
```

---

## 9. Available Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home - movie grid | Protected |
| `/login` | Login page | Public |
| `/register` | Register page | Public |
| `/forget` | Forgot password | Public |
| `/reset/:email` | Reset password | Public |
| `/admin` | Admin panel | Admin only |
| `/partner` | Partner panel | Partner only |
| `/profile` | User profile & bookings | Protected |
| `/movie/:id` | Movie detail & show timings | Protected |
| `/book-show/:id` | Seat selection & payment | Protected |

---

## 10. Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Ant Design, Redux Toolkit, React Router v7 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Payment | Stripe |
| Email | Nodemailer + SendGrid |
