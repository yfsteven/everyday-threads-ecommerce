# everyday-threads-ecommerce

## Team Members

**Noel Madera, Jr.** – I worked on the checkout and order flow for the project. I built the checkout page, connected it to the shopping cart, and added the order confirmation page. On the backend, I added the order route and connected the checkout process to the order system, including order validation and database processing. I also worked with Git/GitHub to manage and integrate my changes with the team project.

**Yan Chao Feng** - I built the backend foundation of the project. Set up the project structure using Next.js for the frontend and Express for the backend, then added error handling and routing. My biggest contribution was building the authentication system, along with role-based permissions and a full product management system. 

**Fahad Haider** – Shopping Cart Functionality: Implemented the shopping cart, including adding/removing products, updating quantities, calculating totals, localStorage persistence, cart item-count badge, and checkout navigation.

**Gregory Taylor, Jr.** - Developed the Login page to allow for sign up and sign in. Allowed for the store to be browsed as guest and login functionality to pull up a users cart when signed in. Automatic redirection based on user/login state. Login is verified through backend. Fake passwords cause an error.

**Tahosin Sonia** - Developed the Product Implementation. Using databases and querying to retrieve Product names, description, images, and prices dynamically to populate the products page. Created Seeding for database to initialize the structure used to manage backend storage.

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


## Testing Login
1. You can either browse as Guest or Login.
2. If you are a guest your cart will not be saved.
3. If you do not have an account you can go to `Sign In` to create an account with a password lenght of at least 6 characters.
4. You can go back to the sign in page and browse.
5. If you do not want to browse with your account you can `Logout` in the top right corner.

## Testing Shopping Cart
2. Open any in-stock product.
3. Click Add to Cart.
4. Click the cart icon or go to /cart.
5. Use the + and - buttons to update quantity.
6. Use the trash icon to remove an item.
7. Confirm the cart total updates automatically.
8. Refresh the page and confirm the cart items are still saved.
9. Confirm the cart icon displays the correct item count.
10. Click Proceed to Check out and confirm it opens /checkout.

## Testing Checkout
1. Fill out checkout page with valid Name (First, Last), Email (must include address), and valid address (must include state and zip).
2. Submit order and note order confirmation.
