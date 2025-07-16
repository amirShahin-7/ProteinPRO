import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCocw5BIb7NN_0Q5a2no7ZeYzbs8ZFEsOM",
  authDomain: "protein-pro-6ea7a.firebaseapp.com",
  projectId: "protein-pro-6ea7a",
  storageBucket: "protein-pro-6ea7a.firebasestorage.app",
  messagingSenderId: "101579060961",
  appId: "1:101579060961:web:c2a72de91ef6dd7b4fa9a0",
  measurementId: "G-E0YVTVN82J"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };