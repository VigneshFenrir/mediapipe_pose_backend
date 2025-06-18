# MediaPipe Pose Backend

This backend service extracts pose keypoints from uploaded images using a Python MediaPipe script, saves the data into both **MySQL** and **MongoDB**, and backs up the data daily using a scheduled cron job with email support.

## 📦 Tech Stack

- Node.js
- Express.js
- Sequelize (MySQL/PostgreSQL)
- Mongoose (MongoDB)
- Python (for pose extraction)
- Cron + Archiver (for backup)
- Nodemailer (email backup zips)
- dotenv

---

## 🛠 Setup Instructions

### 1. Clone the Repository

````bash
git clone https://github.com/your-org/mediapipe-pose-backend.git
cd mediapipe-pose-backend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Python Setup (Virtual Environment)
bash
Copy
Edit
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
4. Configure .env
Create a .env file from .env.example:

bash
Copy
Edit
cp .env.example .env
Fill in the required environment variables (MySQL, MongoDB, mail credentials, etc.).

🚀 Run the App
bash
Copy
Edit
npm start
🔁 API Endpoints
POST /extract-pose
Upload an image and extract pose keypoints.

Request: multipart/form-data with image file

Response: Keypoint data saved to SQL & Mongo

GET /images
Fetch all stored images

📅 Daily Backup Job
Backs up Mongo and SQL databases into a zip file and emails it using cron every day.

Uses node-cron to run at specific time.

Sends .zip file to email in .env.

🧪 Testing Cron Backup
To test manually, change the schedule to run every minute:

js
Copy
Edit
cron.schedule("* * * * *", async () => { ... });
📂 Folder Structure
bash
Copy
Edit
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── jobs/              # cron job for backup
│   ├── utils/
├── config/                # DB connections
├── .env
├── requirements.txt       # Python dependencies
├── backup/                # backup zip output
📬 Email Troubleshooting
Use Gmail "App Password" for MAIL_PASSWORD.

Make sure 2FA is enabled for your account.

📖 Create Gmail App Password

📄 License
MIT © 2025 Your Name

yaml
Copy
Edit

---

Would you like me to generate this as a file you can download (`README.md`) or add sections like Docker support or Postman collection?







You said:
full code text for readme.md


ChatGPT said:
Sure! Here's the full code content for your README.md file that you can directly copy and paste into your project root:

markdown
Copy
Edit
# 🏃 MediaPipe Pose Backend

This backend service extracts human pose keypoints from uploaded images using Python's MediaPipe, saves the results in both **MySQL/PostgreSQL** and **MongoDB**, and sends a daily database backup via email.

---

## 🧰 Tech Stack

- **Node.js** + **Express.js**
- **Python** + MediaPipe
- **MySQL** or **PostgreSQL** using Sequelize ORM
- **MongoDB** using Mongoose
- **Nodemailer** (Email backup ZIPs)
- **node-cron** + **archiver** (Daily backup system)

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/your-org/mediapipe-pose-backend.git
cd mediapipe-pose-backend
2. Install Node.js Dependencies
bash
Copy
Edit
npm install
3. Setup Python Environment
bash
Copy
Edit
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
4. Environment Configuration
Create a .env file:

bash
Copy
Edit
cp .env.example .env
Edit .env with your credentials:

ini
Copy
Edit
PORT=4000
PY_EXTRACTOR_URL=http://localhost:5000/extract-pose

# SQL
SQL_DIALECT=mysql
SQL_HOST=localhost
SQL_PORT=3306
SQL_DB=pose_db
SQL_USER=root
SQL_PASS=yourpassword

# MongoDB
MONGO_URI=mongodb://localhost:27017/pose_db

# Email
MAIL_FROM=your@gmail.com
MAIL_TO=admin@example.com
MAIL_PASSWORD=your_app_password
MAIL_SERVICE=gmail

# Backup
BACKUP_DIR=backup
💻 Run the Backend
Start the Express server:

bash
Copy
Edit
npm start
Start the Python pose extraction server (example):

bash
Copy
Edit
python backend/pose_extractor.py
📬 Daily Email Backup
The cron job automatically:

Dumps SQL and MongoDB

Zips them

Emails them to the admin

Change time in cron (in jobs/backupJob.js) if needed:

js
Copy
Edit
cron.schedule("59 11 * * *", async () => { ... });
📦 API Endpoints
POST /extract-pose
Uploads an image → returns pose keypoints.

Request: multipart/form-data with image

Response: JSON with 33 pose keypoints saved in SQL & Mongo

GET /images
Fetch all uploaded images and keypoint entries.

🧪 Development Notes
Uses Sequelize for SQL models

Uses Mongoose for Mongo

Uses nodemailer (with Gmail app password)

To test cron manually:
Change this line in backupJob.js:

js
Copy
Edit
cron.schedule("* * * * *", async () => { ... }); // every minute
📁 Project Structure
bash
Copy
Edit
.
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── jobs/              # cron jobs
│   ├── utils/             # email & shell helpers
├── config/                # DB configs
├── backup/                # ZIP backups
├── requirements.txt       # Python dependencies
├── .env                   # env variables
├── .env.example
🛡 Gmail App Password (Important)
Gmail no longer allows direct password access. You must use an App Password.

🔗 How to generate app password

📄 License
MIT © 2025 Your Name

yaml
Copy
Edit

---

Would you like me to export this as a file download (`README.md`) or include Docker setup instructions too?






````
