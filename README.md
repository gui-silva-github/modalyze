# 🧠 Modalyze

**Modalyze** is a productivity-focused, project-based task timer built with **React** and **Firebase**. It allows users to manage and complete tasks organized **within projects**, using focused countdown sessions of **1, 5, 30, or 60 minutes**.

<hr>

## 🚀 Recursos

- 🔲 **Project-Centered Workflow**: Tasks are created and tracked *inside* projects.
- ⏳ **Task Timers (1, 5, 30, 60 min)**: Stay focused by completing tasks within time-boxed modal sessions.
- 🌀 **React Refs & Portals**: Handle modals and components rendered outside the main tree (e.g., directly in `index.html`).
- 🔥 **Firebase Firestore Database**: Stores all projects and tasks with real-time syncing.
- 🧮 **Dynamic Arrays**: Efficient task tracking and updating per project.
- 📅 **React Calendar**: Displays projects with due dates for easy deadline tracking.

<hr>

## ↪️ Amostra 

<img src="https://github.com/gui-silva-github/modalyze/blob/main/modalyzeFirebase/public/image.png" alt="amostra"/>

<hr>

## 🛠️ Tecnologias

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)

<hr>

## 🚝 Como rodar?

1. Clone the repository:
```bash
git clone https://github.com/gui-silva-github/modalyze.git
```  
2. Change directory:

- Without Database

```bash
cd modalyze
```

- With Database

```bash
cd modalyzeFirebase
```

3. Install dependencies:

```bash
npm install
```

4. Set Config Database in firebase.js:

const firebaseConfig = {
  apiKey: "YOUR_API-KEY",
  authDomain: "YOUR_AUTH-DOMAIN",
  databaseURL: "YOUR_DATABASE-URL",
  projectId: "YOUR_PROJECT-ID",
  storageBucket: "YOUR_STORAGE-BUCKET",
  messagingSenderId: "YOUR_MESSAGING-SENDER",
  appId: "YOUR_APP-ID"
};

5. Run the app:
```bash
npm run dev
```


