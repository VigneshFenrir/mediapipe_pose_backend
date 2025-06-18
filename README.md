# MediaPipe Pose Backend

This backend service extracts pose keypoints from uploaded images using a Python MediaPipe script, saves the data into both **MySQL** and **MongoDB**, and backs up the data daily using a scheduled cron job with email support.

## Tech Stack

- Node.js
- Express.js
- Sequelize (MySQL/PostgreSQL)
- Mongoose (MongoDB)
- Python (for pose extraction)
- Cron + Archiver (for backup)
- Nodemailer (email backup zips)
- dotenv

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/VigneshFenrir/mediapipe-pose-backend.git
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

Daily Backup Job
Backs up Mongo and SQL databases into a zip file and emails it using cron every day.

Uses node-cron to run at specific time.

Sends .zip file to email in .env.

Testing Cron Backup
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

Email Troubleshooting
Use Gmail "App Password" for MAIL_PASSWORD.

Make sure 2FA is enabled for your account.

```
