# 🏫 School Distance API

A Node.js REST API that helps users find the nearest schools based on their location using the Haversine formula for accurate distance calculations.

## 📋 Features

- **Add Schools**: Register new schools with name, address, and coordinates
- **Find Nearest Schools**: Get schools sorted by distance from user's location
- **Distance Calculation**: Uses Haversine formula for accurate geolocation calculations
- **Input Validation**: Comprehensive validation for all API endpoints
- **Error Handling**: Proper HTTP status codes and error messages

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL Database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sawanb22/school-locator-api.git
   cd school-locator-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=127.0.0.1
   DB_NAME=schooldb
   DB_USER=root
   DB_PASSWORD=your_password
   DB_PORT=3306
   PORT=3000
   ```

4. **Create database and table**
   ```sql
   CREATE DATABASE schooldb;
   USE schooldb;
   
   CREATE TABLE schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     address TEXT NOT NULL,
     latitude DECIMAL(10, 8) NOT NULL,
     longitude DECIMAL(11, 8) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## 📡 API Endpoints

### 1. Add New School
- **URL**: `POST /addSchool`
- **Description**: Add a new school to the database
- **Request Body**:
  ```json
  {
    "name": "ABC Elementary School",
    "address": "123 Main Street, City, State",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
  ```
- **Response**:
  ```json
  {
    "message": "School Registered Successfully"
  }
  ```

### 2. Get Nearest Schools
- **URL**: `GET /listSchools`
- **Description**: Get all schools sorted by distance from user's location
- **Query Parameters**:
  - `u_latitude` (required): User's latitude
  - `u_longitude` (required): User's longitude
- **Example**: `/listSchools?u_latitude=40.7128&u_longitude=-74.0060`
- **Response**:
  ```json
  {
    "message": "List of schools",
    "schools": [
      {
        "id": 1,
        "name": "ABC Elementary School",
        "address": "123 Main Street, City, State",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "distance": 0.01
      }
    ]
  }
  ```

## 🧮 Distance Calculation

This API uses the **Haversine formula** to calculate the great-circle distance between two points on Earth's surface. This provides more accurate results than simple Euclidean distance for geographical coordinates.

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL with mysql2 driver
- **Environment**: dotenv for configuration
- **Development**: nodemon for auto-restart

## 📁 Project Structure

```
school-locator-api/
├── controllers/
│   └── schoolController.js    # Business logic
├── routes/
│   └── school.js             # API routes
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
├── db.js                    # Database configuration
├── index.js                 # Main server file
├── package.json             # Dependencies and scripts
└── README.md               # Documentation
```

## 🔧 Testing with Postman

### Add School
1. Method: `POST`
2. URL: `http://localhost:3000/addSchool`
3. Headers: `Content-Type: application/json`
4. Body: JSON with school details

### Get Schools
1. Method: `GET`
2. URL: `http://localhost:3000/listSchools?u_latitude=40.7128&u_longitude=-74.0060`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Sawan B** - [GitHub](https://github.com/sawanb22)