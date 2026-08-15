# everyday-threads-ecommerce

## Team Members

Yan Chao Feng - I built the backend foundation of the project. Set up the project structure using Next.js for the frontend and Express for the backend, then added error handling and routing. My biggest contribution was building the authentication system, along with role-based permissions and a full product management system. 

## Getting Started

1. Make sure to have npm and PostgreSQL installed on device.
2. Pull the latest main branch to a directory of your choice.
3. Change directory to `everyda-threads-ecommerce`


## Setting up Backend
1. Change Directory to backend
2. Install dependencies using `npm install`
3. Create a .env file using the `.env.example` template
4. Your `.env` file should be structured like this:

```bash
# Database Connection
DATABASE_URL=postgresql://postgres:admin@localhost:5432/everyday_threads

# Server Port
# Note Port 5000 conflicts with Airplay on MacOS so use Port 5001 or any free port.
PORT=5000


# JWT Secret Key (use a strong random string in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

## Setting up Database 
1. Once Project is set up create the product table by running the schema.sql located in `db/schema.sql` by using either psql or Neon's SQL Editor.
2. Seed the database by to import product by running `node db/seed.js` inside of the terminal in the backend directory
3. Start the backend by running `npm run dev` inside of the backend directory.


## Starting Frontend
1. In another terminal navigate to the `frontend` directory.
2. Once inside install dependencies by running `npm install`.
3. Create a new `env.local` inside of the frontend folder with:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5001/api #Use the same port you used earlier in backend .env
```
4. Start the frontend by running `npm run dev` in the frontend directory.
5. Visit `http://localhost:3000/login` to sign up, sign in, or view as guest.
