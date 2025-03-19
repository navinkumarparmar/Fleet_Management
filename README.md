Trip Management API:

This is a backend API for managing trips, vehicles, drivers, and maintenance records. It provides features like starting and ending trips, tracking vehicle maintenance, and managing user authentication.

🚀 Installation

1️⃣ Clone the Repository:

git clone https://github.com/navinkumarparmar/Fleet_Management.git


2️⃣ Install Dependencies:

npm install

3️⃣ Set Up Environment Variables:

Create a .env file in the root directory and add the required environment variables:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/trip_management
JWT_SECRET=your_secret_key

4️⃣ Run the Server:

npm run start

The API will be available at: http://localhost:5000/api

📌 API Documentation

🔗 Postman Documentation: View Here

https://documenter.getpostman.com/view/28621334/2sAYkEqzyJ

💡 You can also import trip_management.postman_collection.json into Postman for testing.

📜 Available API Endpoints

🔹 Authentication

POST /api/auth/register - Register a new user

POST /api/auth/login - Login and get token

🔹 Trip Management

PUT /api/start/:tripId - Start a trip

PUT /api/end/:tripId - End a trip

GET /api/trip/:tripId - Get trip details

🔹 Vehicle & Maintenance

POST /api/vehicles - Add a new vehicle

GET /api/vehicles - List all vehicles

POST /api/maintenance - Add maintenance log

GET /api/maintenance - View maintenance records

🛠 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)

Authentication: JWT (JSON Web Token)

Documentation: Postman






