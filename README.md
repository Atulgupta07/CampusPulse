# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

<<<<<<< HEAD
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
=======
A modern web-based platform designed to streamline college operations by managing tasks, events, reminders, approvals, and progress tracking in one centralized system.

## Key Features
>>>>>>> ae1d7a4 (Describe your changes)

## React Compiler

<<<<<<< HEAD
The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
=======
## Tech Stack

- Frontend: React.js (Vite, TypeScript)
- Backend: FastAPI (Python)
- Database: Firebase Firestore
- Authentication: Firebase Authentication
- Storage: Firebase Storage
- Scheduler: APScheduler

## Setup Instructions

### Firebase Setup

1. **Firebase Project Creation**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click "Add project" and follow the steps.
2. **Firestore Setup**:
   - In your Firebase project, go to "Firestore Database" and click "Create database".
   - Start in Test mode or define production rules.
3. **Firebase Authentication Setup**:
   - Go to "Authentication" -> "Sign-in method".
   - Enable "Email/Password".
4. **Firebase Storage Setup**:
   - Go to "Storage" -> "Get started".
   - Start with default rules.
5. **Firebase Admin SDK (Backend Credentials)**:
   - Go to "Project settings" -> "Service accounts".
   - Click "Generate new private key".
   - Save the downloaded JSON file as `firebase-credentials.json` in the `backend/` directory.

### Environment Variables

Copy `.env.example` to `.env` in the `backend` directory and configure the variables:
```
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_PATH=firebase-credentials.json
SECRET_KEY=supersecretkey
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Deployment Instructions

- **Backend**: Can be deployed on Google Cloud Run, Heroku, or AWS EC2 running the `uvicorn` server.
- **Frontend**: Can be deployed on Firebase Hosting, Vercel, or Netlify.
>>>>>>> ae1d7a4 (Describe your changes)
