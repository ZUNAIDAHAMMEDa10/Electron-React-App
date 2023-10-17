# Electron React ToDo App

This is a README file for your Electron-based ToDo app with React as the frontend and Node as the backend. The app is designed to manage tasks and utilizes an online database, such as Firebase, for data storage. It implements CRUD (Create, Read, Update, Delete) operations for managing tasks in the database.

## Table of Contents
- [Project Description](#description)
- [What You Will Learn](#what-youll-learn)
- [Project Folder Structure](#project-folder-structure)
- [Electron Configuration](#electron-configuration)
- [React Components](#react-components)
- [Tailwind CSS](#tailwind-css)
- [Firebase Configuration](#firebase-configuration)

## Description

This project is an Electron-based ToDo app that combines the power of React for the frontend and Node for the backend. It also makes use of a package manager. The app is designed to manage tasks and features online database connectivity, specifically Firebase, for storing task data. It allows you to perform CRUD (Create, Read, Update, Delete) operations on the database.

## What You'll Learn

In this project, you will learn:

- How to create an Electron app using different programming languages and libraries.
- How to package the app for different operating systems.
- How to use Tailwind CSS to style your app.
- How to integrate Firebase with React and Electron.
- How to utilize various packages to build an Electron-React app.

## Project Folder Structure

```
TODO APP/
├── build/
├── dist/
├── node_modules/
├── public/
│   ├── electron.js
│   ├── favicon.ico
│   ├── index.html
│   ├── preload.js
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   │   ├── icon-images
│   │   ├── images/
│   │   │   ├── image.jpg
│   ├── components/
│   │   ├── common/
│   │   │   ├── Box.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Input.js
│   │   │   ├── Items.js
│   │   │   ├── Todo.js
│   ├── pages/
│   │   ├── About.js
│   │   ├── AdminDashboard.js
│   │   ├── Login.js
│   ├── services/
│   │   ├── firebase.js
│   ├── app.css
│   ├── app.js
│   ├── index.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
```

## Electron Configuration

The Electron configuration is defined in `public/electron.js`. This script initializes the Electron app, sets its dimensions, and loads the appropriate URL based on the environment (development or production).

```javascript
// public/electron.js
const isDev = require("electron-is-dev");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

require("@electron/remote/main").initialize();

const path = require("path");

let mainWindow;

function createWindow() {
  // Define the applications dimension
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      enableRemoteModule: true,
    },
  });
  // Determine what to render based on environment
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Show chrome developer tools when in dev environment
  // if (isDev) {
  //   mainWindow.webContents.openDevTools();
  // }
  // Create event to close window on close
  mainWindow.menuBarVisible = false;
  mainWindow.on("closed", () => (mainWindow = null));
}

// On launch create app window
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  // Based on which operating system you are using
  if (process.platform !== "linux") {
    // If os not linux, close the app
    // you can add darwin(mac os), win64 and so many more
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow !== null) {
    createWindow();
  }
});
```

## React Components

The project includes several React components that make up the user interface of your app. Key components include:

- `App.js`: The main component that handles user authentication and navigation.
- `Dashboard.js`: The side navigation bar and main content area.
- `About.js`: A page that provides information about the app.
- `AdminDashboard.js`: The main dashboard page for managing tasks.
- `Login.js`: The login page for user authentication.

You can find the code for these components in the `src` directory.

## Tailwind CSS

Tailwind CSS is used for styling your app. You can configure Tailwind CSS in `tailwind.config.js`. The CSS is imported in `src/index.css`.

```javascript
// tailwind.config.js
npm install -D tailwindcss
npx tailwindcss init

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}


src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

## Firebase Configuration

Firebase is used for online database connectivity. The Firebase configuration is defined in `src/services/firebase.js`.

```javascript
// src/services/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBlJTQZRKHtjFtzi0jYdRLxvCG2XWKSpG4",
authDomain: "[react-auth-demo-9720d.firebaseapp.com](http://react-auth-demo-9720d.firebaseapp.com/)",
projectId: "react-auth-demo-9720d",
storageBucket: "[react-auth-demo-9720d.appspot.com](http://react-auth-demo-9720d.appspot.com/)",
messagingSenderId: "704578901911",
appId: "1:704578901911:web:7ad61a640f40fdbe4596d2",
measurementId: "G-SLXGWXC0Q5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
```

Remember to replace the placeholder values in the Firebase configuration with your own Firebase project credentials.

Feel free to customize and expand upon this project according to your needs. If you have any questions or encounter issues, refer to the documentation of the technologies used or seek assistance from the respective communities. Happy coding!
