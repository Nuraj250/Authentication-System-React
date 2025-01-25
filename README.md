# Authentication System               
 
## Overview
This project is a simple **Authentication System** built using React. It includes user signup, login, password reset, and private routes for secure navigation. The app uses Firebase for backend authentication.

## Features
- **User Signup:** Create a new account.
- **User Login:** Authenticate existing users.
- **Password Reset:** Reset the password using an email link.
- **Private Routes:** Protect specific pages from unauthenticated users.
- **Persistent Sessions:** Keep users logged in between sessions.

## Tech Stack
- **Frontend:** React, React Router
- **Backend:** Firebase Authentication
- **Styling:** TailwindCSS (or CSS Modules if preferred)

## Prerequisites
Before you begin, ensure you have the following:
- Node.js installed.
- Firebase account and project set up.
- Basic knowledge of React.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/authentication-system.git
   cd authentication-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.
   - Enable **Email/Password Authentication** in the Authentication settings.
   - Copy the Firebase configuration object from your project settings.

4. Create a `.env` file in the root directory and add your Firebase credentials:

   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

5. Start the development server:

   ```bash
   npm start
   ```

## File Structure
```
.
├── public
├── src
│   ├── components
│   │   ├── AuthContext.js      # Context for authentication
│   │   ├── PrivateRoute.js     # Component for private routing
│   │   └── Navbar.js           # Navigation bar
│   ├── pages
│   │   ├── Login.js            # Login page
│   │   ├── Signup.js           # Signup page
│   │   ├── ResetPassword.js    # Password reset page
│   │   └── Dashboard.js        # Protected page
│   ├── App.js                  # Main app component
│   ├── index.js                # Entry point
│   └── firebase.js             # Firebase configuration
└── .env
```

## Usage
1. **Signup:** Create an account using your email and password.
2. **Login:** Use your credentials to log in.
3. **Password Reset:** Reset your password using the reset email.
4. **Private Pages:** Access protected pages only when logged in.

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repo.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

### Example Firebase Config
```js
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

Now you're ready to build and extend the authentication system!
