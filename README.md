# ✈️ Mlaku Mulu Backend

## 📌 About

**Mlaku-Mulu** is a travel bureau management system that provides secure data management for both employees and tourists. This backend service is built using **Node.js, TypeScript, Prisma, and PostgreSQL** , enabling efficient handling of tourist and travel records.

## 🚀 **Features**

**🔹Employee Access:**

- Create, update, and delete tourist records.
- Manage tourist trips (add, update, remove).

🔹 **Tourist Access:**

- View personal travel history, including:
  - Start and end date (UTC).
  - Travel destination (as a string or object).

🔹 **Additional Features:**

- Authentication & Authorization for secure access.
- Pagination & filtering for efficient data retrieval.

## 🔧Getting started

**Clone**

```
git clone https://github.com/tantowish/typescript-mlaku-mulu.git
cd typescript-mlaku-mulu

```

**Setup Environment**

```
cp .env.example .env
```

**Install local dependencies**

```
npm install
```

**Generate & Migrate the database**

```
npx prisma generate
npx prisma migrate dev
```

**Running Service**

```
npm run dev
```

## 🛠️Technologies (Backend)

**TypeScript** : A statically typed superset of JavaScript used for building scalable and maintainable back-end applications.

**Express** : A minimal and flexible Node.js framework for handling HTTP requests and building web APIs.

## 📁Project Structure (Backend)

```
|-- doc/                # API Documentation folder
|-- prisma/             # Database related folder
|-- src/
|   |-- app/
|       |-- app.ts      # Main server code
|       |-- controller/ # Controller using service
|       |-- error/      # Error handler logic
|       |-- middleware/ # Middleware
|       |-- model/      # Model type for database
|       |-- routes/     # Routes logic
|       |-- service/    # Service Application logic
|       |-- types/      # Extended type for model
|       |-- util/       # Utilities helper
|       |-- validation/ # Request validation
|-- test/               # Testing folder
```

## 🧾License

This project is licensed under the [MIT](https://github.com/tantowish/zenspire-be/blob/main/MIT-LICENSE.txt) License. You are free to use, modify, and distribute the code as you see fit.
