# Capstone-Geolocation


/* Right now, this is only frontend. project idea need: SMART TOURISM MANAGEMENT SYSTEM WITH AI-BASED GEOLOCATION GUIDANCE AND CROWD MONITORING
Features:
Login 
Logout
Register via email
Captcha when registering
User needs to login to add warnings or update happening now.

Map:
Alert the user for the danger and wild life
Show dangerous animals or wild life
Show dark areas during the night
Recommend a route

Front End UI:
Will be basic
Show the map upon entering the https
User Friendly

Back End:
Store user login
Hashpassword
Admin setup if ever

How data is stored
ID for marker
latitude and longitude
marker_type danger, warning, info
created_by
created_at
*/

// SQL code
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE markers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  marker_type ENUM('danger','warning') NOT NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);
