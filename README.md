# Find My Face

## Overview
Find My Face is a web application designed for facial recognition and photo management. It allows users to upload images and automatically detects and matches faces across various photos using advanced machine learning techniques.

## Technologies Used

**Backend**
**Python**: Backend logic and facial recognition.
**Flask**: RESTful API framework for the backend.
**OpenCV**: Image processing and facial recognition.
**Redis**: Caching and session management.
**OpenSSL**: Secured data transmission with HTTPS.

**Frontend**
**React**: Dynamic and interactive user interface.
**TypeScript**: Type safety in frontend development.

**Tools**
**Postman**: API testing and debugging.
**Git/GitHub**: Version control and repository management.

## Installation Instructions

1. **Clone the Repository**
   - Clone the repository to your local machine using:
     ```bash
     git clone <repository-url>
     ```

2. **Set Up the Backend**
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install the required Python packages:
     ```bash
     pip install -r requirements.txt
     ```
   - **Note:** For the app to function, especially regarding server-side user authentication with Redis caching and Flask-Session, you need to generate OpenSSL certificates. Store these certificates in the `backend/certificates` directory to enable HTTPS support.

3. **Start the Backend Server**
   - Run the following command to start the Flask server:
     ```bash
     python ./server/app.py
     ```

4. **Set Up the Frontend**
   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install the necessary packages:
     ```bash
     pnpm install
     ```

5. **Start the Frontend Client**
   - Run the client application:
     ```bash
     pnpm run dev
     ```

6. **Access the Application**
   - Open your web browser and visit:
     ```
     https://localhost:5173
     ```
   - You can now view and test the web application.
