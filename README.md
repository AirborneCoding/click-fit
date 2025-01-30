# Click Fit

## Overview

Click Fit is a simple sport and fitness website built using HTML, CSS, JavaScript, Bootstrap, and jQuery. It includes animations, AJAX calls, and a drag-and-drop image upload feature. The backend is built using Node.js and Express, with a MySQL database for user management.

## Features

- Responsive UI with animations.
- AJAX call to fetch data from `http://numbersapi.com/1/30/date?json` and display it on the page.
- Drag-and-drop image upload or file selection.
- Node.js backend to handle image uploads (stored in `upload_images/`).
- MySQL database with a `users` table and an `addUser` stored procedure.

## Project Structure

```
click-fit/
│── client/           # Frontend (HTML, CSS, JS, Bootstrap, jQuery)
│── scripts/          # SQL script for table & stored procedure
│── server/           # Backend (Node.js, Express, MySQL)
│── upload_images/    # Folder for uploaded images
│── .env              # Environment variables include PORT and Database credentials (see .env.example)
│── .nodemon.json     # Json file just in case to run app with database in developement mode (see nodemon.example.json)
│── .gitignore        # Ignore node_modules and uploads
│── package.json      # Node.js dependencies
│── README.md         # Explanation of setup, features, and instructions
```

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/click-fit.git
cd click-fit
```

### 2. Install Dependencies

```sh
cd server
npm install
```

### 3. Setup MySQL Database

- Create a MySQL database.
- Run the SQL scripts inside the `scripts/` folder to create tables and stored procedures.
- Here's the SQL script mentioned in the test:

```sql
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS click_fit;

-- Use the database
USE click_fit;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    ID INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    password VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    type VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    active TINYINT DEFAULT 1,
    PRIMARY KEY (ID)
);

-- Create stored procedure to add a user
DELIMITER $$

CREATE PROCEDURE addUser(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type VARCHAR(255)
)
BEGIN
    INSERT INTO users (email, password, type) VALUES (p_email, p_password, p_type);
END $$

DELIMITER ;

-- Call the stored procedure to insert a new user
CALL addUser('test@example.com', 'password123', 'admin');
```

### 4. Add User function
- Go to server/controllers/userController.js

```javascript

const addUser = (email, password, type, req, res) => {
  const query = 'CALL addUser(?, ?, ?)'
  connectDB.query(query, [email, password, type], (err, results) => {
    if (err) {
      console.log('Error inserting user:', err)
      throw new CustomError.BadRequestError('Error inserting user')
    } else {
      console.log('User added successfully:', results)
    }
  })
}

module.exports = { addUser }
```

### 5. Run the Backend Server

```sh
npm start
```

The backend will run on `http://localhost:5000`.

### 6 Open the Website

- Open `http://localhost:5000` in a browser.
- The AJAX request will fetch the number fact and display it in first section with orange color.
- Try uploading an image using drag-and-drop or file selection in the second section.

## API Endpoints

- ``: Uploads an image to the `upload_images/` folder.

## 7 Notes

- The Uploaded images are fetched under section 2 where the drag and drop , just make sure to refresh the page.
- Clicking on some links are working well and some will result in an error, as only the main page is functional.